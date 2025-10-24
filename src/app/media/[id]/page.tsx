
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MediaDetail from "@/components/media/MediaDetail";
import { getMediaById } from "@/services/media";

interface MediaDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MediaDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const media = await getMediaById(Number(id));
    return {
      title: `${media.title} - Thư viện hình ảnh/video`,
      description: media.description || `Chi tiết về ${media.title}`,
    };
}

export default async function MediaDetailPage({ params }: MediaDetailPageProps) {
  const { id } = await params;
  console.log("MediaDetailPage - id:", id);
  
  try {
    const media = await getMediaById(Number(id));
    console.log("MediaDetailPage - media.images:", media.images);
    return <MediaDetail media={media} />;
  } catch (error) {
    console.error("MediaDetailPage - error:", error);
    notFound();
  }
}
