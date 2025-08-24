'use client'

import { Clock, Mail, MapPin, Phone } from "lucide-react"


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
      url: ""
    },
    {
      title: "Tin tức - Sự kiện",
      url: ""
    },
    {
      title: "Tra cứu mộ",
      url: ""
    },
    {
      title: "Đăng ký viếng",
      url: ""
    },
    {
      title: "Số vàng tri ân",
      url: ""
    },
    {
      title: "Nhắn tìm đồng đội",
      url: ""
    }
  ]
  
  return (
    <footer className="">
      <section className="pt-16 border-t-1">
        <div className="container px-6 mx-auto md:px-30 text-center pb-8">
          <div className="grid lg:grid-cols-2 gap-y-6 lg:gap-y-0 gap-x-8">
            <div className="text-left">
              <h2 className="text-[#087443] text-[30px] font-bold">NGHĨA TRANG LIỆT SĨ VỊ XUYÊN</h2>
              <p className="py-6 text-[#475467">Đơn vị quản lý và vận hành Nghĩa trang Liệt sĩ Vị Xuyên, phục vụ công tác tưởng niệm và tri ân các Anh hùng Liệt sĩ.</p>

              {
                info.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center">
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
                      <a key={index} className="text-base block font-semibold text-[#475467] leading-[24px]">{item.title}</a>
                    )
                  })
                }
              </div>
              <div className="text-left">
                <p>Hỗ trợ</p>
                <div className="bg-[#EDFCF2] md:w-[300px] h-[214px]">

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F9FAFB] mt-4 md:mt-0 md:h-[56px]">
          <div className="container mx-auto h-full grid gap-x-6 grid-cols-2 px-6 md:px-30 items-center flex justify-between">
          <p>© 2024 Nghĩa trang Liệt sĩ Vị Xuyên. Tất cả quyền được bảo lưu.</p>
          <p>Được phát triển bởi: <span className="text-[#087443]"> NTLSVX Tech Team</span></p>
          </div>
        </div>
      </section>
    </footer>
  )
}