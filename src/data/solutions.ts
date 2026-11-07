import { images } from '@/lib/images'

export type Solution = {
  id: string
  index: string
  title: string
  audience: string
  summary: string
  image: string
  businessType: string
  benefits: { title: string; text: string }[]
}

export const solutions: Solution[] = [
  {
    id: 'horeca',
    index: '01',
    title: 'Nhà hàng & Khách sạn',
    audience: 'Nhà hàng, resort, khách sạn, bar & lounge',
    summary:
      'Xây dựng danh sách vang cân bằng giữa trải nghiệm thực khách và biên lợi nhuận — từ vang ly (house wine) đến những nhãn đặc tuyển cho thực đơn tasting.',
    image: images.restaurant,
    businessType: 'Nhà hàng',
    benefits: [
      { title: 'Thiết kế wine list', text: 'Sommelier tư vấn cơ cấu danh mục theo concept ẩm thực và mức giá thực đơn.' },
      { title: 'Đào tạo phục vụ', text: 'Đào tạo nhân viên về bảo quản, rót vang và gợi ý kết hợp món.' },
      { title: 'Công nợ linh hoạt', text: 'Chính sách thanh toán theo tháng cho đối tác ký hợp đồng.' },
      { title: 'Ổn định nguồn hàng', text: 'Cam kết duy trì tồn kho cho các nhãn trong wine list của bạn.' },
    ],
  },
  {
    id: 'ban-le',
    index: '02',
    title: 'Nhà bán lẻ',
    audience: 'Cửa hàng rượu, siêu thị, cửa hàng quà tặng',
    summary:
      'Danh mục được tuyển chọn để bán chạy trên kệ: đa dạng quốc gia, phân khúc giá rõ ràng và câu chuyện sản phẩm dễ truyền tải đến người mua.',
    image: images.retailShelf,
    businessType: 'Cửa hàng bán lẻ',
    benefits: [
      { title: 'Biên lợi nhuận tốt', text: 'Giá sỉ cạnh tranh với chiết khấu bậc thang theo sản lượng.' },
      { title: 'Hỗ trợ trưng bày', text: 'Kệ trưng bày, bảng giá, tài liệu giới thiệu sản phẩm.' },
      { title: 'Đơn hàng linh hoạt', text: 'Đặt hàng từ 1 thùng, kết hợp nhiều nhãn trong một đơn.' },
      { title: 'Đổi trả rõ ràng', text: 'Chính sách đổi hàng lỗi, hàng cận date minh bạch.' },
    ],
  },
  {
    id: 'phan-phoi',
    index: '03',
    title: 'Nhà phân phối & Đại lý',
    audience: 'Đại lý cấp 2, nhà phân phối khu vực',
    summary:
      'Trở thành đại lý của Đức Minh Wine tại các huyện, thị xã của Khánh Hòa và vùng lân cận với chính sách độc quyền khu vực.',
    image: images.cellarTanks,
    businessType: 'Nhà phân phối / Đại lý',
    benefits: [
      { title: 'Chính sách đại lý', text: 'Giá đại lý, thưởng doanh số theo quý và theo năm.' },
      { title: 'Bảo vệ khu vực', text: 'Phân vùng rõ ràng, hạn chế cạnh tranh nội bộ.' },
      { title: 'Hỗ trợ marketing', text: 'Hình ảnh, nội dung và chương trình khuyến mãi định kỳ.' },
      { title: 'Hồ sơ đầy đủ', text: 'Chứng từ nhập khẩu, công bố sản phẩm, hóa đơn VAT.' },
    ],
  },
  {
    id: 'qua-tang',
    index: '04',
    title: 'Quà tặng doanh nghiệp',
    audience: 'Doanh nghiệp, cơ quan, tổ chức',
    summary:
      'Hộp quà rượu vang thiết kế riêng cho Tết, hội nghị khách hàng và tri ân đối tác — in logo, thiệp chúc mừng và giao tận nơi.',
    image: images.corporateGifts,
    businessType: 'Quà tặng doanh nghiệp',
    benefits: [
      { title: 'Cá nhân hóa', text: 'In logo, thiệp viết tay, hộp gỗ hoặc hộp da cao cấp.' },
      { title: 'Đa dạng ngân sách', text: 'Gợi ý set quà theo ngân sách từ phổ thông đến VIP.' },
      { title: 'Giao hàng đồng loạt', text: 'Giao theo danh sách người nhận, đúng ngày, đúng giờ.' },
      { title: 'Hóa đơn VAT', text: 'Xuất hóa đơn đầy đủ, hỗ trợ hồ sơ chi phí doanh nghiệp.' },
    ],
  },
]

export const partnershipSteps = [
  { title: 'Tư vấn nhu cầu', text: 'Trao đổi về concept, thực đơn, khách hàng mục tiêu và ngân sách.' },
  { title: 'Thử vang & đề xuất', text: 'Mang mẫu thử đến tận nơi, đề xuất danh mục phù hợp.' },
  { title: 'Báo giá & ký kết', text: 'Báo giá sỉ minh bạch, chính sách chiết khấu và công nợ rõ ràng.' },
  { title: 'Giao hàng & đồng hành', text: 'Giao trong 24h tại Nha Trang, đào tạo và chăm sóc định kỳ.' },
]

export const BUSINESS_TYPES = [
  'Nhà hàng',
  'Khách sạn / Resort',
  'Bar / Lounge',
  'Cửa hàng bán lẻ',
  'Nhà phân phối / Đại lý',
  'Quà tặng doanh nghiệp',
  'Tổ chức sự kiện',
  'Khác',
] as const
