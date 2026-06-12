"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const whatsappMessage = cart
    .map((item) => `${item.name} (${item.subCategory}) — Qty: ${item.quantity}`)
    .join("%0A");

  return (
    <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">

      {/* Page Header */}
      <section className="relative bg-[#0F0A06] py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_#C9A84C_0%,_transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-[#C9A84C]/50" />
            <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Your Selection</span>
            <div className="w-10 h-[1px] bg-[#C9A84C]/50" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Jewellery Enquiry Cart</h1>
          <p className="mt-4 text-[#8A7560] font-sans text-sm max-w-md mx-auto">
            Review your selected designs and send a direct WhatsApp enquiry.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 mt-10">

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-14 text-center border border-[#E8D8B8] shadow-sm">
            <ShoppingBag size={52} className="text-[#C9A84C]/40 mx-auto mb-5" />
            <h2 className="font-serif text-3xl text-[#2D2219] mb-3">Your Cart is Empty</h2>
            <p className="text-[#9A8870] font-sans text-sm mb-8 max-w-sm mx-auto leading-7">
              You haven't selected any designs yet. Browse our premium jewellery collections to add items.
            </p>
            <Link
              href="/products"
              className="btn-gold px-8 py-4 rounded-full text-sm inline-block"
            >
              Explore Collections →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl md:rounded-3xl border border-[#E8D8B8] p-4 md:p-5 flex gap-4 md:gap-6 hover:border-[#C9A84C]/30 hover:shadow-md transition-all duration-300"
                >
                  {/* Product image */}
                  <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-[#E8D8B8] shrink-0 w-24 md:w-36 h-28 md:h-36">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#C9A84C] uppercase tracking-[2px] font-sans font-semibold">{item.subCategory}</p>
                    <h3 className="font-serif text-lg md:text-2xl text-[#2D2219] mt-1 leading-tight">{item.name}</h3>
                    <p className="text-xs text-[#9A8870] font-sans mt-2">
                      Purity: {Array.isArray(item.purity) ? item.purity.join(" / ") : item.purity || "18K / 22K"}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 rounded-full border border-[#E8D8B8] flex items-center justify-center text-[#7A6650] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-serif text-xl text-[#2D2219] min-w-[24px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 rounded-full border border-[#E8D8B8] flex items-center justify-center text-[#7A6650] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#C0B0A0] hover:text-red-500 transition-colors self-start p-1"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="bg-[#0F0A06] rounded-3xl p-7 border border-[#C9A84C]/20 shadow-2xl sticky top-32">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6 border-b border-[#C9A84C]/15 pb-5">
                <div className="w-4 h-[1px] bg-[#C9A84C]" />
                <h2 className="font-serif text-xl text-[#E8C97A]">Enquiry Summary</h2>
              </div>

              {/* Summary rows */}
              <div className="space-y-3 text-sm font-sans">
                <div className="flex justify-between text-[#9A8870]">
                  <span>Unique Designs</span>
                  <span className="text-[#E8C97A] font-semibold">{cart.length}</span>
                </div>
                <div className="flex justify-between text-[#9A8870] border-b border-[#C9A84C]/10 pb-3">
                  <span>Total Quantity</span>
                  <span className="text-[#E8C97A] font-semibold">{totalItems}</span>
                </div>
              </div>

              {/* Price note */}
              <div className="mt-5 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-2xl p-4">
                <p className="text-[#C9A84C] text-[11px] font-sans leading-5 text-center">
                  ✦ Final price will be shared based on live gold rate, purity, weight and making charges.
                </p>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/919369895157?text=Hello%20Mahadev%20Ratnam%2C%0AI%20want%20to%20enquire%20about%3A%0A${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold block mt-6 text-center py-4 rounded-full text-sm"
              >
                Checkout on WhatsApp →
              </a>

              <button
                onClick={clearCart}
                className="w-full mt-3 border border-[#C9A84C]/25 text-[#8A7560] hover:text-[#C9A84C] hover:border-[#C9A84C]/50 py-3 rounded-full text-sm font-sans font-semibold transition-all"
              >
                Clear Cart
              </button>

              <Link
                href="/products"
                className="block text-center mt-4 text-[#7A6650] hover:text-[#C9A84C] text-xs font-sans transition-colors"
              >
                ← Continue Browsing
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}