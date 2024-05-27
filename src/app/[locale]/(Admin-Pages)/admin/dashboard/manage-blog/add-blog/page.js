import AddBlogForm from "@/components/Dashboard/ManageBlogs/AddBlogForm/AddBlogForm";
import "./addBlog.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Add Blog",
  description: "",
};

/**
 * @component AddBlog
 * @description Page for adding a new blog
 * @returns {JSX.Element} The JSX representation of the AddBlog page.
 */
export default function AddBlog() {
  return (
    <div className='container-fluid add-blog-container'>
      <AddBlogForm />
    </div>
  );
}
