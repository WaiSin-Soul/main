"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
  } = useCart();

  const subtotal = getTotalPrice();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white text-black shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isCartOpen}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button
            onClick={closeCart}
            className="text-xs uppercase tracking-widest text-gray-600"
          >
            Close
          </button>
        </div>

        <div className="flex h-[calc(100%-210px)] flex-col gap-4 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden bg-gray-100">
                  <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">{item.name}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-gray-400 hover:text-gray-700"
                      aria-label={`Remove ${item.name}`}
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="h-6 w-6 border border-gray-300 text-xs"
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      -
                    </button>
                    <span className="text-xs">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 border border-gray-300 text-xs"
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full border border-black py-2 text-center text-xs uppercase tracking-widest"
            >
              View Cart
            </Link>
            <button className="w-full bg-black py-2 text-xs uppercase tracking-widest text-white">
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
