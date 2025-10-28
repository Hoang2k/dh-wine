import { Metadata } from "next";
import { notFound } from "next/navigation";
import MediaDetail from "@/components/media/MediaDetail";
import { getMediaById } from "@/services/media";
import { getStrapiMedia } from "@/utils";

interface MediaDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MediaDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const media = await getMediaById(Number(id));
  if (!media) return { title: "Không tìm thấy" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nghiatranglietsivixuyen.vn";
  const pageUrl = `${siteUrl}/media/${id}`;

  let imageUrl: string | undefined = undefined;
  const firstImage = media.images && media.images[0];
  if (firstImage) {
    const maybeFull = getStrapiMedia(firstImage);
    if (maybeFull.startsWith("http")) imageUrl = maybeFull;
    else imageUrl = `${siteUrl}${maybeFull}`;
  }

  console.log("imageUrl", imageUrl);
  console.log("title", media.title);
  console.log("description", media.description);

  return {
    title: `${media.title} - Thư viện hình ảnh/video`,
    description: media.description || `Chi tiết về ${media.title}`,
    keywords: [
      'thư viện hình ảnh',
      'thư viện video', 
      'nghĩa trang liệt sĩ',
      'Vị Xuyên',
      media.title,
      'hình ảnh',
      'video'
    ],
    authors: [{ name: 'Nghĩa trang liệt sĩ Vị Xuyên' }],
    openGraph: {
      title: media.title,
      description: media.description || `Chi tiết về ${media.title}`,
      url: pageUrl,
      type: "article",
      locale: 'vi_VN',
      siteName: 'Nghĩa trang liệt sĩ Vị Xuyên',
      images: imageUrl ? [{ 
        url: imageUrl, 
        width: 1200, 
        height: 630,
        alt: media.title 
      }] : [{
        url: `${siteUrl}/logo-la-co-03.jpg`,
        width: 1200,
        height: 630,
        alt: media.title
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: media.title,
      description: media.description || `Chi tiết về ${media.title}`,
      images: [imageUrl || `${siteUrl}/logo-la-co-03.jpg`],
    },
    alternates: { canonical: pageUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function MediaDetailPage({ params }: MediaDetailPageProps) {
  const { id } = await params;
  try {
    const media = await getMediaById(Number(id));
    if (!media) notFound();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nghiatranglietsivixuyen.vn";
    const pageUrl = `${siteUrl}/media/${id}`;

    return <MediaDetail media={media} pageUrl={pageUrl} />;
  } catch (error) {
    console.error("MediaDetailPage - error:", error);
    notFound();
  }
}

