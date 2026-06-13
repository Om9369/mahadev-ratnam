import Link from "next/link";
import AdminProtected from "@/components/AdminProtected";

const categories = [
  "Rings",
  "Earrings",
  "Chains",
  "Necklaces",
  "Pendants",
  "Bangles",
  "Bracelets",
  "Bridal",
];

export default function AdminCategoriesPage() {
  return (
    <AdminProtected>
      <main className="min-h-screen bg-[#fffaf3] pt-44 md:pt-48 px-4 md:px-6 pb-16">
        <section className="max-w-6xl mx-auto">
          <Link href="/admin" className="text-[#b08a32] text-sm">
            ← Back to Admin
          </Link>

          <h1 className="mt-5 text-4xl md:text-5xl font-serif text-[#3D3127]">
            Manage Categories
          </h1>

          <p className="mt-3 text-gray-600">
            View jewellery categories used in the product catalogue.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {categories.map((cat) => (
              <div
                key={cat}
                className="bg-white border border-[#eadfcc] rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-serif text-[#b08a32]">
                  {cat}
                </h2>

                <p className="mt-3 text-gray-600 text-sm">
                  Category active
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AdminProtected>
  );
}