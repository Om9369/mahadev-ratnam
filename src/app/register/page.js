"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        setError("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setIsSubmitting(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsSubmitting(false);
        return;
      }

      const result = auth.register(formData);
      if (result.success) {
        router.push("/profile");
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">
      <div className="max-w-md mx-auto px-5 lg:px-10">
        <div className="bg-white rounded-3xl p-8 border border-[#E8D8B8]">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-[#2D2219] mb-2">Create Account</h1>
            <p className="text-[#7A6650] font-sans text-sm">Register for wholesale pricing</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Enter your phone number"
                required
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
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Enter company name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="City"
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
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="State"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gold py-3 rounded-full text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#7A6650] font-sans">
              Already have an account?{" "}
              <Link href="/login" className="text-[#C9A84C] font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
