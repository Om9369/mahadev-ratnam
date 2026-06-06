"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import {
  Menu,
  Search,
  Heart,
  User,
  ShoppingBag,
  X,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

 const categories = [
  {
    name: "All Jewellery",
    href: "/products",
    items: [
      { name: "All Collections", href: "/products" },
      { name: "Rings", href: "/products/rings" },
      { name: "Earrings", href: "/products/earrings" },
      { name: "Chains", href: "/products/chains" },
      { name: "Necklaces", href: "/products/necklaces" },
    ],
  },

  {
    name: "Rings",
    href: "/products/rings",
    items: [
      { name: "Ladies Rings", href: "/products/rings?sub=Ladies Rings" },
      { name: "Men's Rings", href: "/products/rings?sub=Men's Rings" },
      { name: "Religious Rings", href: "/products/rings?sub=Religious Rings" },
      { name: "Designer Rings", href: "/products/rings?sub=Designer Rings" },
      { name: "Engagement Rings", href: "/products/rings?sub=Engagement Rings" },
      { name: "Couple Rings", href: "/products/rings?sub=Couple Rings" },
    ],
  },

  {
    name: "Earrings",
    href: "/products/earrings",
    items: [
      { name: "Designer Earrings", href: "/products/earrings?sub=Designer Earrings" },
      { name: "Hoop Earrings", href: "/products/earrings?sub=Hoop Earrings" },
      { name: "Jhumka Earrings", href: "/products/earrings?sub=Jhumka Earrings" },
      { name: "Stud Earrings", href: "/products/earrings?sub=Stud Earrings" },
      { name: "Temple Earrings", href: "/products/earrings?sub=Temple Earrings" },
    ],
  },

  {
    name: "Chains",
    href: "/products/chains",
    items: [
      { name: "Herringbone Chains", href: "/products/chains?sub=Herringbone Chains" },
      { name: "Designer Chains", href: "/products/chains?sub=Designer Chains" },
      { name: "Snake Chains", href: "/products/chains?sub=Snake Chains" },
      { name: "Traditional Chains", href: "/products/chains?sub=Traditional Chains" },
    ],
  },

  {
    name: "Necklaces",
    href: "/products/necklaces",
    items: [
      { name: "Designer Necklaces", href: "/products/necklaces?sub=Designer Necklaces" },
      { name: "Diamond Necklaces", href: "/products/necklaces?sub=Diamond Necklaces" },
      { name: "Floral Necklaces", href: "/products/necklaces?sub=Floral Necklaces" },
      { name: "Light Weight Necklaces", href: "/products/necklaces?sub=Light Weight Necklaces" },
      { name: "Temple Necklaces", href: "/products/necklaces?sub=Temple Necklaces" },
    ],
  },

  {
    name: "Pendants",
    href: "/products/pendants",
    items: [
      { name: "Designer Pendants", href: "/products/pendants?sub=Designer Pendants" },
      { name: "Floral Pendants", href: "/products/pendants?sub=Floral Pendants" },
    ],
  },

  {
    name: "Bangles",
    href: "/products/bangles",
    items: [
      { name: "Designer Bangles", href: "/products/bangles?sub=Designer Bangles" },
      { name: "Diamond Cut Bangles", href: "/products/bangles?sub=Diamond Cut Bangles" },
      { name: "Open Bangles", href: "/products/bangles?sub=Open Bangles" },
      { name: "Traditional Bangles", href: "/products/bangles?sub=Traditional Bangles" },
    ],
  },

  {
    name: "Bracelets",
    href: "/products/bracelets",
    items: [
      { name: "Designer Bracelets", href: "/products/bracelets?sub=Designer Bracelets" },
      { name: "Lightweight Bracelets", href: "/products/bracelets?sub=Lightweight Bracelets" },
      { name: "Openable Bracelets", href: "/products/bracelets?sub=Openable Bracelets" },
      { name: "Rope Bracelets", href: "/products/bracelets?sub=Rope Bracelets" },
    ],
  },

  {
    name: "Bridal",
    href: "/products/bridal",
    items: [
      { name: "Bridal Necklaces", href: "/products/bridal?sub=Bridal Necklaces" },
      { name: "Bridal Sets", href: "/products/bridal?sub=Bridal Sets" },
    ],
  },

  {
    name: "Live Rate",
    href: "/live-rate",
  },
];

 return (
  <>
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#120B08]/95 backdrop-blur-md border-b border-[#B88A44]/30 shadow-lg">

      <div className="h-20 px-4 lg:px-10 flex items-center justify-between gap-6">
        <button
  type="button"
  onClick={() => setOpen(!open)}
  className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full border border-[#B88A44]/40 text-[#F8E7B9] relative z-[999999]"
>
  <Menu size={26} />
</button>

        <Link href="/" className="text-center">
          <div className="font-serif text-[#F8E7B9] text-lg lg:text-2xl font-semibold tracking-[0.16em] uppercase">
            Mahadev Ratnam
          </div>
          <div className="hidden sm:block text-[10px] tracking-[0.35em] text-[#D6A84F] uppercase mt-1">
            Gold Wholesaler
          </div>
        </Link>

        <div className="hidden lg:flex flex-1 max-w-xl items-center border border-[#B88A44]/40 rounded-full px-4 py-2 bg-white/95 shadow-inner">
          <Search size={18} className="text-[#7A5A2A]" />
          <input
            placeholder="Search rings, earrings, necklaces..."
            className="w-full bg-transparent outline-none px-3 text-sm text-[#3C2A20]"
          />
        </div>

        <div className="hidden lg:flex items-center gap-4 text-[#F8E7B9]">
          <Heart size={21} className="hover:text-[#D6A84F] cursor-pointer" />
          <User size={21} className="hover:text-[#D6A84F] cursor-pointer" />
          <Link href="/cart" className="relative hover:text-[#D6A84F]">
  <ShoppingBag size={21} />

  {cart.length > 0 && (
    <span className="absolute -top-3 -right-3 bg-[#D6A84F] text-[#120B08] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
      {cart.length}
    </span>
  )}
</Link>

          <Link
            href="https://wa.me/919369895157"
            target="_blank"
            className="ml-2 bg-[#D6A84F] text-[#120B08] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#F8E7B9] transition"
          >
            Enquire
          </Link>
        </div>

        <div className="w-11 lg:hidden"></div>
      </div>

      <div className="hidden lg:flex h-14 items-center justify-center gap-7 bg-[#1A100C] border-t border-[#B88A44]/20 relative">
        {categories.map((cat) => (
          <div key={cat.name} className="relative group h-full flex items-center">
            <Link
              href={cat.href}
              className="h-full flex items-center gap-1 font-serif text-[#F8E7B9] text-sm hover:text-[#D6A84F] transition"
            >
              {cat.name}
              <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition" />
            </Link>

            <div className="absolute top-full left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-[#FFF8ED] shadow-2xl border border-[#D8C4A3] rounded-2xl w-72 z-[999999] overflow-hidden">
              <div className="bg-[#E8D8BC] px-5 py-4">
                <h3 className="font-serif text-xl text-[#3C2A20]">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#7A6657] mt-1">
                  Premium wholesale collection
                </p>
              </div>

              <div className="p-4 space-y-1">
                {cat.items?.map((item) => (
  <Link
    key={item.name}
    href={item.href}
    className="block px-3 py-2 rounded-lg text-sm text-[#3C2A20] hover:bg-[#F4EBDD] hover:text-[#B88A44] transition"
  >
    {item.name}
  </Link>
))}
              </div>

              <Link
                href={cat.href}
                className="block m-4 mt-0 text-center bg-[#3C2A20] text-white py-2 rounded-full text-sm hover:bg-[#B88A44] transition"
              >
                View Collection
              </Link>
            </div>
          </div>
        ))}
      </div>

           </nav>

      {open && (
        <div className="fixed inset-0 z-[999999] bg-black/70 lg:hidden">
          <div className="w-[86%] max-w-sm h-full bg-[#120B08] px-5 py-6 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#B88A44]/30 pb-5">
              <div>
                <h2 className="font-serif text-[#F8E7B9] text-lg tracking-widest">
                  MAHADEV RATNAM
                </h2>
                <p className="text-xs text-[#D6A84F] mt-1">
                  Premium Gold Wholesaler
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[#F8E7B9]"
              >
                <X size={26} />
              </button>
            </div>

            <div className="mt-6 space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[#F8E7B9] hover:bg-[#1A100C] border-b border-[#B88A44]/10"
                >
                  <span className="font-serif text-base">{cat.name}</span>
                  <span className="text-[#D6A84F]">›</span>
                </Link>
              ))}
            </div>

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="block mt-6 bg-[#3C2A20] border border-[#B88A44]/40 text-[#F8E7B9] text-center px-5 py-3 rounded-full font-semibold"
            >
              Cart ({cart.length})
            </Link>

            <Link
              href="https://wa.me/919369895157"
              target="_blank"
              className="block mt-4 bg-[#D6A84F] text-[#120B08] text-center px-5 py-3 rounded-full font-semibold"
            >
              Enquire on WhatsApp
            </Link>
          </div>
        </div>
      )}
    </>
      );
}