import { NextResponse } from "next/server";

// Fallback gold price in INR per gram (22K)
const FALLBACK_GOLD_PRICE_INR_PER_GRAM = 6500;

export async function GET() {
  try {
    // Try GoldAPI.io (free tier, reliable)
    const response = await fetch(
      "https://www.goldapi.io/api/XAU/INR",
      {
        headers: {
          "x-access-token": "goldapi-demo", // public demo key
          "Content-Type": "application/json",
        },
        next: { revalidate: 600 }, // cache for 10 minutes
      }
    );

    if (response.ok) {
      const data = await response.json();
      // price is in INR per troy ounce; 1 troy oz = 31.1035 grams
      const pricePerGram = data.price / 31.1035;
      return NextResponse.json({
        pricePerGram: Math.round(pricePerGram),
        source: "goldapi",
        timestamp: new Date().toISOString(),
      });
    }

    throw new Error("GoldAPI failed");
  } catch (primaryError) {
    // Fallback: use metals-api
    try {
      const res = await fetch(
        "https://api.metals.live/v1/spot/gold",
        { next: { revalidate: 600 } }
      );

      if (res.ok) {
        const data = await res.json();
        const usdToInr = 83.5;
        // metals.live returns price per troy oz in USD
        const pricePerOzUSD = Array.isArray(data)
          ? data[0]?.gold
          : data?.price;
        if (pricePerOzUSD) {
          const pricePerGram = (pricePerOzUSD * usdToInr) / 31.1035;
          return NextResponse.json({
            pricePerGram: Math.round(pricePerGram),
            source: "metals.live",
            timestamp: new Date().toISOString(),
          });
        }
      }
    } catch (secondaryError) {
      console.error("Both gold APIs failed:", secondaryError);
    }

    // Last resort: return a sensible fallback
    return NextResponse.json({
      pricePerGram: FALLBACK_GOLD_PRICE_INR_PER_GRAM,
      source: "fallback",
      timestamp: new Date().toISOString(),
    });
  }
}
