import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceItemById } from '@/services/offerings';
import OfferingDetailClient from './OfferingDetailClient';
import Breadcrumbs from '@/components/Breadcrumbs';
import StructuredData from '@/components/StructuredData';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const serviceItem = await getServiceItemById(id);
    
    if (!serviceItem) {
      return {
        title: 'Sản phẩm không tìm thấy | Nghĩa trang liệt sĩ Vị Xuyên',
        description: 'Sản phẩm cúng viếng không tìm thấy tại nghĩa trang liệt sĩ Vị Xuyên.',
      };
    }

    const price = serviceItem.unitPrice || serviceItem.minPrice || 0;
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);

    return {
      title: `${serviceItem.name} - ${formattedPrice} | Sản phẩm cúng viếng`,
      description: serviceItem.description || `Mua ${serviceItem.name} với giá ${formattedPrice}. Sản phẩm cúng viếng chất lượng cao tại nghĩa trang liệt sĩ Vị Xuyên.`,
      keywords: [
        'sản phẩm cúng viếng',
        'đồ cúng',
        'nghĩa trang liệt sĩ',
        'Vị Xuyên',
        serviceItem.name,
        'cúng viếng',
        'truyền thống Việt Nam'
      ],
      openGraph: {
        title: `${serviceItem.name} - ${formattedPrice}`,
        description: serviceItem.description || `Sản phẩm cúng viếng ${serviceItem.name} chất lượng cao.`,
        type: 'website', // Change from 'product' to 'website'
        locale: 'vi_VN',
        url: `https://ntlsvx.com/offering/${id}`,
        siteName: 'Nghĩa trang liệt sĩ Vị Xuyên',
        images: [
          {
            url: serviceItem.imageMedia?.path || '/logo-la-co-03.jpg',
            width: 800,
            height: 600,
            alt: serviceItem.name,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${serviceItem.name} - ${formattedPrice}`,
        description: serviceItem.description || `Sản phẩm cúng viếng ${serviceItem.name} chất lượng cao.`,
        images: [serviceItem.imageMedia?.path || '/logo-la-co-03.jpg'],
      },
      alternates: {
        canonical: `https://ntlsvx.com/offering/${id}`,
      },
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
  } catch (error) {
    return {
      title: 'Sản phẩm không tìm thấy | Nghĩa trang liệt sĩ Vị Xuyên',
      description: 'Sản phẩm cúng viếng không tìm thấy.',
    };
  }
}

// Generate static params for better SEO
export async function generateStaticParams() {
  try {
    // Fetch all service items to generate static params
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-item?per_page=100`, {
      next: { revalidate: 300 } // Revalidate every hour
    });
    const data = await response.json();
    
    return data.data?.map((item: any) => ({
      id: item.id.toString(),
    })) || [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Enable ISR - revalidate every 600 seconds (10 minutes)
export const revalidate = 300;

export default async function OfferingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let serviceItem;
  
  try {
    serviceItem = await getServiceItemById(id);
  } catch (error) {
    console.error('Error fetching service item:', error);
  }

  if (!serviceItem) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Sản phẩm cúng viếng', href: '/offering' },
    { label: serviceItem.name }
  ];

  return (
    <>
      <StructuredData 
        type="product" 
        data={serviceItem} 
      />
      <div className="min-h-[100dvh]">
        {/* Header */}
        <div className="container mx-auto px-4 lg:px-30 py-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <OfferingDetailClient serviceItem={serviceItem} />
      </div>
    </>
  );
}
