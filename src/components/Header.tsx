'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Logo from '../../src/assets/image/logo.png'
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const menuItems = [
    { href: '/', label: 'Trang chủ' },
    { href: '/about', label: 'Giới thiệu' },
    { href: '/book-visit', label: 'Đặt lịch viếng' },
    { href: '/grave-search', label: 'Tra cứu mộ' },
    { href: '/golden-book', label: 'Sổ vàng tri ân' },
    { href: '/news', label: 'Tin tức' },
    { href: '/find-comrade', label: 'Nhắn tìm đồng đội' },
    { href: '/contact', label: 'Liên hệ' },
  ]

  // Function để check active state
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

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
                      isActive(item.href)
                        ? 'text-[#087443]'
                        : 'text-gray-700 hover:text-[#087443]'
                    }`}
                  >
                    {item.label}
                   
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden" ref={mobileMenuRef}>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-[#087443] p-2 text-2xl"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="absolute right-4 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <ul className="flex flex-col">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link 
                        href={item.href}
                        className={`block px-4 py-3 transition-colors duration-200 relative ${
                          isActive(item.href)
                            ? 'text-[#087443] font-semibold bg-green-50'
                            : 'text-gray-700 hover:text-[#087443] hover:bg-gray-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}