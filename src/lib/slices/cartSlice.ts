import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: Product[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    updateCartItem: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearCart: state => {
      state.items = []
    }
  }
})

export const { addToCart, updateCartItem, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
