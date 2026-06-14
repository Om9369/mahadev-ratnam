"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { Menu, ShoppingBag, X, ChevronDown, Phone } from "lucide-react";

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
    name: "Necklaces",
    href: "/products/necklaces",
    items: [
      { name: "Designer Necklaces", href: "/products/necklaces?sub=Designer Necklaces" },
      { name: "Diamond Necklaces", href: "/products/necklaces?sub=Diamond Necklaces" },
      { name: "Floral Necklaces", href: "/products/necklaces?sub=Floral Necklaces" },
      { name: "Temple Necklaces", href: "/products/necklaces?sub=Temple Necklaces" },
    ],
  },
  {
    name: "Bangles",
    href: "/products/bangles",
    items: [
      { name: "Designer Bangles", href: "/products/bangles?sub=Designer Bangles" },
      { name: "Diamond Cut Bangles", href: "/products/bangles?sub=Diamond Cut Bangles" },
      { name: "Traditional Bangles", href: "/products/bangles?sub=Traditional Bangles" },
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
  { name: "Live Rate", href: "/live-rate", items: [] },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, cartCount, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      

      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#0F0A06]/97 backdrop-blur-xl shadow-2xl border-b border-[#C9A84C]/20"
          : "bg-[#0F0A06]/90 backdrop-blur-md border-b border-[#C9A84C]/10"
      }`}>

        {/* Main header row */}
        <div className="h-[68px] px-4 lg:px-10 flex items-center justify-between">

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#C9A84C]/30 text-[#E8C97A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <div className="font-serif text-[#F3EAD8] text-xl lg:text-2xl font-bold tracking-[0.18em] uppercase group-hover:text-[#C9A84C] transition-colors duration-300">
              Mahadev Ratnam
            </div>
            <div className="hidden sm:block text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mt-0.5 font-sans font-medium">
              Gold Jewellery Wholesaler
            </div>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3 text-[#E8C97A]">
            <a
              href="https://wa.me/919369895157"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C97A] text-[#0F0A06] px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A84C]/30 hover:-translate-y-0.5"
            >
              <Phone size={13} />
              WhatsApp Enquiry
            </a>

            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:text-[#C9A84C] transition-colors"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C9A84C] text-[#0F0A06] text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category nav row */}
        <div className="hidden lg:flex h-12 items-center justify-center gap-1 bg-[#1A1008] border-t border-[#C9A84C]/15">
          {categories.map((cat) => (
            <div key={cat.name} className="relative group h-full flex items-center px-1">
              <Link
                href={cat.href}
                className="h-full flex items-center gap-1 px-3 font-sans text-[13px] text-[#D4C0A0] hover:text-[#C9A84C] font-medium tracking-wide transition-colors duration-200"
              >
                {cat.name}
                {cat.items.length > 0 && (
                  <ChevronDown size={12} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                )}
              </Link>

              {/* Gold underline */}
              <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />

              {/* Dropdown */}
              {cat.items.length > 0 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 w-64 z-[9999]">
                  <div className="mt-2 bg-white border border-[#E8D8B8] rounded-2xl shadow-2xl overflow-hidden">
                    {/* Dropdown header */}
                    <div className="bg-gradient-to-r from-[#0F0A06] to-[#2D1A0A] px-5 py-4">
                      <h3 className="font-serif text-lg text-[#E8C97A]">{cat.name}</h3>
                      <p className="text-[10px] text-[#C9A84C]/70 mt-0.5 font-sans tracking-wider uppercase">Premium Collection</p>
                    </div>

                    {/* Dropdown links */}
                    <div className="p-2">
                      {cat.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-sans text-[#3C2A20] hover:bg-[#FCF0DD] hover:text-[#C9A84C] transition-all duration-200 group/item"
                        >
                          <span>{item.name}</span>
                          <span className="text-[#C9A84C] opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                        </Link>
                      ))}
                    </div>

                    <div className="px-3 pb-3">
                      <Link
                        href={cat.href}
                        className="block text-center bg-[#0F0A06] hover:bg-[#C9A84C] text-[#E8C97A] hover:text-[#0F0A06] py-2.5 rounded-xl text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300"
                      >
                        View All {cat.name}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[999] lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-[#0F0A06] shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-6 border-b border-[#C9A84C]/20">
              <div>
                <div className="font-serif text-[#E8C97A] text-lg tracking-widest uppercase">Mahadev Ratnam</div>
                <div className="text-[10px] text-[#C9A84C] tracking-[0.3em] uppercase mt-1 font-sans">Gold Wholesaler</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#E8C97A]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer nav */}
            <div className="px-4 py-4 space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[#D4C0A0] hover:bg-[#1A1008] hover:text-[#C9A84C] transition-all border border-transparent hover:border-[#C9A84C]/15"
                >
                  <span className="font-sans text-sm font-medium tracking-wide">{cat.name}</span>
                  <span className="text-[#C9A84C] text-lg">›</span>
                </Link>
              ))}
            </div>

            {/* Drawer footer */}
            <div className="px-4 pt-2 pb-8 space-y-3 border-t border-[#C9A84C]/10 mt-2">
              <button
                onClick={() => {
                  setOpen(false);
                  setIsOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full border border-[#C9A84C]/40 text-[#E8C97A] py-3.5 rounded-full font-sans text-sm font-semibold"
              >
                <ShoppingBag size={16} /> Cart ({cartCount})
              </button>
              <a
                href="https://wa.me/919369895157"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#C9A84C] text-[#0F0A06] py-3.5 rounded-full font-sans text-sm font-bold"
              >
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}