'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { FaShoppingCart, FaUser } from 'react-icons/fa'

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  
 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  return (
    <header className="bg-gray-200 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="/">Trang Chủ</Link>
          <Link href="/products">Sản Phẩm</Link>
          <Link href="/articles">Bài Viết</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-xl relative">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
          </Link>
          
          <div className="relative" ref={userMenuRef}>
            <button 
              className="text-xl p-2" 
              onClick={toggleUserMenu}
            >
              <FaUser />
            </button>
            
            {isUserMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
              >
                <Link 
                  href="/register" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Đăng ký
                </Link>
                <Link 
                  href="/login" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}