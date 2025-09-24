import Facebook from "@/assets/svg/facebook.svg";
import Zalo from "@/assets/svg/zalo.svg";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  type TMenu = {
    title: string;
    url: string;
  };

  const info = [
    {
      icon: <MapPin size={20} color="#087443" />,
      content: "Thôn 18, xã Vị Xuyên, tỉnh Tuyên Quang",
    },
    {
      icon: <Phone size={20} color="#087443" />,
      content: "Trần Thanh Tuấn - 0988.678.938",
    },
    {
      icon: <Image src={Facebook} alt="Facebook" width={20} height={20} />,
      content: (
        <a
          href="https://www.facebook.com/profile.php?id=61570007917694"
          target="_blank"
        >
          Fanpage
        </a>
      ),
    },
    {
      icon: <Image src={Zalo} alt="Zalo" width={20} height={20} />,
      content: (
        <a href="https://zalo.me/1049441348897599122" target="_blank">
          Ban Quản lý Nghĩa trang Liệt sĩ Vị Xuyên
        </a>
      ),
    },
    {
      icon: <Mail size={20} color="#087443" />,
      content: "tttuanttvl@gmail.com",
    },
  ];

  const menus: TMenu[] = [
    {
      title: "Giới thiệu",
      url: "/gioi-thieu",
    },
    {
      title: "Tin tức - Sự kiện",
      url: "/tin-tuc",
    },
    {
      title: "Tra cứu mộ",
      url: "/tra-cuu",
    },
    {
      title: "Đăng ký viếng",
      url: "/dat-lich-vieng",
    },
    {
      title: "Số vàng tri ân",
      url: "#",
    },
    {
      title: "Nhắn tìm đồng đội",
      url: "/nhan-tim-dong-doi",
    },
  ];

  const supportMenus: TMenu[] = [
    {
      title: "Hướng dẫn mua hàng",
      url: "/huong-dan-mua-hang",
    },
    {
      title: "Chính sách giao hàng",
      url: "/chinh-sach-giao-hang",
    },
    {
      title: "Phương thức thanh toán",
      url: "/phuong-thuc-thanh-toan",
    },
    {
      title: "Bảo hành và đổi trả",
      url: "/bao-hanh-doi-tra",
    },
    {
      title: "Chính sách bảo mật",
      url: "/chinh-sach-bao-mat",
    },
  ];

  return (
    <footer className="">
      <section className="pt-16 border-t-1">
        <div className="container px-6 mx-auto md:px-30 text-center pb-8">
          <div className="grid lg:grid-cols-2 gap-y-6 lg:gap-y-0 gap-x-8">
            <div className="text-left">
              {info.map((item, index) => {
                return (
                  <div key={index} className="flex items-center mb-2">
                    {item.icon}
                    <p className="pl-2 text-base">{item.content}</p>
                  </div>
                );
              })}
              <p className="text-base mt-4">
                © 2025 Sản phẩm phát triển bởi Ban Quản lý Nghĩa trang Liệt sĩ
                Vị Xuyên
              </p>
            </div>
            <div className="grid gap-y-6 lg:gap-y-0 lg:grid-cols-2">
              <div className="text-left">
                <p className="pb-4 font-semibold text-base">Liên kết nhanh</p>
                {menus.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={item.url}
                      className="text-base block text-[#475467] leading-[28px] hover:text-[#087443] transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
              <div className="text-left">
                <p className="pb-4 font-semibold text-base">Thông tin khác</p>
                {supportMenus.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={item.url}
                      className="text-base block text-[#475467] leading-[28px] hover:text-[#087443] transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F9FAFB] mt-4 md:mt-0 md:h-[24px] items-center flex justify-center">
          <p className="text-center md:text-right text-[14px] opacity-50">
            <a  href="https://www.facebook.com/nguyen.kyz" target="_blank">Powered by kyz - nguyenkyct@gmail.com</a>
          </p>
        </div>
      </section>
    </footer>
  );
}
