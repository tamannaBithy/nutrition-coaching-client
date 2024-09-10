import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

// Import Poppins and Roboto fonts with various weights and styles
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  manifest: "/manifest.json",
  title: "GigaDiet Meals",
  description: "Giga Diet Meals, eat like a champion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${poppins.className} ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
