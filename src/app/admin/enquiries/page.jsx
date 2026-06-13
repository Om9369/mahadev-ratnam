import Link from "next/link";
import AdminProtected from "@/components/AdminProtected";

const enquiries = [
  {
    id: 1,
    name: "Retail Buyer",
    product: "Bridal Necklace",
    phone: "+91 9369895157",
    status: "New",
  },
  {
    id: 2,
    name: "Jewellery Retailer",
    product: "Designer Bangles",
    phone: "+91 9369895157",
    status: "Follow Up",
  },
];

export default function EnquiriesPage() {
  return (
    <AdminProtected>
      <main className="min-h-screen bg-[#fffaf3] pt-44 md:pt-48 px-4 md:px-6 pb-16">
      <section className="max-w-6xl mx-auto">
        <Link href="/admin" className="text-[#b08a32] text-sm">
          ← Back to Admin
        </Link>

        <h1 className="mt-5 text-4xl md:text-5xl font-serif text-[#3D3127]">
          Customer Enquiries
        </h1>

        <p className="mt-3 text-gray-600">
          Track customer product enquiries and follow-ups.
        </p>

        <div className="mt-10 overflow-x-auto bg-white border border-[#eadfcc] rounded-2xl">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-[#f8efe0] text-[#3D3127]">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Product</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {enquiries.map((item) => (
                <tr key={item.id} className="border-t border-[#eadfcc]">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.product}</td>
                  <td className="p-4">{item.phone}</td>
                  <td className="p-4">
                    <span className="bg-[#fff7e6] text-[#b08a32] px-3 py-1 rounded-full text-sm">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <a
                      href={`https://wa.me/${item.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      className="text-[#b08a32]"
                    >
                      WhatsApp →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
     </main>
    </AdminProtected>
  );
}