import BlogsMain from "@/components/blogs/BlogsMain/BlogsMain";

// Export Meta Data
export const metadata = {
  title: "GigaDiet Meals | Blogs",
  description: "Discover the GigaDiet Meals Blog",
};

/**
 * Blogs page component.
 * @component
 * @returns {JSX.Element} The rendered Blogs component.
 */
export default function Blogs() {
  return (
    <div className='padding-top'>
      <BlogsMain />
    </div>
  );
}
