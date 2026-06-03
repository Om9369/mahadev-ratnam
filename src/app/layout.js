import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Mahadev Ratnam | Gold Jewellery Wholesaler",
  description:
    "Premium Gold Jewellery Wholesaler. Bridal collections, rings, earrings, necklaces and wholesale jewellery solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.className} relative min-h-screen bg-[#F6F1E8]`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}