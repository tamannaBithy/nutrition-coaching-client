import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

// The font family for testing purpose
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins--",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto--",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  manifest: "/manifest.json",
  title: "GigaDiet Meals",
  description: "Giga Diet Meals, eat like a champion",
};

export default function RootLayout({ children }) {
  return children;
}
