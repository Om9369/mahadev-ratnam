"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/#collections" },
    { name: "About", href: "/#about" },
    { name: "Live Rate", href: "/live-rate" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[999999] bg-[#F4EBDD] border-b border-[#D8C4A3]">
      <input type="checkbox" id="menu-toggle" className="peer hidden" />

      <div className="max-w-7xl mx-auto px-4 lg:px-10 h-16 flex items-center justify-between">
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

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-serif text-[#4B382E] text-sm tracking-[0.12em] hover:text-[#B88A44] transition"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="https://wa.me/918417884230"
            className="font-serif bg-[#B88A44] text-white px-5 py-2 rounded-full tracking-[0.08em]"
          >
            Enquire
          </Link>
        </div>
      </div>

      <div className="hidden peer-checked:block lg:hidden fixed top-16 left-0 w-full z-[999998] bg-[#F4EBDD] border-b border-[#D8C4A3] px-6 py-5 shadow-xl">
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-serif text-[#3C2A20] text-base border-b border-[#D8C4A3] pb-3"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="https://wa.me/918417884230"
            className="bg-[#B88A44] text-white text-center px-5 py-3 rounded-full font-serif"
          >
            Enquire on WhatsApp
          </Link>
        </div>
      </div>
    </nav>
  );
}