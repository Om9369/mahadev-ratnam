"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8D8B8]">
          <h2 className="font-serif text-2xl text-[#2D2219]">Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#9A8870] hover:text-[#2D2219] text-3xl transition-colors"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 text-[#C9A84C]">✦</div>
              <p className="text-[#7A6650] font-sans">Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 btn-gold px-8 py-3 rounded-full text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.purity}`} className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#E8D8B8] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-serif text-base text-[#2D2219] hover:text-[#C9A84C] transition-colors line-clamp-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>

                    <p className="text-[10px] uppercase tracking-wider text-[#C9A84C] font-sans font-semibold mt-1">
                      {item.purity} Gold
                    </p>

                    <p className="font-serif text-lg text-[#2D2219] mt-2">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-[#E8D8B8] rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.purity, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#9A8870] hover:text-[#2D2219] hover:bg-[#FCF8F3] transition-colors"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-[#2D2219]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.purity, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#9A8870] hover:text-[#2D2219] hover:bg-[#FCF8F3] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.purity)}
                        className="text-[10px] text-red-600 hover:text-red-700 font-sans font-semibold transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#E8D8B8] p-6 bg-[#FCF8F3]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-sans text-[#7A6650]">Subtotal</span>
              <span className="font-serif text-2xl text-[#2D2219]">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="text-[10px] text-[#9A8870] font-sans mb-4">
              * Prices exclude shipping and making charges. Final price will be confirmed on WhatsApp.
            </p>

            <div className="space-y-3">
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="block w-full btn-dark text-center py-4 rounded-full text-sm"
              >
                View Full Cart
              </Link>

              <a
                href={`https://wa.me/919369895157?text=Hello%20Mahadev%20Ratnam%2C%20I%20want%20to%20place%20an%20order.%0A%0ACart%20Items%3A%0A${cart.map(item => `- ${item.name} (${item.purity}) x${item.quantity}`).join('%0A')}%0A%0ATotal%3A%20₹${cartTotal.toLocaleString('en-IN')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full btn-gold text-center py-4 rounded-full text-sm"
              >
                Order via WhatsApp →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
