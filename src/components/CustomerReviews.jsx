"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    date: "June 2024",
    text: "Exceptional quality and beautiful designs. The bridal set I ordered was exactly as shown in the catalogue. Highly recommend for wholesale purchases!",
    product: "Bridal Necklace Set"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    date: "May 2024",
    text: "Best gold jewellery wholesaler I've worked with. Competitive pricing, excellent craftsmanship, and timely delivery. Will definitely order again.",
    product: "Designer Rings"
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Ahmedabad",
    rating: 4,
    date: "June 2024",
    text: "Very satisfied with the quality of earrings. The purity is genuine and the designs are unique. Customer service was also very responsive.",
    product: "Jhumka Earrings"
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    date: "May 2024",
    text: "Outstanding collection of bangles. The diamond cut work is impeccable. Great value for money for retail business.",
    product: "Diamond Cut Bangles"
  },
  {
    id: 5,
    name: "Meera Reddy",
    location: "Hyderabad",
    rating: 5,
    date: "April 2024",
    text: "The temple jewellery collection is divine. Perfect for our traditional customers. Packaging was also very professional.",
    product: "Temple Necklace"
  },
  {
    id: 6,
    name: "Suresh Gupta",
    location: "Bangalore",
    rating: 4,
    date: "June 2024",
    text: "Good quality chains at competitive rates. The herringbone chains are particularly popular with our customers. Reliable supplier.",
    product: "Herringbone Chains"
  }
];

export default function CustomerReviews({ limit = null }) {
  const [selectedReview, setSelectedReview] = useState(null);
  const displayReviews = limit ? reviews.slice(0, limit) : reviews;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-[#C9A84C] text-[#C9A84C]" : "text-[#E8D8B8]"}
      />
    ));
  };

  return (
    <section className="py-16 md:py-24 px-5 lg:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Testimonials</span>
            <div className="w-12 h-[1px] bg-[#C9A84C]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2D2219]">What Our Customers Say</h2>
          <p className="mt-4 text-[#7A6650] font-sans text-sm md:text-base max-w-2xl mx-auto leading-7">
            Trusted by jewellery retailers across India. Here's what our valued partners have to say about their experience with Mahadev Ratnam.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#FCF8F3] rounded-2xl p-6 border border-[#E8D8B8] hover:border-[#C9A84C]/40 hover:shadow-xl transition-all duration-500 relative"
            >
              {/* Quote Icon */}
              <Quote className="text-[#C9A84C]/20 absolute top-4 right-4" size={32} />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {renderStars(review.rating)}
              </div>

              {/* Review Text */}
              <p className="text-[#2D2219] font-sans text-sm leading-7 mb-6 line-clamp-4">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] font-serif text-lg font-bold flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-base text-[#2D2219]">{review.name}</h4>
                  <p className="text-xs text-[#9A8870] font-sans mt-0.5">
                    {review.location} • {review.date}
                  </p>
                  {review.product && (
                    <p className="text-[10px] text-[#C9A84C] font-sans font-semibold mt-1">
                      Purchased: {review.product}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 bg-[#0F0A06] rounded-3xl p-8 md:p-12 border border-[#C9A84C]/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_#C9A84C_0%,_transparent_70%)]" />
          
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={24} className="fill-[#C9A84C] text-[#C9A84C]" />
                  ))}
                </div>
                <span className="text-4xl font-serif text-white">4.8</span>
              </div>
              <p className="text-[#E8C97A] font-sans text-sm">Based on 500+ verified reviews</p>
              <p className="text-[#8A7560] font-sans text-sm mt-2 leading-6">
                Our customers consistently rate us highly for quality, pricing, and service. Join hundreds of satisfied jewellery retailers across India.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Quality", value: 98 },
                { label: "Pricing", value: 95 },
                { label: "Delivery", value: 94 },
                { label: "Service", value: 97 },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#E8C97A] font-sans">{stat.label}</span>
                    <span className="text-sm text-white font-sans">{stat.value}%</span>
                  </div>
                  <div className="h-2 bg-[#1A1008] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C9A84C] rounded-full transition-all duration-1000"
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
