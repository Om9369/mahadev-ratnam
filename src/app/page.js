"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { allProducts } from "@/data/allProducts";

const staticArrivals = allProducts.slice(0, 10);

const collections = [
  { title: "Rings", sub: "Ladies, Men's & Engagement", image: "/rings/ladies-ring-1.jpeg", href: "/products/rings" },
  { title: "Bridal Sets", sub: "Complete Bridal Jewellery", image: "/bridal/bridal-necklace-1.jpeg", href: "/products/bridal" },
  { title: "Necklaces", sub: "Floral, Temple & Diamond", image: "/necklaces/butterfly-necklace-1.jpeg", href: "/products/necklaces" },
  { title: "Bangles", sub: "Designer & Traditional", image: "/bangles/designer-bangle-1.jpeg", href: "/products/bangles" },
];

const whyUs = [
  { icon: "✦", title: "BIS Hallmarked", desc: "Every design is purity-certified with BIS hallmark for trusted wholesale supply." },
  { icon: "◈", title: "Pan India Delivery", desc: "Reliable supply chain supporting jewellery retailers and wholesalers across India." },
  { icon: "❋", title: "Master Craftsmen", desc: "Each piece crafted by traditional artisans blending heritage techniques with modern design." },
  { icon: "◎", title: "5000+ Retailers", desc: "Trusted by over 5,000 retail partners who choose Mahadev Ratnam for consistent quality." },
];

const stats = [
  { num: "15+", label: "Years Experience" },
  { num: "5000+", label: "Retail Partners" },
  { num: "200+", label: "Designs in Catalogue" },
  { num: "18K & 22K", label: "Certified Purity" },
];

