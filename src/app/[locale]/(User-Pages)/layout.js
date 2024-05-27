import Footer from "@/components/shared/userComponents/Footer/Footer";
import Navbar from "@/components/shared/userComponents/Navbar/Navbar";

export const metadata = {
  title: "Giga Diet Meals - Home Page",
  description: "Giga Diet Meals - Eat like a champion",
};

export default function Layout({ children, params }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
