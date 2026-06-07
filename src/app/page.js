"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/categories";
import { allProducts } from "@/data/allProducts";

const newArrivals = allProducts.slice(0, 8);
const bestSellers = Object.entries(products);

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-[#fffaf3] text-[#3D3127] overflow-hidden">
        {/* HERO */}
        <section className="pt-32 md:pt-40 pb-14 md:pb-20 px-4 md:px-6 bg-[#fffaf3]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <p className="uppercase tracking-[3px] md:tracking-[5px] text-[10px] md:text-xs text-[#b08a32] mb-4 md:mb-5">
                Mahadev Ratnam Jewellery
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-tight text-[#3D3127]">
                Crafted For Generations. Designed For Royalty.
              </h1>

              <p className="mt-5 md:mt-6 text-gray-600 text-base md:text-lg leading-7 md:leading-8">
                Discover premium gold jewellery collections crafted with tradition,
                luxury and trust for retailers and wholesale buyers.
              </p>

              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="#collections"
                  className="bg-[#3D3127] text-white px-7 py-4 rounded-full text-center"
                >
                  Explore Collection
                </a>

                <a
                  href="https://wa.me/919369895157"
                  target="_blank"
                  className="border border-[#3D3127] px-7 py-4 rounded-full text-center"
                >
                  WhatsApp Enquiry
                </a>
              </div>
            </div>

            <div className="border border-[#c9a24d] rounded-t-full overflow-hidden">
              <img
                src="/images/hero-main.jpg"
                alt="Mahadev Ratnam Jewellery"
                className="w-full h-[420px] md:h-[600px] object-cover block"
              />
            </div>
          </div>
        </section>

        {/* FEATURED COLLECTIONS */}
        <section className="relative py-16 md:py-24 px-4 md:px-6 bg-[#120b08] overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,#d4af37,transparent_35%)]"></div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <p className="uppercase tracking-[4px] md:tracking-[5px] text-[10px] md:text-xs text-[#d4af37] mb-4">
                Premium Jewellery Categories
              </p>

              <h2 className="text-4xl md:text-6xl font-serif text-white">
                Featured Collections
              </h2>

              <p className="mt-4 md:mt-5 text-sm md:text-base text-[#c9b8a2] max-w-2xl mx-auto">
                Explore our most elegant jewellery categories crafted for premium wholesale buyers.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
              {[
                {
                  title: "Rings",
                  image: "/rings/ladies-ring-1.jpeg",
                  link: "/products/rings",
                },
                {
                  title: "Bridal",
                  image: "/bridal/bridal-necklace-1.jpeg",
                  link: "/products/bridal",
                },
                {
                  title: "Necklaces",
                  image: "/necklaces/butterfly-necklace-1.jpeg",
                  link: "/products/necklaces",
                },
                {
                  title: "Bangles",
                  image: "/bangles/designer-bangle-1.jpeg",
                  link: "/products/bangles",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className="group relative block rounded-[1.5rem] md:rounded-[2rem] border border-[#d4af37]/40 bg-[#1d120d] p-2 md:p-3 shadow-2xl overflow-hidden"
                >
                  <div className="relative h-[300px] md:h-[390px] overflow-hidden rounded-[1.2rem] md:rounded-[1.5rem]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <div className="absolute top-4 right-4 h-9 w-9 md:h-10 md:w-10 rounded-full border border-[#d4af37]/70 flex items-center justify-center text-[#d4af37] bg-black/30">
                      ✦
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <p className="text-[10px] md:text-xs uppercase tracking-[2px] md:tracking-[3px] text-[#d4af37] mb-2">
                        Explore Collection
                      </p>

                      <h3 className="text-2xl md:text-3xl font-serif text-white">
                        {item.title}
                      </h3>

                      <span className="mt-4 md:mt-5 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-4 md:px-5 py-2 text-xs md:text-sm text-[#120b08] font-medium">
                        View Designs →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEW ARRIVALS */}
<section className="py-14 md:py-24 px-4 md:px-6 bg-[#fffaf3] overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-8 md:mb-14">
      <p className="uppercase tracking-[3px] md:tracking-[4px] text-[10px] md:text-xs text-[#b08a32] mb-3">
        Latest Jewellery Designs
      </p>

      <h2 className="text-4xl md:text-6xl font-serif text-[#3D3127]">
        New Arrivals
      </h2>

      <p className="mt-3 md:mt-5 text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-6">
        Freshly added premium jewellery designs for retailers and wholesale buyers.
      </p>
    </div>

    {/* Mobile Grid */}
    <div className="grid grid-cols-2 gap-3 md:hidden">
      {newArrivals.slice(0, 6).map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.slug}`}
          className="bg-white rounded-2xl overflow-hidden border border-[#eadfcc] shadow-sm"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-[145px] w-full object-cover"
          />

          <div className="p-3">
            <p className="text-[8px] uppercase tracking-[1.5px] text-[#b08a32] truncate">
              {product.subCategory}
            </p>

            <h3 className="mt-1 text-base font-serif text-[#3D3127] truncate">
              {product.name}
            </h3>

            <span className="inline-block mt-2 text-[11px] text-[#b08a32] font-medium">
              View →
            </span>
          </div>
        </Link>
      ))}
    </div>

    {/* Desktop Moving Carousel */}
    <div className="hidden md:block relative overflow-hidden">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 95,
          ease: "linear",
        }}
      >
        {[...newArrivals, ...newArrivals].map((product, index) => (
          <Link
            key={`${product.id}-${index}`}
            href={`/products/${product.slug}`}
            className="group min-w-[320px] bg-white rounded-3xl overflow-hidden border border-[#eadfcc] shadow-sm hover:shadow-2xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-[360px] w-full object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="p-6">
              <p className="text-xs uppercase tracking-[2px] text-[#b08a32]">
                {product.subCategory}
              </p>

              <h3 className="mt-2 text-2xl font-serif text-[#3D3127]">
                {product.name}
              </h3>

              <span className="inline-block mt-5 text-[#b08a32] font-medium">
                View Details →
              </span>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  </div>
</section>

        {/* BEST SELLER */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-10 md:mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#b08a32]">
                  Best Seller
                </h2>

                <p className="mt-4 text-gray-600 max-w-2xl">
                  Explore our most loved jewellery designs crafted for elegance,
                  trust and wholesale excellence.
                </p>
              </div>

              <a
                href="#collections"
                className="self-start border border-[#3D3127] px-6 py-3 rounded-full text-sm"
              >
                Discover Full Collection →
              </a>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {bestSellers.map(([slug, item]) => (
                <div
                  key={slug}
                  className="bg-white border border-[#eadfcc] p-3 group rounded-2xl overflow-hidden"
                >
                  <Link href={`/products/${slug}`}>
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-60 md:h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                      />
                    </div>

                    <h3 className="mt-4 text-xl font-serif">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </Link>

                  <a
                    href="https://wa.me/919369895157"
                    target="_blank"
                    className="inline-block mt-4 text-sm text-[#b08a32]"
                  >
                    Enquire →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN SECTION */}
        <section id="about" className="py-16 md:py-20 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <img
              src="/images/bridal-collection.jpg"
              alt="Design"
              className="w-full h-[360px] md:h-[520px] object-cover rounded-3xl"
            />

            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-serif text-[#b08a32]">
                Designs Beyond Imagination
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                At Mahadev Ratnam, we redefine elegance with jewellery that
                blends Indian tradition with modern artistry.
              </p>

              <ul className="mt-8 space-y-4 text-gray-700 text-left">
                <li>1. Unique craftsmanship for premium jewellery retailers.</li>
                <li>2. Modern and traditional collections for every occasion.</li>
                <li>3. Wholesale-focused designs with direct enquiry support.</li>
              </ul>

              <a
                href="https://wa.me/919369895157"
                target="_blank"
                className="inline-block mt-8 border-b border-[#3D3127]"
              >
                Discover Extraordinary Designs →
              </a>
            </div>
          </div>
        </section>

        {/* SHOP BY CATEGORY */}
        <section id="collections" className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-[#b08a32] mb-10 md:mb-12 text-center md:text-left">
              Shop by Category
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {Object.entries(products).map(([slug, product]) => (
                <Link
                  key={slug}
                  href={`/products/${slug}`}
                  className="group bg-white border border-[#d8c5a3] overflow-hidden rounded-3xl md:rounded-t-full text-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 md:h-80 w-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl font-serif text-[#b08a32]">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-gray-600">{product.category}</p>

                    <span className="inline-block mt-6 border border-[#b08a32] px-6 py-2 rounded-full text-sm">
                      Explore →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <p className="uppercase tracking-[4px] text-xs text-[#b08a32] text-center mb-4">
              Our Promise
            </p>

            <h2 className="text-4xl md:text-5xl font-serif text-[#3D3127] text-center">
              Why Choose Us?
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10 md:mt-14">
              {[
                {
                  title: "BIS Hallmarked Jewellery",
                  desc: "Purity-focused jewellery crafted for trusted wholesale business.",
                },
                {
                  title: "Pan India Wholesale Supply",
                  desc: "Reliable jewellery supply support for retailers across India.",
                },
                {
                  title: "Premium Craftsmanship",
                  desc: "Elegant designs made with traditional and modern artistry.",
                },
                {
                  title: "Trusted by Retailers",
                  desc: "Built for long-term wholesale relationships and repeat buyers.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group bg-[#fffaf3] border border-[#eadfcc] p-7 md:p-8 min-h-[220px] md:min-h-[230px] rounded-2xl text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-500"
                >
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white border border-[#d8c5a3] text-[#b08a32] text-3xl group-hover:bg-[#3D3127] group-hover:text-white transition duration-500">
                    ✦
                  </div>

                  <h3 className="font-serif text-2xl text-[#3D3127]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-7 text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO CONTENT */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-[#fffaf3]">
          <div className="max-w-5xl mx-auto text-center">
            <p className="uppercase tracking-[4px] text-xs text-[#b08a32] mb-5">
              Wholesale Jewellery Excellence
            </p>

            <h2 className="text-4xl md:text-5xl font-serif text-[#3D3127] mb-6">
              Premium Gold Jewellery Wholesaler in India
            </h2>

            <p className="text-gray-600 leading-8 text-base md:text-lg">
              Mahadev Ratnam is a trusted gold jewellery wholesaler based in India,
              offering premium rings, earrings, necklaces and bridal jewellery
              collections for retailers and jewellery businesses. Our designs combine
              traditional craftsmanship with modern elegance, ensuring exceptional
              quality, purity and customer satisfaction.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-[#fff7ea] text-center border-y border-[#e5c98a]">
          <h2 className="text-4xl md:text-5xl font-serif text-[#3D3127]">
            Never Miss A Moment Of Luxury
          </h2>

          <p className="mt-5 text-[#6b5b4a]">
            Connect with us for latest catalogues, pricing and designs.
          </p>

          <a
            href="https://wa.me/919369895157"
            target="_blank"
            className="inline-block mt-8 bg-gradient-to-r from-[#b08a32] to-[#d4af37] text-white px-9 py-4 rounded-full shadow-lg"
          >
            WhatsApp Enquiry
          </a>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="bg-[#fffaf3] text-[#3D3127] px-4 md:px-6">
          <div className="max-w-7xl mx-auto py-14 md:py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <h2 className="text-3xl font-serif text-[#b08a32]">
                Mahadev Ratnam
              </h2>
              <div className="w-10 h-[1px] bg-[#b08a32] mt-3 mb-5"></div>
              <p className="text-gray-600 leading-7">
                Premium Gold Jewellery Wholesaler offering elegant, traditional and
                modern jewellery collections for retailers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif text-[#b08a32] mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-[#b08a32]">Home</a></li>
                <li><a href="#collections" className="hover:text-[#b08a32]">Collections</a></li>
                <li><a href="#about" className="hover:text-[#b08a32]">About</a></li>
                <li><a href="/live-rate" className="hover:text-[#b08a32]">Live Gold Rate</a></li>
                <li><a href="#contact" className="hover:text-[#b08a32]">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-serif text-[#b08a32] mb-4">
                Contact
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>Phone: +91 9369895157</p>
                <p>WhatsApp: +91 9369895157</p>
                <p>Email: your-email@gmail.com</p>
                <p>Lucknow, Uttar Pradesh, India</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif text-[#b08a32] mb-4">
                Business Info
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>Gold Jewellery Wholesaler</p>
                <p>Pan India Wholesale Supply</p>
                <p>Custom Orders Available</p>
                <p>Mon - Sat: 10 AM - 7 PM</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e5c98a] py-6 text-center text-gray-600 text-sm">
            © 2026 Mahadev Ratnam. All Rights Reserved.
          </div>
        </footer>
      </main>
    </>
  );
}