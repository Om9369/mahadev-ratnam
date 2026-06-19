"use client";

import { useState } from "react";
import Link from "next/link";

export default function BulkOrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    products: [{ name: "", category: "", quantity: "", purity: "" }],
    budget: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, field, value) => {
    setFormData((prev) => {
      const newProducts = [...prev.products];
      newProducts[index][field] = value;
      return { ...prev, products: newProducts };
    });
  };

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { name: "", category: "", quantity: "", purity: "" }],
    }));
  };

  const removeProduct = (index) => {
    setFormData((prev) => {
      const newProducts = prev.products.filter((_, i) => i !== index);
      return { ...prev, products: newProducts };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <div className="bg-white rounded-3xl p-10 border border-[#E8D8B8] text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl text-[#2D2219] mb-4">Bulk Order Request Submitted</h2>
            <p className="text-[#7A6650] font-sans mb-8">
              Thank you for your interest! Our team will review your bulk order request and get back to you within 24-48 hours with a customized quotation.
            </p>
            <Link
              href="/"
              className="btn-gold px-8 py-3 rounded-full text-sm inline-block"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-[1px] bg-[#C9A84C]" />
          <h1 className="font-serif text-3xl md:text-4xl text-[#2D2219]">Bulk Order Request</h1>
        </div>

        <p className="text-[#7A6650] font-sans mb-8 leading-7">
          Planning a large order? Fill out the form below and our team will provide you with exclusive wholesale pricing and customized solutions for your business needs.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 border border-[#E8D8B8]">
          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="font-serif text-xl text-[#2D2219] mb-6 pb-3 border-b border-[#F0E6D0]">
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Enter state"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-8">
            <h3 className="font-serif text-xl text-[#2D2219] mb-6 pb-3 border-b border-[#F0E6D0]">
              Product Details
            </h3>
            {formData.products.map((product, index) => (
              <div key={index} className="grid md:grid-cols-4 gap-4 mb-4 p-4 bg-[#FCF8F3] rounded-xl">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleProductChange(index, "name", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#E8D8B8] rounded-lg text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                    placeholder="Product name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                    Category
                  </label>
                  <select
                    value={product.category}
                    onChange={(e) => handleProductChange(index, "category", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#E8D8B8] rounded-lg text-sm font-sans text-[#2D2219] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  >
                    <option value="">Select category</option>
                    <option value="rings">Rings</option>
                    <option value="earrings">Earrings</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="bangles">Bangles</option>
                    <option value="bridal">Bridal</option>
                    <option value="chains">Chains</option>
                    <option value="pendants">Pendants</option>
                    <option value="bracelets">Bracelets</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#E8D8B8] rounded-lg text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                    placeholder="Qty"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                    Purity
                  </label>
                  <select
                    value={product.purity}
                    onChange={(e) => handleProductChange(index, "purity", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#E8D8B8] rounded-lg text-sm font-sans text-[#2D2219] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  >
                    <option value="">Select purity</option>
                    <option value="18K">18K</option>
                    <option value="22K">22K</option>
                  </select>
                </div>
                {formData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="md:col-span-4 text-red-600 text-xs font-semibold hover:underline"
                  >
                    Remove Product
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addProduct}
              className="text-[#C9A84C] text-sm font-semibold hover:text-[#2D2219] transition-colors"
            >
              + Add Another Product
            </button>
          </div>

          {/* Order Details */}
          <div className="mb-8">
            <h3 className="font-serif text-xl text-[#2D2219] mb-6 pb-3 border-b border-[#F0E6D0]">
              Order Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  Budget Range (₹)
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="e.g., 1,00,000 - 5,00,000"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  Required Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] focus:outline-none focus:border-[#C9A84C] transition-colors"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (within 1 week)</option>
                  <option value="2weeks">Within 2 weeks</option>
                  <option value="1month">Within 1 month</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Message */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
              Additional Requirements
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
              placeholder="Any specific requirements, customization needs, or questions..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-gold py-4 rounded-full text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? "Submitting..." : "Submit Bulk Order Request"}
          </button>

          <p className="text-center text-[10px] text-[#9A8870] font-sans mt-4">
            By submitting this form, you agree to be contacted by our sales team regarding your bulk order inquiry.
          </p>
        </form>
      </div>
    </main>
  );
}
