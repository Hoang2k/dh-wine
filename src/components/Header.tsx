'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import CartIcon from './CartIcon'
import Logo from '../../src/assets/image/l1.jpg'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false)
    window.addEventListener('keydown', onKey)
    if (isMobileMenuOpen) setTimeout(() => firstLinkRef.current?.focus(), 80)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => setIsMobileMenuOpen((o) => !o)

  const menuItems = [
    { href: '/', label: 'Trang chủ' },
    { href: '/gioi-thieu', label: 'Giới thiệu' },
    { href: '/dat-lich-vieng', label: 'Đặt lịch viếng' },
    // { href: '/dat-do-le', label: 'Đặt đồ lễ' },
    { href: '/tra-cuu', label: 'Tra cứu' },
    // { href: '/so-vang-tri-an', label: 'Sổ vàng tri ân' },
    { href: '/tin-tuc', label: 'Tin tức' },
    { href: '/media', label: 'Thư viện' },
    { href: '/lien-he', label: 'Liên hệ' },
  ]

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="bg-[#fbfbfb] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-16 md:h-16 relative">
                <Image
                  src={Logo}
                  alt="Logo Nghĩa trang liệt sĩ Vị Xuyên"
                  fill
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[#087443] font-bold text-sm md:text-lg lg:text-xl leading-tight">
                  NGHĨA TRANG LIỆT SĨ VỊ XUYÊN
                </h1>
              </div>
            </Link>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-5">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`font-bold text-[14px] transition-colors duration-200 whitespace-nowrap relative ${
                      isActive(item.href) ? 'text-[#087443]' : 'text-gray-700 hover:text-[#087443]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Shopping Cart Icon */}
            <div className="ml-4">
              <CartIcon />
            </div>
          </nav>

          {/* Mobile Menu Controls */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Shopping Cart Icon for Mobile */}
            <CartIcon />
            
            {/* Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-[#087443] p-2 text-2xl"
              aria-label="Mở menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay + Drawer Mobile */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-[opacity,visibility] duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          className={`absolute left-0 top-0 h-screen w-2/3 bg-white shadow-xl transition-transform duration-300 ease-out 
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold">Menu</span>
          </div>

          <nav className="p-2">
            {menuItems.map((item, i) => (
              <Link
                key={item.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block hover:cursor-pointer border-[#ececec] border-b-1 px-4 py-3 text-base transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-[#087443] font-semibold bg-green-50'
                    : 'text-gray-800 hover:bg-gray-100 hover:text-[#087443]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}