interface StructuredDataProps {
  type: 'product' | 'organization' | 'website';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "image": data.imageMedia?.path,
          "offers": {
            "@type": "Offer",
            "price": data.unitPrice || data.minPrice,
            "priceCurrency": "VND",
            "availability": "https://schema.org/InStock"
          },
          "brand": {
            "@type": "Brand",
            "name": "Nghĩa trang liệt sĩ Vị Xuyên"
          }
        };
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Nghĩa trang liệt sĩ Vị Xuyên",
          "url": "https://ntlsvx.com",
          "logo": "https://ntlsvx.com/logo-la-co-03.jpg",
          "description": "Nghĩa trang liệt sĩ Vị Xuyên - Nơi tưởng niệm các anh hùng liệt sĩ"
        };
      
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Nghĩa trang liệt sĩ Vị Xuyên",
          "url": "https://ntlsvx.com",
          "description": "Website chính thức của nghĩa trang liệt sĩ Vị Xuyên"
        };
      
      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
