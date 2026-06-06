"use client";

import Link from "next/link";
import { Menu, Search, Heart, User, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const categories = [
    { name: "All Jewellery", href: "/products" },
    { name: "Gold", href: "/products/gold" },
    { name: "Earrings", href: "/products/earrings" },
    { name: "Rings", href: "/products/rings" },
    { name: "Necklaces", href: "/products/necklaces" },
    { name: "Bridal", href: "/products/bridal" },
    { name: "Daily Wear", href: "/products/daily-wear" },
    { name: "Gifting", href: "/products/gifting" },
    { name: "Live Rate", href: "/live-rate" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[999999] bg-[#F4EBDD] border-b border-[#D8C4A3]">
      <input type="checkbox" id="menu-toggle" className="peer hidden" />

      <div className="h-20 px-4 lg:px-10 flex items-center justify-between gap-6">
        <label
          htmlFor="menu-toggle"
          className="lg:hidden flex items-center justify-center w-12 h-12 text-[#3C2A20] cursor-pointer"
        >
          <Menu size={30} />
        </label>

        <Link
          href="/"
          className="font-serif text-[#3C2A20] text-lg lg:text-2xl font-semibold tracking-[0.12em] uppercase"
        >
          Mahadev Ratnam
        </Link>

        <div className="hidden lg:flex flex-1 max-w-xl items-center border border-[#D8C4A3] rounded-full px-4 py-2 bg-white">
          <Search size={18} />
          <input
            placeholder="Search for gold necklace"
            className="w-full bg-transparent outline-none px-3 text-sm"
          />
        </div>

        <div className="hidden lg:flex items-center gap-5 text-[#3C2A20]">
          <Heart size={22} />
          <User size={22} />
          <ShoppingBag size={22} />
        </div>

        <div className="w-12 lg:hidden"></div>
      </div>

      <div className="hidden lg:flex h-14 items-center justify-center gap-9 bg-[#F8F3EA] border-t border-[#D8C4A3]">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="h-full flex items-center font-serif text-[#3C2A20] text-sm hover:text-[#9B7134]"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="hidden peer-checked:block lg:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[#F8F3EA] overflow-y-auto z-[999998]">
        <div className="px-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex items-center justify-between py-4 border-b border-[#E5DDD0]"
            >
              <span className="font-serif text-xl text-[#3C2A20]">
                {cat.name}
              </span>
              <span className="text-2xl text-[#7A6657]">›</span>
            </Link>
          ))}

          <Link
            href="https://wa.me/919369895157"
            className="block mt-6 bg-[#B88A44] text-white text-center px-5 py-3 rounded-full font-serif"
          >
            Enquire on WhatsApp
          </Link>
        </div>
      </div>
    </nav>
  );
}