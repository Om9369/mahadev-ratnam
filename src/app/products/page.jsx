import Link from "next/link";

const categories = [
  { name: "Rings", href: "/products/rings" },
  { name: "Earrings", href: "/products/earrings" },
  { name: "Chains", href: "/products/chains" },
  { name: "Necklaces", href: "/products/necklaces" },
  { name: "Pendants", href: "/products/pendants" },
  { name: "Bangles", href: "/products/bangles" },
  { name: "Bracelets", href: "/products/bracelets" },
  { name: "Bridal", href: "/products/bridal" },
];

export default function ProductsPage() {
  return (
    <main className="pt-36 bg-[#F8F3EA] min-h-screen">
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#E8D8BC] rounded-3xl p-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3C2A20]">
            Jewellery Collections
          </h1>
          <p className="mt-4 text-[#6B5B50] max-w-2xl mx-auto">
            Explore premium wholesale jewellery categories by Mahadev Ratnam.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <h2 className="font-serif text-2xl text-[#3C2A20]">
                {cat.name}
              </h2>
              <p className="mt-3 text-[#7A6657]">
                View wholesale {cat.name.toLowerCase()} jewellery designs.
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}