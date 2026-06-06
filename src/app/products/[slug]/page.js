import Link from "next/link";
import { products } from "@/data/categories";

const categoryData = {
  gold: {
    title: "Gold Jewellery Collection",
    description:
      "Premium gold jewellery crafted for retailers and wholesale buyers.",
    products: [
      "Gold Rings",
      "Gold Earrings",
      "Gold Necklaces",
      "Gold Bangles",
      "Gold Chains",
      "Bridal Gold Collection",
    ],
  },

  earrings: {
    title: "Earrings Collection",
    description:
      "Elegant earrings collection including studs, jhumkas, hoops and chandbalis.",
    products: [
      "Gold Studs",
      "Jhumkas",
      "Hoops",
      "Drop Earrings",
      "Chandbalis",
      "Daily Wear Earrings",
    ],
  },

  rings: {
    title: "Rings Collection",
    description:
      "Premium gold rings for daily wear, engagement and wholesale collections.",
    products: [
      "Gold Rings",
      "Engagement Rings",
      "Couple Rings",
      "Daily Wear Rings",
      "Statement Rings",
      "Traditional Rings",
    ],
  },

  necklaces: {
    title: "Necklaces Collection",
    description:
      "Premium gold necklaces and necklace sets for wholesale jewellery buyers.",
    products: [
      "Gold Necklaces",
      "Necklace Sets",
      "Lightweight Necklaces",
      "Bridal Necklaces",
      "Traditional Necklaces",
      "Daily Wear Necklaces",
    ],
  },

  bridal: {
    title: "Bridal Jewellery Collection",
    description:
      "Royal bridal jewellery collections crafted for wedding and retail demand.",
    products: [
      "Bridal Sets",
      "Wedding Necklace Sets",
      "Traditional Sets",
      "Heavy Gold Necklaces",
      "Bridal Earrings",
      "Gold Bangles",
    ],
  },

  "daily-wear": {
    title: "Daily Wear Collection",
    description:
      "Lightweight and elegant daily wear jewellery designs.",
    products: [
      "Daily Wear Rings",
      "Daily Wear Earrings",
      "Lightweight Pendants",
      "Office Wear Jewellery",
      "Simple Chains",
      "Minimal Bracelets",
    ],
  },

  gifting: {
    title: "Gifting Jewellery Collection",
    description:
      "Premium jewellery gift collections for festive, birthday and anniversary occasions.",
    products: [
      "Birthday Jewellery Gifts",
      "Anniversary Gifts",
      "Gold Pendants",
      "Elegant Bracelets",
      "Gift Rings",
      "Festive Jewellery Gifts",
    ],
  },
};

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const category = categoryData[slug];

  if (category) {
    return (
      <main className="pt-36 bg-[#F8F3EA] min-h-screen pb-16">
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-[#E8D8BC] rounded-3xl p-10 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-[#3C2A20]">
              {category.title}
            </h1>
            <p className="mt-4 text-[#6B5B50] max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mt-12">
          <div className="grid md:grid-cols-3 gap-6">
            {category.products.map((name) => (
              <div key={name} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="h-64 bg-[#EFE7DA] flex items-center justify-center text-[#7A6657]">
                  Product Image Coming Soon
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-xl text-[#3C2A20]">
                    {name}
                  </h3>

                  <Link
                    href={`https://wa.me/919369895157?text=Hello, I want to enquire about ${name}`}
                    className="mt-4 inline-block bg-[#B88A44] text-white px-5 py-2 rounded-full"
                  >
                    Enquire on WhatsApp
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  const product = products[slug];

  if (!product) {
    return (
      <main className="min-h-screen pt-36 text-center bg-[#F8F3EA]">
        <h1 className="text-4xl font-serif text-[#3C2A20]">
          Product Not Found
        </h1>
        <Link href="/products" className="inline-block mt-6 text-[#B88A44]">
          Back To Collections
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] pt-36 px-6">
      <section className="max-w-7xl mx-auto py-16 grid md:grid-cols-2 gap-14 items-center">
        <div className="overflow-hidden border border-[#d8c5a3]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[600px] object-cover"
          />
        </div>

        <div>
          <p className="uppercase tracking-[5px] text-xs text-[#b08a32] mb-4">
            {product.category}
          </p>

          <h1 className="text-5xl md:text-6xl font-serif text-[#3D3127]">
            {product.name}
          </h1>

          <p className="mt-6 text-gray-600 leading-8">
            {product.description}
          </p>

          <div className="mt-8 space-y-3 text-gray-700">
            <p>
              <strong>Material:</strong> {product.material}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/919369895157?text=Hello, I want to enquire about ${product.name}`}
              target="_blank"
              className="bg-[#8B7355] text-white px-8 py-4 rounded-full"
            >
              Enquire on WhatsApp
            </a>

            <Link
              href="/products"
              className="border border-[#3D3127] px-8 py-4 rounded-full"
            >
              Back To Collections
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}