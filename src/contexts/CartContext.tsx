"use client";
import * as React from "react";
import { TServiceItem, TCartItem } from "@/types/offerings";
import { SERVICE_ITEM_MODE_QTY } from "@/constants/service-item";

interface CartContextType {
    cartItems: TCartItem[];
    addToCart: (serviceItem: TServiceItem, quantity: number) => { success: boolean; message?: string };
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

    const addToCart = React.useCallback((serviceItem: TServiceItem, quantity: number) => {
        const existingItem = cartItems.find(item => item.service_item.id === serviceItem.id);
        
        // Handle different modeQty behaviors
        if (serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.FIXED) { // FIXED
            if (existingItem) {
                return { success: false, message: "Sản phẩm đã tồn tại trong giỏ hàng" };
            } else {
                setCartItems(prev => [{ service_item: serviceItem, quantity }, ...prev]);
                setSelectedItems([serviceItem.id.toString()]);
                return { success: true, message: "Thêm vào giỏ hàng thành công" };
            }
        } else if (serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.CHOICES) { // CHOICES
            if (existingItem) {
                // Update existing product without increasing quantity
                setCartItems(prev => {
                    const updatedItem = { ...existingItem, service_item: serviceItem, quantity };
                    const otherItems = prev.filter(item => item.service_item.id !== serviceItem.id);
                    return [updatedItem, ...otherItems];
                });
                setSelectedItems([serviceItem.id.toString()]);
                return { success: true, message: "Cập nhật sản phẩm trong giỏ hàng thành công" };
            } else {
                setCartItems(prev => [{ service_item: serviceItem, quantity }, ...prev]);
                setSelectedItems([serviceItem.id.toString()]);
                return { success: true, message: "Thêm vào giỏ hàng thành công" };
            }
        } else { // RANGE (modeQty === 3) or default behavior
            const currentQty = existingItem ? existingItem.quantity : 0;
            if (serviceItem.maxQty && currentQty + quantity > serviceItem.maxQty) {
                return { success: false, message: `Sản phầm đã có trong giỏ hàng và số lượng không được vượt quá ${serviceItem.maxQty}` };
            }

            setCartItems(prev => {
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
            return { success: true, message: "Thêm vào giỏ hàng thành công" };
        }
    }, [cartItems]);

    const removeFromCart = React.useCallback((serviceItemId: string) => {
        setCartItems(prev => prev.filter(item => item.service_item.id.toString() !== serviceItemId));
        setSelectedItems(prev => prev.filter(id => id !== serviceItemId));
    }, []);

    const updateQuantity = React.useCallback((serviceItemId: string, quantity: number) => {
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
    }, [removeFromCart]);

    const clearCart = React.useCallback(() => {
        setCartItems([]);
        setSelectedItems([]);
    }, []);

    const toggleItemSelection = React.useCallback((serviceItemId: string) => {
        setSelectedItems(prev =>
            prev.includes(serviceItemId)
                ? prev.filter(id => id !== serviceItemId)
                : [...prev, serviceItemId]
        );
    }, []);

    const selectAllItems = React.useCallback(() => {
        setSelectedItems(cartItems.map(item => item.service_item.id.toString()));
    }, [cartItems]);

    const deselectAllItems = React.useCallback(() => {
        setSelectedItems([]);
    }, []);

    const getSelectedItems = React.useCallback(() => {
        return cartItems.filter(item => selectedItems.includes(item.service_item.id.toString()));
    }, [cartItems, selectedItems]);

    const getTotalQuantity = React.useCallback(() => {
        return getSelectedItems().reduce((total, item) => total + item.quantity, 0);
    }, [getSelectedItems]);

    const getTotalAmount = React.useCallback(() => {
        return getSelectedItems().reduce((total, item) => total + (item.service_item.unitPrice ? item.service_item.unitPrice * item.quantity : 0), 0);
    }, [getSelectedItems]);

    const value = React.useMemo<CartContextType>(() => ({
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
    }), [
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
    ]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = React.useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
