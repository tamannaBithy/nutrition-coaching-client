import UpdateBlogForm from "@/components/Dashboard/ManageBlogs/UpdateBlogForm/UpdateBlogForm";
import "./updateBlog.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Update Blog",
  description: "",
};

/**
 * @component UpdateBlog
 * @description Page for update a  blog
 * @returns {JSX.Element} The JSX representation of the UpdateBlog page.
 */
export default function UpdateBlog({ params }) {
  return (
    <div className='container-fluid update-blog-container'>
      {/* update blog title */}
      <div className='update_blog_title'>
        <h2>Update Blog</h2>
      </div>

      {/* main content */}
      <div className='py-3'>
        <UpdateBlogForm id={params.id} />
      </div>
    </div>
  );
}
