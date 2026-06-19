import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import { CombinedProvider } from "@/contexts/CombinedProvider";

const CartDrawer = dynamic(() => import("@/components/CartDrawer"), {
  loading: () => null,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Mahadev Ratnam | Gold Jewellery Wholesaler",
  description:
    "Premium Gold Jewellery Wholesaler. Bridal collections, rings, earrings, necklaces and wholesale jewellery solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans relative min-h-screen bg-[#FCF8F3] text-[#2D2219]`}>
        <CombinedProvider>
          <Navbar />
          {children}
          <CartDrawer />
        </CombinedProvider>
      </body>
    </html>
  );
}