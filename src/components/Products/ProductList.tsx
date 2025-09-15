'use client'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart, Product as CartProduct, Product } from '@/lib/slices/cartSlice'
import Cart from '@/components/Cart/Cart'
import { IProduct } from '@/types/products';
import Image from 'next/image'
import { toast } from 'react-toastify'
import { RootState } from '@/lib/store'
import { SERVICE_ITEM_MODE_QTY } from '@/constants/service-item';

interface ProductListProps {
  products: IProduct[];
}

export default function ProductList({ products }: ProductListProps) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const handleAddToCart = (product: IProduct) => {
    const productId = typeof product.id === 'string' ? parseInt(product.id, 10) : product.id
    const existingItem = cartItems.find(item => item.id === productId)
    const modeQty = SERVICE_ITEM_MODE_QTY.RANGE // Default to RANGE for products without modeQty
    
    if (modeQty === SERVICE_ITEM_MODE_QTY.FIXED) { // FIXED
      if (existingItem) {
        toast.error("Sản phẩm đã tồn tại trong giỏ hàng")
        return
      }
    }
    
    const cartProduct: CartProduct = {
      id: productId,
      name: product.name,
      price: product.price,
      quantity: 1,
      modeQty: modeQty
    }
    
    dispatch(addToCart(cartProduct))
    
    // Show appropriate success message
    if (modeQty === 2 && existingItem) {
      toast.success("Cập nhật sản phẩm trong giỏ hàng thành công")
    } else {
      toast.success("Thêm vào giỏ hàng thành công")
    }
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="border p-4 rounded shadow-sm hover:shadow-md transition">
                <div className="h-48 mb-4 overflow-hidden">
                  <Image 
                    src='https://cdn.hoanghamobile.com/Uploads/2024/09/10/iphone-16-pro-sa-mac-1.png;trim.threshold=80;trim.percentpadding=0.5;width=180;height=180;mode=pad;' 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-1">{product.price.toLocaleString('vi-VN')} đ</p>
              {product.description && (
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
              )}
              <button
                className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => handleAddToCart(product)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-8 text-center text-gray-500">
            Không có sản phẩm nào.
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <Cart />
      </div>
    </div>
  )
} 