export default function Home() {
  const [newArrivals, setNewArrivals] = useState(staticArrivals);

  useEffect(() => {
    async function loadNewArrivals() {
      try {
        const res = await fetch("/api/inventory");
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          setNewArrivals(data.products.slice(0, 10));
        }
      } catch (err) {
        console.error("Failed to load new arrivals from Supabase:", err);
      }
    }
    loadNewArrivals();
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-[#FCF8F3] text-[#2D2219] overflow-hidden">

        {/* ─── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center bg-[#0F0A06] overflow-hidden pt-28">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#C9A84C_0%,_transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#C9A84C_0%,_transparent_50%)]" />

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

          <div className="relative max-w-7xl mx-auto px-5 lg:px-10 w-full grid lg:grid-cols-2 gap-16 items-center py-16">
            {/* Left — Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-[1px] bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-[10px] md:text-xs tracking-[4px] uppercase font-sans font-semibold">Mahadev Ratnam Jewellery</span>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight">
                Crafted For<br />
                <span className="gold-shimmer">Generations.</span><br />
                <span className="text-[#F3EAD8]">Worn With</span><br />
                <span className="gold-shimmer">Royalty.</span>
              </h1>

              <p className="mt-7 text-[#A89880] leading-8 text-sm md:text-base font-sans max-w-md">
                Discover premium gold jewellery collections crafted with tradition, luxury and trust — made for retailers and wholesale buyers across India.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="#collections" className="btn-gold px-8 py-4 rounded-full text-sm text-center inline-block">
                  Explore Collections
                </a>
                <a
                  href="https://wa.me/919369895157"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#C9A84C]/40 text-[#E8C97A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 px-8 py-4 rounded-full text-sm text-center transition-all duration-300 font-sans font-semibold"
                >
                  WhatsApp Enquiry
                </a>
              </div>

              {/* Stats row */}
              <div className="mt-14 grid grid-cols-4 gap-4 border-t border-[#C9A84C]/15 pt-8">
                {stats.map((s) => (
                  <div key={s.num}>
                    <div className="font-serif text-xl md:text-2xl text-[#C9A84C]">{s.num}</div>
                    <div className="text-[10px] text-[#7A6650] mt-1 leading-4 font-sans">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              {/* Outer decorative frame */}
              <div className="absolute -inset-4 border border-[#C9A84C]/20 rounded-[2.5rem]" />
              <div className="absolute -inset-8 border border-[#C9A84C]/10 rounded-[3rem]" />

              <div className="relative rounded-[2rem] overflow-hidden border border-[#C9A84C]/30 shadow-2xl">
                <img
                  src="/images/hero-main.jpg"
                  alt="Mahadev Ratnam Premium Jewellery"
                  className="w-full h-[580px] object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A06]/60 via-transparent to-transparent" />

                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-[#C9A84C] tracking-[3px] uppercase font-sans">Premium Quality</p>
                      <p className="text-white font-serif text-lg mt-0.5">BIS Hallmarked Gold</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#C9A84C] tracking-[3px] uppercase font-sans">Available In</p>
                      <p className="text-white font-serif text-lg mt-0.5">18K & 22K</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── FEATURED COLLECTIONS ─────────────────────────── */}
        <section id="collections" className="py-20 md:py-28 px-5 lg:px-10 bg-[#0F0A06]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-[1px] bg-[#C9A84C]/40" />
                <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Premium Collections</span>
                <div className="w-12 h-[1px] bg-[#C9A84C]/40" />
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-white">Featured Collections</h2>
              <p className="mt-4 text-[#8A7560] text-sm md:text-base font-sans max-w-xl mx-auto leading-7">
                Explore our finest jewellery collections crafted for premium wholesale buyers.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {collections.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <Link
                    href={item.href}
                    className="group relative block rounded-[1.8rem] overflow-hidden border border-[#C9A84C]/25 bg-[#1A1008] hover:border-[#C9A84C]/60 transition-all duration-500 shadow-xl hover:shadow-[0_8px_40px_rgba(201,168,76,0.15)]"
                  >
                    <div className="relative h-[340px] md:h-[400px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A06]/90 via-[#0F0A06]/20 to-transparent" />

                      {/* Top badge */}
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#C9A84C]/60 flex items-center justify-center text-[#C9A84C] text-sm bg-black/30 backdrop-blur-sm group-hover:bg-[#C9A84C] group-hover:text-black transition-all duration-300">
                        ✦
                      </div>

                      {/* Bottom text */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-[10px] text-[#C9A84C] tracking-[3px] uppercase font-sans mb-2">{item.sub}</p>
                        <h3 className="font-serif text-2xl md:text-3xl text-white">{item.title}</h3>
                        <span className="mt-4 inline-flex items-center gap-2 bg-[#C9A84C] text-[#0F0A06] px-5 py-2 rounded-full text-xs font-sans font-bold tracking-wide group-hover:bg-[#E8C97A] transition-colors duration-300">
                          Explore Designs →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NEW ARRIVALS ─────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#FCF8F3] overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#C9A84C]/40" />
              <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Fresh Designs</span>
              <div className="w-12 h-[1px] bg-[#C9A84C]/40" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-[#2D2219]">New Arrivals</h2>
            <p className="mt-4 text-[#7A6650] text-sm md:text-base font-sans max-w-xl mx-auto leading-7">
              Freshly added premium jewellery designs for retailers and wholesale buyers.
            </p>
          </div>

          {/* Mobile grid */}
          <div className="grid grid-cols-2 gap-3 px-4 md:hidden">
            {newArrivals.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8D8B8] shadow-sm hover:shadow-md transition-shadow"
              >
                <img src={product.image} alt={product.name} className="h-[150px] w-full object-cover" />
                <div className="p-3">
                  <p className="text-[9px] uppercase tracking-[2px] text-[#C9A84C] font-sans font-semibold truncate">{product.subCategory}</p>
                  <h3 className="mt-1 text-sm font-serif text-[#2D2219] truncate">{product.name}</h3>
                  <span className="inline-block mt-2 text-[10px] text-[#C9A84C] font-sans font-semibold">View →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop auto-scrolling carousel */}
          <div className="hidden md:block relative overflow-hidden">
            {/* Fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FCF8F3] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FCF8F3] to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-5 w-max px-16"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            >
              {[...newArrivals, ...newArrivals].map((product, index) => (
                <Link
                  key={`${product.id}-${index}`}
                  href={`/products/${product.slug}`}
                  className="group min-w-[280px] bg-white rounded-3xl overflow-hidden border border-[#E8D8B8] shadow-md hover:shadow-xl hover:border-[#C9A84C]/40 transition-all duration-500"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[300px] w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-[2.5px] text-[#C9A84C] font-sans font-semibold">{product.subCategory}</p>
                    <h3 className="mt-2 text-xl font-serif text-[#2D2219]">{product.name}</h3>
                    <span className="inline-block mt-4 text-[#C9A84C] font-sans text-sm font-semibold group-hover:gap-2 transition-all">
                      View Details →
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── ABOUT / DESIGN STORY ─────────────────────────── */}
        <section className="py-20 md:py-28 px-5 lg:px-10 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            {/* Image collage */}
            <div className="relative">
              <img
                src="/images/bridal-collection.jpg"
                alt="Mahadev Ratnam Craftsmanship"
                className="w-full h-[420px] md:h-[520px] object-cover rounded-3xl shadow-xl"
              />
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-4 md:right-6 bg-[#0F0A06] border border-[#C9A84C]/40 rounded-2xl p-5 shadow-2xl max-w-[200px]">
                <div className="text-[#C9A84C] text-3xl font-serif font-bold">15+</div>
                <div className="text-[#E8C97A] text-xs font-sans mt-1 leading-5">Years of Trusted Jewellery Excellence</div>
              </div>
              {/* Gold accent dot */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border-2 border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-2xl">
                ✦
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[1px] bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-[10px] tracking-[4px] uppercase font-sans font-semibold">Our Story</span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl text-[#2D2219] leading-tight">
                Designs Beyond<br />
                <span className="gold-text-gradient">Imagination</span>
              </h2>

              <p className="mt-6 text-[#7A6650] leading-8 font-sans text-sm md:text-base">
                At Mahadev Ratnam, we redefine elegance with jewellery that blends India's rich heritage with contemporary artistry. Every piece is a testament to our unwavering commitment to purity, precision, and premium craftsmanship.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Unique craftsmanship for premium jewellery retailers",
                  "Modern and traditional collections for every occasion",
                  "Wholesale-focused designs with direct enquiry support",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#5A4A38] font-sans text-sm leading-6">
                    <span className="text-[#C9A84C] mt-0.5 text-lg shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex gap-4">
                <a
                  href="https://wa.me/919369895157"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-7 py-3.5 rounded-full text-sm"
                >
                  Enquire on WhatsApp
                </a>
                <Link
                  href="/products"
                  className="btn-dark px-7 py-3.5 rounded-full text-sm"
                >
                  View Catalogue
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHY CHOOSE US ────────────────────────────────── */}
        <section className="py-20 md:py-28 px-5 lg:px-10 bg-[#FCF8F3]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-[1px] bg-[#C9A84C]/40" />
                <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Our Promise</span>
                <div className="w-12 h-[1px] bg-[#C9A84C]/40" />
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-[#2D2219]">Why Choose Us?</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-white border border-[#E8D8B8] hover:border-[#C9A84C]/40 rounded-2xl p-7 text-center card-glow transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="mx-auto mb-6 w-14 h-14 rounded-full border border-[#E8D8B8] flex items-center justify-center text-[#C9A84C] text-2xl bg-[#FCF8F3] group-hover:bg-[#C9A84C] group-hover:text-white group-hover:border-[#C9A84C] transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-xl text-[#2D2219]">{item.title}</h3>
                  <p className="mt-3 text-[#7A6650] text-sm font-sans leading-6">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ───────────────────────────────────── */}
        <section className="relative py-24 md:py-32 px-5 lg:px-10 bg-[#0F0A06] overflow-hidden text-center">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_#C9A84C_0%,_transparent_65%)]" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="relative max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#C9A84C]/50" />
              <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Connect With Us</span>
              <div className="w-12 h-[1px] bg-[#C9A84C]/50" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight">
              Never Miss A<br />
              <span className="gold-shimmer">Moment of Luxury</span>
            </h2>
            <p className="mt-6 text-[#8A7560] font-sans text-sm md:text-base leading-7">
              Connect with us for the latest catalogues, live pricing, exclusive designs and wholesale partnership opportunities.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919369895157"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-10 py-4 rounded-full text-sm inline-block"
              >
                WhatsApp Enquiry →
              </a>
              <Link href="/products" className="border border-[#C9A84C]/40 text-[#E8C97A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 px-10 py-4 rounded-full text-sm font-sans font-semibold transition-all duration-300">
                View Catalogue
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ───────────────────────────────────────── */}
        <footer id="contact" className="bg-[#0F0A06] border-t border-[#C9A84C]/10">
          <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <h2 className="font-serif text-2xl text-[#E8C97A]">Mahadev Ratnam</h2>
              <div className="w-8 h-[1px] bg-[#C9A84C] mt-3 mb-5" />
              <p className="text-[#7A6650] text-sm font-sans leading-7">
                Premium Gold Jewellery Wholesaler offering elegant, traditional and modern jewellery collections for retailers across India.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="https://wa.me/919369895157"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C9A84C] text-[#0F0A06] text-xs font-bold font-sans px-4 py-2 rounded-full hover:bg-[#E8C97A] transition-colors"
                >
                  WhatsApp
                </a>
                <Link href="/live-rate" className="border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-sans px-4 py-2 rounded-full hover:border-[#C9A84C] transition-colors">
                  Live Gold Rate
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-lg text-[#E8C97A] mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "Collections", href: "#collections" },
                  { label: "About Us", href: "#about" },
                  { label: "Live Gold Rate", href: "/live-rate" },
                  { label: "Admin Panel", href: "/admin" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[#7A6650] text-sm font-sans hover:text-[#C9A84C] transition-colors flex items-center gap-2">
                      <span className="text-[#C9A84C]/40 text-xs">›</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections */}
            <div>
              <h3 className="font-serif text-lg text-[#E8C97A] mb-5">Collections</h3>
              <ul className="space-y-3">
                {["Rings", "Earrings", "Necklaces", "Bangles", "Bracelets", "Bridal"].map((cat) => (
                  <li key={cat}>
                    <Link href={`/products/${cat.toLowerCase()}`} className="text-[#7A6650] text-sm font-sans hover:text-[#C9A84C] transition-colors flex items-center gap-2">
                      <span className="text-[#C9A84C]/40 text-xs">›</span> {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-serif text-lg text-[#E8C97A] mb-5">Contact Us</h3>
              <div className="space-y-4 text-sm font-sans text-[#7A6650]">
                <div>
                  <p className="text-[#C9A84C] text-[10px] uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                  <a href="tel:+919369895157" className="hover:text-[#C9A84C] transition-colors">+91 93698 95157</a>
                </div>
                <div>
                  <p className="text-[#C9A84C] text-[10px] uppercase tracking-wider mb-1">Location</p>
                  <p>Lucknow, Uttar Pradesh, India</p>
                </div>
                <div>
                  <p className="text-[#C9A84C] text-[10px] uppercase tracking-wider mb-1">Business Hours</p>
                  <p>Mon – Sat: 10:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="border-t border-[#C9A84C]/10 py-5 px-5 lg:px-10">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-[#4A3A2A] text-xs font-sans">
                © 2025 Mahadev Ratnam. All rights reserved.
              </p>
              <p className="text-[#4A3A2A] text-xs font-sans">
                Premium Gold Jewellery Wholesaler · Lucknow, India
              </p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}