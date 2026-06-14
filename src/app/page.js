                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                "use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { allProducts } from "@/data/allProducts";
import CustomerReviews from "@/components/CustomerReviews";

const staticArrivals = allProducts.slice(0, 10);

const collections = [
  { title: "Rings", sub: "Ladies, Men's & Engagement", image: "/images/rings-collection.jpg", href: "/products/rings" },
  { title: "Bridal Sets", sub: "Complete Bridal Jewellery", image: "/images/bridal-collection.jpg", href: "/products/bridal" },
  { title: "Necklaces", sub: "Floral, Temple & Diamond", image: "/images/necklace-collection.jpg", href: "/products/necklaces" },
  { title: "Earrings", sub: "Designer, Jhumka & Stud", image: "/images/earrings-collection.jpg", href: "/products/earrings" },
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
  const [particles, setParticles] = useState([]);
  const [ctaParticles, setCtaParticles] = useState([]);

  useEffect(() => {
    // Initialize particles on client side (reduced for performance)
    setParticles(
      [...Array(8)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 8 + Math.random() * 6
      }))
    );

    // Initialize CTA particles (reduced for performance)
    setCtaParticles(
      [...Array(6)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 6 + Math.random() * 4
      }))
    );

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
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#C9A84C] rounded-full opacity-30"
                initial={{ scale: 0 }}
                animate={{
                  y: [null, -1000],
                  scale: [0, 1, 0],
                  opacity: [0.3, 0.6, 0]
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear"
                }}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`
                }}
              />
            ))}
          </div>

          {/* Background texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#C9A84C_0%,_transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#C9A84C_0%,_transparent_50%)]" />

          {/* Animated grid lines */}
          <motion.div 
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)", backgroundSize: "80px 80px" }}
            animate={{
              backgroundPosition: ["0px 0px", "80px 80px"]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />

         <div className="relative max-w-7xl mx-auto px-5 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16">
            {/* Left — Text */}
            <motion.div
              className="text-center lg:text-left flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div 
                  className="w-8 h-[1px] bg-[#C9A84C]"
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
                <span className="text-[#C9A84C] text-[10px] md:text-xs tracking-[4px] uppercase font-sans font-semibold">Mahadev Ratnam Jewellery</span>
              </motion.div>

              <motion.h1 
                className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Crafted For<br />
                <span className="gold-shimmer">Generations.</span><br />
                <span className="text-[#F3EAD8]">Worn With</span><br />
                <span className="gold-shimmer">Royalty.</span>
              </motion.h1>

              <motion.p 
                className="mt-7 text-[#A89880] leading-8 text-sm md:text-base font-sans max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Discover premium gold jewellery collections crafted with tradition, luxury and trust — made for retailers and wholesale buyers across India.
              </motion.p>

              <motion.div 
               className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start w-full lg:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.a 
                  href="#collections" 
                  className="btn-gold px-8 py-4 rounded-full text-sm text-center inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Collections
                </motion.a>
                <motion.a
                  href="https://wa.me/919369895157"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#C9A84C]/40 text-[#E8C97A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 px-8 py-4 rounded-full text-sm text-center transition-all duration-300 font-sans font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  WhatsApp Enquiry
                </motion.a>
              </motion.div>

              {/* Stats row */}
              <motion.div 
               className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#C9A84C]/15 pt-8 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {stats.map((s, i) => (
                  <motion.div 
                    key={s.num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.6 }}
                  >
                    <div className="font-serif text-xl md:text-2xl text-[#C9A84C]">{s.num}</div>
                    <div className="text-[10px] text-[#7A6650] mt-1 leading-4 font-sans">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              {/* Outer decorative frame with animation */}
              <motion.div 
                className="absolute -inset-4 border border-[#C9A84C]/20 rounded-[2.5rem]"
                animate={{
                  rotate: [0, 0.5, 0, -0.5, 0]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -inset-8 border border-[#C9A84C]/10 rounded-[3rem]"
                animate={{
                  rotate: [0, -0.5, 0, 0.5, 0]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div 
                className="relative rounded-[2rem] overflow-hidden border border-[#C9A84C]/30 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="/images/hero1.jpg"
                  alt="Mahadev Ratnam Premium Jewellery"
                  className="w-full h-[580px] object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A06]/60 via-transparent to-transparent" />

                {/* Floating card with animation */}
                <motion.div 
                  className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  whileHover={{ y: -5 }}
                >
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
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── FEATURED COLLECTIONS ─────────────────────────── */}
        <section id="collections" className="py-20 md:py-28 px-5 lg:px-10 bg-[#0F0A06] relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div 
                  className="w-12 h-[1px] bg-[#C9A84C]/40"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Premium Collections</span>
                <motion.div 
                  className="w-12 h-[1px] bg-[#C9A84C]/40"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <motion.h2 
                className="font-serif text-4xl md:text-6xl text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Featured Collections
              </motion.h2>
              <motion.p 
                className="mt-4 text-[#8A7560] text-sm md:text-base font-sans max-w-xl mx-auto leading-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Explore our finest jewellery collections crafted for premium wholesale buyers.
              </motion.p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {collections.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -10 }}
                >
                  <Link
                    href={item.href}
                    className="group relative block rounded-[1.8rem] overflow-hidden border border-[#C9A84C]/25 bg-[#1A1008] hover:border-[#C9A84C]/60 transition-all duration-500 shadow-xl hover:shadow-[0_20px_60px_rgba(201,168,76,0.25)]"
                  >
                    <div className="relative h-[340px] md:h-[400px] overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A06]/95 via-[#0F0A06]/30 to-transparent" />

                      {/* Animated top badge */}
                      <motion.div 
                        className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#C9A84C]/60 flex items-center justify-center text-[#C9A84C] text-sm bg-black/30 backdrop-blur-sm"
                        whileHover={{ 
                          bg: "#C9A84C", 
                          color: "#0F0A06",
                          rotate: 360,
                          scale: 1.1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        ✦
                      </motion.div>

                      {/* Bottom text */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <motion.p 
                          className="text-[10px] text-[#C9A84C] tracking-[3px] uppercase font-sans mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                        >
                          {item.sub}
                        </motion.p>
                        <motion.h3 
                          className="font-serif text-2xl md:text-3xl text-white"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.span 
                          className="mt-4 inline-flex items-center gap-2 bg-[#C9A84C] text-[#0F0A06] px-5 py-2 rounded-full text-xs font-sans font-bold tracking-wide"
                          whileHover={{ bg: "#E8C97A", x: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          Explore Designs →
                        </motion.span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NEW ARRIVALS ─────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#FCF8F3] overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #C9A84C 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          
          <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-12 text-center relative z-10">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="w-12 h-[1px] bg-[#C9A84C]/40"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Fresh Designs</span>
              <motion.div 
                className="w-12 h-[1px] bg-[#C9A84C]/40"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.div>
            <motion.h2 
              className="font-serif text-4xl md:text-6xl text-[#2D2219]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              New Arrivals
            </motion.h2>
            <motion.p 
              className="mt-4 text-[#7A6650] text-sm md:text-base font-sans max-w-xl mx-auto leading-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Freshly added premium jewellery designs for retailers and wholesale buyers.
            </motion.p>
          </div>

          {/* Mobile grid */}
          <div className="grid grid-cols-2 gap-3 px-4 md:hidden relative z-10">
            {newArrivals.slice(0, 6).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8D8B8] shadow-sm hover:shadow-xl hover:border-[#C9A84C]/40 transition-all duration-300 block"
                >
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-[150px] w-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[9px] uppercase tracking-[2px] text-[#C9A84C] font-sans font-semibold truncate">{product.subCategory}</p>
                    <h3 className="mt-1 text-sm font-serif text-[#2D2219] truncate">{product.name}</h3>
                    <motion.span 
                      className="inline-block mt-2 text-[10px] text-[#C9A84C] font-sans font-semibold"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      View →
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
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
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {[...newArrivals, ...newArrivals].map((product, index) => (
                <motion.div
                  key={`${product.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group min-w-[280px] bg-white rounded-3xl overflow-hidden border border-[#E8D8B8] shadow-md hover:shadow-2xl hover:border-[#C9A84C]/60 transition-all duration-500 block"
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="h-[300px] w-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] uppercase tracking-[2.5px] text-[#C9A84C] font-sans font-semibold">{product.subCategory}</p>
                      <h3 className="mt-2 text-xl font-serif text-[#2D2219]">{product.name}</h3>
                      <motion.span 
                        className="inline-block mt-4 text-[#C9A84C] font-sans text-sm font-semibold"
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.3 }}
                      >
                        View Details →
                      </motion.span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── ABOUT / DESIGN STORY ─────────────────────────── */}
        <section className="py-20 md:py-28 px-5 lg:px-10 bg-white relative overflow-hidden">
          {/* Background decorative element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/3 rounded-full blur-3xl" />
          
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">
            {/* Image collage */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="/images/necklace-collection.jpg"
                  alt="Mahadev Ratnam Craftsmanship"
                  className="w-full h-[420px] md:h-[520px] object-cover rounded-3xl shadow-xl"
                />
              </motion.div>
              {/* Floating accent card */}
              <motion.div 
                className="absolute -bottom-6 -right-4 md:right-6 bg-[#0F0A06] border border-[#C9A84C]/40 rounded-2xl p-5 shadow-2xl max-w-[200px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#C9A84C] text-3xl font-serif font-bold">15+</div>
                <div className="text-[#E8C97A] text-xs font-sans mt-1 leading-5">Years of Trusted Jewellery Excellence</div>
              </motion.div>
              {/* Gold accent dot */}
              <motion.div 
                className="absolute -top-4 -left-4 w-20 h-20 rounded-full border-2 border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-2xl"
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                ✦
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="text-center lg:text-left flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div 
                  className="w-8 h-[1px] bg-[#C9A84C]"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
                <span className="text-[#C9A84C] text-[10px] tracking-[4px] uppercase font-sans font-semibold">Our Story</span>
              </motion.div>

              <motion.h2 
                className="font-serif text-4xl md:text-5xl text-[#2D2219] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Designs Beyond<br />
                <span className="gold-text-gradient">Imagination</span>
              </motion.h2>

              <motion.p 
                className="mt-6 text-[#7A6650] leading-8 font-sans text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                At Mahadev Ratnam, we redefine elegance with jewellery that blends India's rich heritage with contemporary artistry. Every piece is a testament to our unwavering commitment to purity, precision, and premium craftsmanship.
              </motion.p>

              <motion.ul 
                className="mt-8 space-y-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {[
                  "Unique craftsmanship for premium jewellery retailers",
                  "Modern and traditional collections for every occasion",
                  "Wholesale-focused designs with direct enquiry support",
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3 text-[#5A4A38] font-sans text-sm leading-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                  >
                    <motion.span 
                      className="text-[#C9A84C] mt-0.5 text-lg shrink-0"
                      whileHover={{ scale: 1.2, rotate: 45 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✦
                    </motion.span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div 
                className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <motion.a
                  href="https://wa.me/919369895157"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-7 py-3.5 rounded-full text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enquire on WhatsApp
                </motion.a>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/products" className="btn-dark px-7 py-3.5 rounded-full text-sm">
                    View Catalogue
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── WHY CHOOSE US ────────────────────────────────── */}
        <section className="py-20 md:py-28 px-5 lg:px-10 bg-[#FCF8F3] relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #C9A84C 1px, transparent 0)", backgroundSize: "30px 30px" }} />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div 
                  className="w-12 h-[1px] bg-[#C9A84C]/40"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Our Promise</span>
                <motion.div 
                  className="w-12 h-[1px] bg-[#C9A84C]/40"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </div>
              <motion.h2 
                className="font-serif text-4xl md:text-6xl text-[#2D2219]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Why Choose Us?
              </motion.h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group bg-white border border-[#E8D8B8] hover:border-[#C9A84C]/60 rounded-2xl p-7 text-center card-glow transition-all duration-500 shadow-lg hover:shadow-2xl"
                >
                  <motion.div 
                    className="mx-auto mb-6 w-14 h-14 rounded-full border border-[#E8D8B8] flex items-center justify-center text-[#C9A84C] text-2xl bg-[#FCF8F3] group-hover:bg-[#C9A84C] group-hover:text-white group-hover:border-[#C9A84C] transition-all duration-500"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <motion.h3 
                    className="font-serif text-xl text-[#2D2219]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p 
                    className="mt-3 text-[#7A6650] text-sm font-sans leading-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                  >
                    {item.desc}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ───────────────────────────────────── */}
        <section className="relative py-24 md:py-32 px-5 lg:px-10 bg-[#0F0A06] overflow-hidden text-center">
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_#C9A84C_0%,_transparent_65%)]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.3, 0.25]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }}
            animate={{
              backgroundPosition: ["0px 0px", "60px 60px"]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {ctaParticles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#C9A84C] rounded-full opacity-20"
                initial={{ scale: 0 }}
                animate={{
                  y: [null, "-20%"],
                  scale: [0, 1, 0],
                  opacity: [0.2, 0.5, 0]
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear"
                }}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`
                }}
              />
            ))}
          </div>

         <div className="relative max-w-4xl mx-auto z-10 px-4">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="w-12 h-[1px] bg-[#C9A84C]/50"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Connect With Us</span>
              <motion.div 
                className="w-12 h-[1px] bg-[#C9A84C]/50"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.div>
            <motion.h2 
              className="font-serif text-4xl md:text-6xl text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Never Miss A<br />
              <span className="gold-shimmer">Moment of Luxury</span>
            </motion.h2>
            <motion.p 
              className="mt-6 text-[#8A7560] font-sans text-sm md:text-base leading-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Connect with us for the latest catalogues, live pricing, exclusive designs and wholesale partnership opportunities.
            </motion.p>
            <motion.div 
             className="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.a
                href="https://wa.me/919369895157"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-8 py-4 rounded-full text-sm inline-block w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(201,168,76,0.4)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                WhatsApp Enquiry →
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }} className="w-full sm:w-auto">
                <Link 
                  href="/products" 
                  className="border border-[#C9A84C]/40 text-[#E8C97A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 px-8 py-4 rounded-full text-sm font-sans font-semibold transition-all duration-300 block text-center"
                >
                  View Catalogue
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── CUSTOMER REVIEWS ─────────────────────────────── */}
        <CustomerReviews limit={3} />

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