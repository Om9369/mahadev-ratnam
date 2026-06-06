import Link from "next/link";
import Image from "next/image";
import { allProducts } from "@/data/allProducts";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const sub = resolvedSearchParams?.sub;

  const singleProduct = allProducts.find((product) => product.slug === slug);

  if (singleProduct) {
    return (
      <main className="pt-36 bg-[#F8F3EA] min-h-screen pb-16">
        <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl p-4 shadow">
            <Image
              src={singleProduct.image}
              alt={singleProduct.name}
              width={700}
              height={700}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </div>

          <div>
            <p className="text-[#B88A44] font-semibold">
              {singleProduct.subCategory}
            </p>

            <h1 className="text-4xl md:text-5xl font-serif text-[#3C2A20] mt-3">
              {singleProduct.name}
            </h1>

            <p className="mt-5 text-[#6B5B50]">
              {singleProduct.description ||
                "Premium gold jewellery design by Mahadev Ratnam."}
            </p>

            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm space-y-3">
              <p>
                <b>Weight:</b> {singleProduct.weight || "As per design"}
              </p>

              <p>
                <b>Availability:</b>{" "}
                {singleProduct.availability || "Available"}
              </p>

              <p>
                <b>Available In:</b>{" "}
                {singleProduct.purity?.join(" / ") || "18K / 22K"}
              </p>

              {singleProduct.price18k && (
                <p>
                  <b>18K Price:</b> ₹
                  {singleProduct.price18k.toLocaleString()}
                </p>
              )}

              {singleProduct.price22k && (
                <p>
                  <b>22K Price:</b> ₹
                  {singleProduct.price22k.toLocaleString()}
                </p>
              )}

              <p className="text-sm text-[#7A6657]">
                Price may vary based on live gold rate, weight and making
                charges.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
             <AddToCartButton product={singleProduct} />

              <a
                href={`https://wa.me/919369895157?text=Hello, I want to enquire about ${singleProduct.name}`}
                target="_blank"
                className="bg-[#B88A44] text-white px-7 py-3 rounded-full text-center"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  let categoryProducts = allProducts.filter(
    (product) => product.category === slug
  );

  if (sub) {
    categoryProducts = categoryProducts.filter(
      (product) => product.subCategory === sub
    );
  }

  if (categoryProducts.length > 0) {
    return (
      <main className="pt-36 bg-[#F8F3EA] min-h-screen pb-16">
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-[#E8D8BC] rounded-3xl p-10 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-[#3C2A20] capitalize">
              {sub || `${slug} Collection`}
            </h1>

            <p className="mt-4 text-[#6B5B50] max-w-2xl mx-auto">
              Explore premium wholesale {sub || slug} jewellery designs by
              Mahadev Ratnam.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mt-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition block"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-72 object-cover"
                />

                <div className="p-5">
                  <h3 className="font-serif text-xl text-[#3C2A20]">
                    {product.name}
                  </h3>

                  <p className="text-sm text-[#7A6657] mt-1">
                    {product.subCategory}
                  </p>

                  <span className="mt-4 inline-block bg-[#B88A44] text-white px-5 py-2 rounded-full">
                    View Details
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  }

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