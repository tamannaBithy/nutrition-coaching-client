import BlogsCard from "../BlogsCard/BlogsCard";
import BlogsHero from "../BlogsHero/BlogsHero";

export default function BlogsMain() {
  return (
    <>
      {/* Display the hero section of the blogs page */}
      <BlogsHero />

      {/* Display the main content component for the blogs page */}
      <BlogsCard />
    </>
  );
}
