import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  name: string
  price: number
  quantity: number
  modeQty?: number // Add modeQty property
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
      const modeQty = action.payload.modeQty || 3 // Default to RANGE if not specified
      
      if (existingItem) {
        if (modeQty === 1) { // FIXED - don't add if exists
          // This will be handled in the component with toast
          return
        } else if (modeQty === 2) { // CHOICES - update without increasing quantity
          existingItem.quantity = action.payload.quantity
          existingItem.name = action.payload.name
          existingItem.price = action.payload.price
        } else { // RANGE (modeQty === 3) or default - add quantity
          existingItem.quantity += action.payload.quantity
        }
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
