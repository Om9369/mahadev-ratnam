"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  return (
    <>
      <Navbar />
      <main className="pt-28 min-h-screen bg-[#FCF8F3] pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-sans text-[#9A8870] mb-6">
              <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
              <span>›</span>
              <span className="text-[#2D2219] font-medium">Cart</span>
            </nav>

            <h1 className="font-serif text-4xl md:text-5xl text-[#2D2219]">Shopping Cart</h1>
            <p className="mt-2 text-[#7A6650] font-sans">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6 text-[#C9A84C]">✦</div>
              <h2 className="font-serif text-2xl text-[#2D2219] mb-4">Your cart is empty</h2>
              <p className="text-[#7A6650] font-sans mb-8">Browse our collections to find your perfect piece</p>
              <Link href="/products" className="btn-gold px-8 py-4 rounded-full text-sm inline-block">
                Browse Collections
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.purity}`} className="bg-white rounded-2xl p-6 border border-[#E8D8B8] shadow-sm">
                    <div className="flex gap-6">
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-[#E8D8B8] flex-shrink-0">
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
                          className="font-serif text-lg text-[#2D2219] hover:text-[#C9A84C] transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>

                        <p className="text-[10px] uppercase tracking-wider text-[#C9A84C] font-sans font-semibold mt-1">
                          {item.purity} Gold
                        </p>

                        <p className="font-serif text-xl text-[#2D2219] mt-2">
                          ₹{Number(item.price).toLocaleString("en-IN")}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-[#E8D8B8] rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.purity, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center text-[#9A8870] hover:text-[#2D2219] hover:bg-[#FCF8F3] transition-colors"
                            >
                              −
                            </button>
                            <span className="w-12 text-center text-sm font-semibold text-[#2D2219]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.purity, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center text-[#9A8870] hover:text-[#2D2219] hover:bg-[#FCF8F3] transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id, item.purity)}
                            className="text-xs text-red-600 hover:text-red-700 font-sans font-semibold transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {cart.length > 1 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:text-red-700 font-sans font-semibold transition-colors"
                  >
                    Clear Cart
                  </button>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border border-[#E8D8B8] shadow-sm sticky top-32">
                  <h2 className="font-serif text-xl text-[#2D2219] border-b border-[#F0E6D0] pb-4 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-sans text-[#7A6650]">Subtotal</span>
                      <span className="font-serif text-lg text-[#2D2219]">
                        ₹{cartTotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-sans text-[#7A6650]">Shipping</span>
                      <span className="text-sm font-sans text-[#C9A84C]">Calculated at checkout</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-sans text-[#7A6650]">Making Charges</span>
                      <span className="text-sm font-sans text-[#C9A84C]">To be confirmed</span>
                    </div>
                  </div>

                  <div className="border-t border-[#F0E6D0] pt-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-semibold text-[#2D2219]">Estimated Total</span>
                      <span className="font-serif text-2xl text-[#2D2219]">
                        ₹{cartTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#9A8870] font-sans leading-5 mb-6">
                    * Final price will be confirmed based on live gold rate, making charges, and shipping. WhatsApp us for exact pricing.
                  </p>

                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/919369895157?text=Hello%20Mahadev%20Ratnam%2C%20I%20want%20to%20place%20an%20order.%0A%0ACart%20Items%3A%0A${cart.map(item => `- ${item.name} (${item.purity}) x${item.quantity} - ₹${Number(item.price * item.quantity).toLocaleString('en-IN')}`).join('%0A')}%0A%0ATotal%3A%20₹${cartTotal.toLocaleString('en-IN')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full btn-gold text-center py-4 rounded-full text-sm"
                    >
                      Order via WhatsApp →
                    </a>

                    <Link
                      href="/products"
                      className="block w-full border border-[#C9A84C]/40 text-[#2D2219] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 text-center py-4 rounded-full text-sm font-sans font-semibold transition-all"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
