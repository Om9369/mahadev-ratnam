"use client";

import { createContext, useContext, useState, useEffect } from "react";

const GoldPriceContext = createContext();

export function GoldPriceProvider({ children }) {
  // Initialize with default values from localStorage or defaults
  const getInitialRate = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("goldRate");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.rate;
        } catch (e) {
          return 6500;
        }
      }
    }
    return 6500;
  };

  const getInitialLastUpdated = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("goldRate");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return new Date(parsed.lastUpdated);
        } catch (e) {
          return new Date();
        }
      }
    }
    return new Date();
  };

  const [goldRate, setGoldRate] = useState(getInitialRate());
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(getInitialLastUpdated());

  // Fetch gold price from our own server-side API route (avoids CORS issues)
  const fetchGoldPrice = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/gold-price');
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();

      const goldPricePerGram = data.pricePerGram; // INR per gram from server
      setGoldRate(goldPricePerGram);
      setLastUpdated(new Date());
      localStorage.setItem("goldRate", JSON.stringify({
        rate: goldPricePerGram,
        lastUpdated: new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error fetching gold price:", error);
      // Keep the current rate (loaded from localStorage or default) on error
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch fresh data on mount and set up interval
  useEffect(() => {
    fetchGoldPrice();
    const interval = setInterval(fetchGoldPrice, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate prices based on purity
  const calculatePrice = (weightInGrams, purity = "22K") => {
    if (!goldRate) return 0;
    
    // Purity percentages
    const purityMap = {
      "24K": 1.0,
      "22K": 0.916,
      "18K": 0.75,
      "14K": 0.585,
    };
    
    const purityFactor = purityMap[purity] || 0.916;
    const makingChargesPercent = 0.15; // 15% making charges
    
    const goldPrice = goldRate * weightInGrams * purityFactor;
    const makingCharges = goldPrice * makingChargesPercent;
    const totalPrice = goldPrice + makingCharges;
    
    return Math.round(totalPrice);
  };

  // Calculate product price based on weight string (e.g., "3.5 gm approx")
  const calculateProductPrice = (weightString, purity = "22K") => {
    if (!goldRate || !weightString) return 0;
    
    // Extract weight from string (e.g., "3.5 gm approx" -> 3.5)
    const weightMatch = weightString.match(/(\d+\.?\d*)/);
    if (!weightMatch) return 0;
    
    const weightInGrams = parseFloat(weightMatch[1]);
    return calculatePrice(weightInGrams, purity);
  };

  // Get price per gram for different purities
  const getPricePerGram = (purity = "22K") => {
    if (!goldRate) return 0;
    
    const purityMap = {
      "24K": 1.0,
      "22K": 0.916,
      "18K": 0.75,
      "14K": 0.585,
    };
    
    const purityFactor = purityMap[purity] || 0.916;
    const makingChargesPercent = 0.15;
    
    const goldPrice = goldRate * purityFactor;
    const makingCharges = goldPrice * makingChargesPercent;
    const totalPrice = goldPrice + makingCharges;
    
    return Math.round(totalPrice);
  };

  return (
    <GoldPriceContext.Provider
      value={{
        goldRate,
        isLoading,
        lastUpdated,
        calculatePrice,
        calculateProductPrice,
        getPricePerGram,
        fetchGoldPrice,
      }}
    >
      {children}
    </GoldPriceContext.Provider>
  );
}

export function useGoldPrice() {
  const context = useContext(GoldPriceContext);
  if (!context) {
    throw new Error("useGoldPrice must be used within a GoldPriceProvider");
  }
  return context;
}
