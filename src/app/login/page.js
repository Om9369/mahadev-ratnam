"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    const result = auth.login(email, password);
    if (result.success) {
      router.push("/profile");
    } else {
      setError("Invalid email or password");
    }
    setIsSubmitting(false);
  };

  return (
    <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">
      <div className="max-w-md mx-auto px-5 lg:px-10">
        <div className="bg-white rounded-3xl p-8 border border-[#E8D8B8]">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-[#2D2219] mb-2">Welcome Back</h1>
            <p className="text-[#7A6650] font-sans text-sm">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gold py-3 rounded-full text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#7A6650] font-sans">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#C9A84C] font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[#F0E6D0]">
            <p className="text-center text-[10px] text-[#9A8870] font-sans">
              For wholesale inquiries, contact us directly on WhatsApp
            </p>
            <a
              href="https://wa.me/919369895157"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-3 text-center text-[10px] text-[#C9A84C] font-sans font-semibold hover:underline"
            >
              WhatsApp: +91 93698 95157
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
