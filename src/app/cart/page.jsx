"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const whatsappMessage = cart
    .map(
      (item) =>
        `${item.name} - ${item.subCategory} | Qty: ${item.quantity}`
    )
    .join("%0A");

  return (
    <main className="pt-36 min-h-screen bg-[#F8F3EA] pb-20">
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#E8D8BC] rounded-3xl p-8 text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3C2A20]">
            Your Jewellery Cart
          </h1>
          <p className="text-[#6B5B50] mt-3">
            Review your selected wholesale jewellery designs.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
            <h2 className="text-2xl font-serif text-[#3C2A20]">
              Your cart is empty
            </h2>

            <Link
              href="/products"
              className="inline-block mt-6 bg-[#B88A44] text-white px-7 py-3 rounded-full"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row gap-5"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={140}
                    height={140}
                    className="rounded-2xl object-cover w-full sm:w-36 h-40 sm:h-36"
                  />

                  <div className="flex-1">
                    <p className="text-sm text-[#B88A44] font-semibold">
                      {item.subCategory}
                    </p>

                    <h3 className="text-2xl font-serif text-[#3C2A20] mt-1">
                      {item.name}
                    </h3>

                    <p className="text-sm text-[#7A6657] mt-2">
                      Available in {item.purity?.join(" / ") || "18K / 22K"}
                    </p>

                    <div className="flex items-center gap-3 mt-5">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-9 h-9 rounded-full border border-[#B88A44] flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-semibold text-[#3C2A20]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-9 h-9 rounded-full border border-[#B88A44] flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 self-start"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[#120B08] text-white rounded-3xl p-7 h-fit shadow-xl">
              <h2 className="text-2xl font-serif text-[#F8E7B9]">
                Enquiry Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>Total Designs</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>Total Quantity</span>
                  <span>{totalItems}</span>
                </div>

                <p className="text-[#D6A84F] text-xs leading-relaxed">
                  Final price will be shared based on live gold rate, purity,
                  weight and making charges.
                </p>
              </div>

              <a
                href={`https://wa.me/919369895157?text=Hello Mahadev Ratnam,%0AI want to enquire about:%0A${whatsappMessage}`}
                target="_blank"
                className="block mt-7 bg-[#D6A84F] text-[#120B08] text-center px-6 py-3 rounded-full font-semibold"
              >
                Checkout on WhatsApp
              </a>

              <button
                onClick={clearCart}
                className="w-full mt-4 border border-[#D6A84F]/50 text-[#F8E7B9] px-6 py-3 rounded-full"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}