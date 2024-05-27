import BlogComponent from "@/components/blogs/BlogComponent/BlogComponent";

// Export Meta Data
export const metadata = {
  title: "GigaDiet Meals | Blog",
  description: "",
};

/**
 * Blog details page component.
 * @component
 * @param {object} params - The parameters passed to the component.
 * @returns {JSX.Element} The rendered BlogDetails component.
 */
export default function BlogDetails({ params }) {
  return (
    <>
      {/* Display the main content component for the blog details */}
      <BlogComponent id={params.id} />
    </>
  );
}
