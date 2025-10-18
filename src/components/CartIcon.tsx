"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function CartIcon() {
    const { cartItems } = useCart();
    const cartItemsCount = cartItems.length;

    return (
        <Link
            href="/gio-hang"
            className="relative flex items-center justify-center text-gray-700 hover:text-[#087443] transition-colors duration-200"
            aria-label="Giỏ hàng"
        >
            <ShoppingCart className="h-6 w-6" />
            {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
            )}
        </Link>
    );
}
