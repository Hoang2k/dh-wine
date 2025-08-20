'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import { removeFromCart, updateCartItem, clearCart } from '@/lib/slices/cartSlice'
import { ChangeEvent } from 'react'

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdate = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value)
    if (quantity >= 1) {
      dispatch(updateCartItem({ id, quantity }))
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="border p-2 my-2 flex justify-between items-center">
                <div>
                  <p>{item.name}</p>
                  <p>Giá: ${item.price*item.quantity}</p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleRemove(item.id)}
                  >
                    Xóa
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="w-16 p-1 border rounded"
                    onChange={(e) => handleUpdate(item.id, e)}
                  />
                </div>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            onClick={handleClearCart}
          >
            Xóa hết giỏ hàng
          </button>
        </div>
      )}
    </div>
  )
}
