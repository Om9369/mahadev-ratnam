"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/#collections" },
    { name: "About", href: "/#about" },
    { name: "Live Rate", href: "/live-rate" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-[#F4EBDD] border-b border-[#D8C4A3]">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#3C2A20]"
          aria-label="Toggle Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-serif text-[#3C2A20] text-xl md:text-2xl font-semibold tracking-[0.12em] uppercase"
        >
          Mahadev Ratnam
        </Link>

        <div className="hidden md:flex items-center gap-8">
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
            className="font-serif bg-[#B88A44] text-white px-5 py-2 rounded-full tracking-[0.08em] hover:bg-[#9B7134] transition"
          >
            Enquire
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#F4EBDD] border-t border-[#D8C4A3] border-b border-[#D8C4A3] px-6 py-5">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-serif text-[#3C2A20] text-base border-b border-[#D8C4A3] pb-3"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="https://wa.me/918417884230"
              onClick={() => setOpen(false)}
              className="bg-[#B88A44] text-white text-center px-5 py-3 rounded-full font-serif"
            >
              Enquire on WhatsApp
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}