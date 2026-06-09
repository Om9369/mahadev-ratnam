import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] pt-44 md:pt-48 px-4 md:px-6 pb-16">
      <section className="max-w-5xl mx-auto">
        <Link href="/admin" className="text-[#b08a32] text-sm">
          ← Back to Admin
        </Link>

        <h1 className="mt-5 text-4xl md:text-5xl font-serif text-[#3D3127]">
          Website Settings
        </h1>

        <p className="mt-3 text-gray-600">
          Manage website information, contact details and display settings.
        </p>

        <div className="mt-10 bg-white border border-[#eadfcc] rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-5">
            <input
              placeholder="Business Name"
              defaultValue="Mahadev Ratnam"
              className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none"
            />

            <input
              placeholder="WhatsApp Number"
              defaultValue="+91 9369895157"
              className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none"
            />

            <input
              placeholder="Email"
              defaultValue="your-email@gmail.com"
              className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none"
            />

            <input
              placeholder="Location"
              defaultValue="Lucknow, Uttar Pradesh, India"
              className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none"
            />

            <input
              placeholder="Business Hours"
              defaultValue="Mon - Sat: 10 AM - 7 PM"
              className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none"
            />

            <input
              placeholder="Live Rate Page Title"
              defaultValue="Live Gold & Silver Rates"
              className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <textarea
            placeholder="Homepage Tagline"
            defaultValue="Premium Gold Jewellery Wholesaler offering elegant, traditional and modern jewellery collections for retailers."
            className="mt-5 w-full border border-[#eadfcc] rounded-xl px-4 py-3 outline-none min-h-[120px]"
          />

          <button className="mt-6 bg-[#3D3127] text-white px-8 py-4 rounded-full">
            Save Settings
          </button>
        </div>
      </section>
    </main>
  );
}