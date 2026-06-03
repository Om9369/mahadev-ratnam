import Navbar from "@/components/Navbar";
import Link from "next/link";
import { products } from "@/data/products";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 text-center">
          <h1 className="text-4xl font-serif">Product Not Found</h1>
          <Link href="/" className="inline-block mt-6 text-[#b08a32]">
            Back To Home
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fffaf3] pt-32 px-6">
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
                href="/"
                className="border border-[#3D3127] px-8 py-4 rounded-full"
              >
                Back To Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}