'use client'

import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {

  type TMenu = {
    title: string;
    url: string
  }

  const info = [
    {
      icon:  <MapPin size={20} color="#087443" />,
      content: "Điểm cao 468, Vị Xuyên, Hà Giang"
    },
    {
      icon:  <Phone size={20} color="#087443" />,
      content: "Nhung - 0988.058.390"
    },
    {
      icon:    <Mail size={20} color="#087443" />,
      content: "info@ntlsvx.gov.vn"
    },
    {
      icon:  <Clock size={20} color="#087443" />,
      content: "Mở của: 07:00 - 17:00 hàng ngày"
    }
  ]

  const menus: TMenu[] = [
    {
      title: "Giới thiệu",
      url: "/gioi-thieu"
    },
    {
      title: "Tin tức - Sự kiện",
      url: "/tin-tuc"
    },
    {
      title: "Tra cứu mộ",
      url: "/tra-cuu"
    },
    {
      title: "Đăng ký viếng",
      url: "/dat-lich-vieng"
    },
    {
      title: "Số vàng tri ân",
      url: "#"
    },
    {
      title: "Nhắn tìm đồng đội",
      url: "/nhan-tim-dong-doi"
    }
  ]

  const supportMenus: TMenu[] = [
    {
      title: "Hướng dẫn mua hàng",
      url: "/huong-dan-mua-hang"
    },
    {
      title: "Chính sách giao hàng", 
      url: "/chinh-sach-giao-hang"
    },
    {
      title: "Phương thức thanh toán",
      url: "/phuong-thuc-thanh-toan"
    },
    {
      title: "Bảo hành và đổi trả",
      url: "/chinh-sach-doi-tra"
    },
    {
      title: "Chính sách bảo mật",
      url: "/chinh-sach-bao-mat"
    }
  ]
  
  return (
    <footer className="">
      <section className="pt-16 border-t-1">
        <div className="container px-6 mx-auto md:px-30 text-center pb-8">
          <div className="grid lg:grid-cols-2 gap-y-6 lg:gap-y-0 gap-x-8">
            <div className="text-left">
              <h2 className="text-[#087443] text-[30px] font-bold">NGHĨA TRANG LIỆT SĨ VỊ XUYÊN</h2>
              <p className="py-6 text-[#475467]">Đơn vị quản lý và vận hành Nghĩa trang Liệt sĩ Vị Xuyên, phục vụ công tác tưởng niệm và tri ân các Anh hùng Liệt sĩ.</p>

              {
                info.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center mb-2">
                      {item.icon}
                       <p className="pl-2 text-[#087443] font-semibold text-base">{item.content}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className="grid gap-y-6 lg:gap-y-0 lg:grid-cols-2">
              <div className="text-left">
                <p className="pb-4 font-semibold text-base text-[#667085]">Liên kết nhanh</p>
                {
                  menus.map((item, index) => {
                    return (
                      <Link 
                        key={index} 
                        href={item.url}
                        className="text-base block font-semibold text-[#475467] leading-[28px] hover:text-[#087443] transition-colors duration-200"
                      >
                        {item.title}
                      </Link>
                    )
                  })
                }
              </div>
              <div className="text-left">
                <p className="pb-4 font-semibold text-base text-[#667085]">Hỗ trợ khách hàng</p>
                {
                  supportMenus.map((item, index) => {
                    return (
                      <Link 
                        key={index} 
                        href={item.url}
                        className="text-base block font-semibold text-[#475467] leading-[28px] hover:text-[#087443] transition-colors duration-200"
                      >
                        {item.title}
                      </Link>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F9FAFB] mt-4 md:mt-0 md:h-[56px]">
          <div className="container mx-auto h-full grid gap-x-6 grid-cols-1 md:grid-cols-2 px-6 md:px-30 items-center py-4 md:py-0">
            <p className="text-center md:text-left">© 2024 Nghĩa trang Liệt sĩ Vị Xuyên. Tất cả quyền được bảo lưu.</p>
            <p className="text-center md:text-right">Được phát triển bởi: <span className="text-[#087443]"> NTLSVX Tech Team</span></p>
          </div>
        </div>
      </section>
    </footer>
  )
}