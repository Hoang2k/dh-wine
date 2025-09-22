import { notFound } from 'next/navigation';
import NewsDetailClient from './NewsDetailClient';

// Enable ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

// Mock data for news articles (updated to match NewsClient)
const mockNews = [
    {
        id: 1,
        slug: "ky-su-dien-nganh-nghe-tiem-nang-voi-moi-sinh-vien-yeu-thich-khoi-tu-nhien",
        title: "Kỹ sư điện - Ngành nghề tiềm năng với mọi sinh viên yêu thích khối tự nhiên",
        excerpt: "Trong thời đại công nghiệp hóa và hiện đại hóa, kỹ sư điện đóng vai trò quan trọng trong việc phát triển và vận hành các hệ thống điện tử, điện lực. Đây là ngành nghề có tiềm năng lớn và phù hợp với những sinh viên yêu thích khối tự nhiên...",
        content: `
            <h2>Vai trò của kỹ sư điện trong thời đại hiện đại</h2>
            <p>Trong thời đại công nghiệp hóa và hiện đại hóa, kỹ sư điện đóng vai trò quan trọng trong việc phát triển và vận hành các hệ thống điện tử, điện lực. Đây là ngành nghề có tiềm năng lớn và phù hợp với những sinh viên yêu thích khối tự nhiên.</p>
            
            <h3>Cơ hội nghề nghiệp rộng mở</h3>
            <p>Kỹ sư điện có thể làm việc trong nhiều lĩnh vực khác nhau như:</p>
            <ul>
                <li>Thiết kế và vận hành hệ thống điện</li>
                <li>Phát triển công nghệ điện tử</li>
                <li>Năng lượng tái tạo và bền vững</li>
                <li>Tự động hóa và điều khiển</li>
                <li>Viễn thông và công nghệ thông tin</li>
            </ul>
            
            <h3>Kỹ năng cần thiết</h3>
            <p>Để trở thành một kỹ sư điện giỏi, bạn cần trang bị những kỹ năng sau:</p>
            <ul>
                <li>Kiến thức vững chắc về toán học và vật lý</li>
                <li>Kỹ năng lập trình và sử dụng phần mềm chuyên dụng</li>
                <li>Tư duy logic và khả năng giải quyết vấn đề</li>
                <li>Kỹ năng làm việc nhóm và giao tiếp</li>
                <li>Khả năng học hỏi và cập nhật công nghệ mới</li>
            </ul>
            
            <h3>Triển vọng phát triển</h3>
            <p>Với sự phát triển mạnh mẽ của công nghệ và nhu cầu năng lượng ngày càng tăng, ngành kỹ thuật điện sẽ tiếp tục phát triển và mang lại nhiều cơ hội nghề nghiệp hấp dẫn cho các bạn trẻ.</p>
        `,
        author: "Chuyên gia hướng nghiệp",
        publishedAt: "2025-03-25",
        readTime: "5 phút",
        views: 343,
        category: "HƯỚNG NGHIỆP",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&crop=center",
        featured: true
    },
    {
        id: 2,
        slug: "mo-hinh-kinh-doanh-la-gi-giai-dap-thac-mac-ve-xay-dung-m",
        title: "Mô hình kinh doanh là gì? Giải đáp thắc mắc về xây dựng m...",
        excerpt: "Mô hình kinh doanh là một khái niệm quan trọng trong việc xây dựng và phát triển doanh nghiệp...",
        content: `
            <h2>Mô hình kinh doanh là gì?</h2>
            <p>Mô hình kinh doanh là một khái niệm quan trọng trong việc xây dựng và phát triển doanh nghiệp. Nó mô tả cách thức một công ty tạo ra, phân phối và thu được giá trị từ sản phẩm hoặc dịch vụ của mình.</p>
            
            <h3>Các thành phần chính của mô hình kinh doanh</h3>
            <ul>
                <li>Giá trị đề xuất (Value Proposition)</li>
                <li>Khách hàng mục tiêu (Target Customer)</li>
                <li>Kênh phân phối (Distribution Channels)</li>
                <li>Mối quan hệ khách hàng (Customer Relationships)</li>
                <li>Dòng doanh thu (Revenue Streams)</li>
            </ul>
        `,
        author: "Chuyên gia kinh doanh",
        publishedAt: "2019-09-12",
        readTime: "8 phút",
        views: 19499,
        category: "KINH DOANH",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=center",
        featured: false
    },
    {
        id: 3,
        slug: "top-nhung-cong-viec-lam-them-tai-nha-hap-dan-nhat",
        title: "Top những công việc làm thêm tại nhà hấp dẫn nhất",
        excerpt: "Làm việc tại nhà đang trở thành xu hướng phổ biến, mang lại nhiều cơ hội kiếm thêm thu nhập...",
        content: `
            <h2>Xu hướng làm việc tại nhà</h2>
            <p>Làm việc tại nhà đang trở thành xu hướng phổ biến, mang lại nhiều cơ hội kiếm thêm thu nhập mà không cần phải di chuyển xa.</p>
            
            <h3>Top công việc làm thêm tại nhà</h3>
            <ul>
                <li>Viết content và copywriting</li>
                <li>Thiết kế đồ họa</li>
                <li>Dạy học trực tuyến</li>
                <li>Bán hàng online</li>
                <li>Lập trình và phát triển web</li>
            </ul>
        `,
        author: "Chuyên gia việc làm",
        publishedAt: "2019-09-15",
        readTime: "6 phút",
        views: 152951,
        category: "VIỆC LÀM",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop&crop=center",
        featured: false
    },
    {
        id: 4,
        slug: "trinh-do-van-hoa-la-gi-cach-ghi-trinh-do-van-hoa-trong-so",
        title: "Trình độ văn hóa là gì? Cách ghi trình độ văn hóa trong sơ...",
        excerpt: "Trình độ văn hóa là một thông tin quan trọng trong hồ sơ xin việc, thể hiện mức độ học vấn...",
        content: `
            <h2>Trình độ văn hóa là gì?</h2>
            <p>Trình độ văn hóa là một thông tin quan trọng trong hồ sơ xin việc, thể hiện mức độ học vấn và trình độ giáo dục của ứng viên.</p>
            
            <h3>Cách ghi trình độ văn hóa trong sơ yếu lý lịch</h3>
            <ul>
                <li>Ghi rõ cấp học cao nhất đã hoàn thành</li>
                <li>Bao gồm tên trường và năm tốt nghiệp</li>
                <li>Ghi chính xác và trung thực</li>
                <li>Sử dụng thuật ngữ chuẩn</li>
            </ul>
        `,
        author: "Chuyên gia nhân sự",
        publishedAt: "2019-09-15",
        readTime: "4 phút",
        views: 27594,
        category: "HƯỚNG NGHIỆP",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=100&fit=crop&crop=center",
        featured: false
    }
];

interface NewsDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const { slug } = await params;
    const article = mockNews.find(item => item.slug === slug);
    
    if (!article) {
        notFound();
    }
    
    return <NewsDetailClient article={article} />;
}

// Generate static params for ISR
export async function generateStaticParams() {
    return mockNews.map((article) => ({
        slug: article.slug,
    }));
}
