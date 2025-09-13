"use client";
import * as React from "react";
import { TServiceItem, TCartItem } from "@/types/offerings";

interface CartContextType {
    cartItems: TCartItem[];
    addToCart: (serviceItem: TServiceItem, quantity: number) => void;
    removeFromCart: (serviceItemId: string) => void;
    updateQuantity: (serviceItemId: string, quantity: number) => void;
    clearCart: () => void;
    selectedItems: string[];
    toggleItemSelection: (serviceItemId: string) => void;
    selectAllItems: () => void;
    deselectAllItems: () => void;
    getSelectedItems: () => TCartItem[];
    getTotalQuantity: () => number;
    getTotalAmount: () => number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = React.useState<TCartItem[]>(() => {
        // Load from localStorage on initialization
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cart-items');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });
    const [selectedItems, setSelectedItems] = React.useState<string[]>(() => {
        // Load from localStorage on initialization
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('selected-items');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    // Save to localStorage whenever cartItems change
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart-items', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Save to localStorage whenever selectedItems change
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selected-items', JSON.stringify(selectedItems));
        }
    }, [selectedItems]);

    const addToCart = (serviceItem: TServiceItem, quantity: number) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.service_item.id === serviceItem.id);
            if (existingItem) {
                // If item exists, update quantity and move to top
                const updatedItem = { ...existingItem, quantity: existingItem.quantity + quantity };
                const otherItems = prev.filter(item => item.service_item.id !== serviceItem.id);
                return [updatedItem, ...otherItems];
            } else {
                // If new item, add to top
                return [{ service_item: serviceItem, quantity }, ...prev];
            }
        });
        
        // Only select the newly added item, deselect others
        setSelectedItems([serviceItem.id.toString()]);
    };

    const removeFromCart = (serviceItemId: string) => {
        setCartItems(prev => prev.filter(item => item.service_item.id.toString() !== serviceItemId));
        setSelectedItems(prev => prev.filter(id => id !== serviceItemId));
    };

    const updateQuantity = (serviceItemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(serviceItemId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.service_item.id.toString() === serviceItemId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        setSelectedItems([]);
    };

    const toggleItemSelection = (serviceItemId: string) => {
        setSelectedItems(prev =>
            prev.includes(serviceItemId)
                ? prev.filter(id => id !== serviceItemId)
                : [...prev, serviceItemId]
        );
    };

    const selectAllItems = () => {
        setSelectedItems(cartItems.map(item => item.service_item.id.toString()));
    };

    const deselectAllItems = () => {
        setSelectedItems([]);
    };

    const getSelectedItems = () => {
        return cartItems.filter(item => selectedItems.includes(item.service_item.id.toString()));
    };

    const getTotalQuantity = () => {
        return getSelectedItems().reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalAmount = () => {
        return getSelectedItems().reduce((total, item) => total + (item.service_item.unitPrice ? item.service_item.unitPrice * item.quantity : 0), 0);
    };

    const value: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        selectedItems,
        toggleItemSelection,
        selectAllItems,
        deselectAllItems,
        getSelectedItems,
        getTotalQuantity,
        getTotalAmount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = React.useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
