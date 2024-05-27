import AllBlogs from "@/components/Dashboard/ManageBlogs/AllBlogs/AllBlogs";
import "./listOfBlog.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | List Of Blogs",
  description: "",
};

/**
 * @component list of all blogs
 * @description Page for List of all blogs
 * @returns {JSX.Element} The JSX representation of the ListOfBlogs page.
 */

export default function ListOfBlogs() {
  return (
    <div className='container-fluid list-all-blogs-container'>
      {/* main content */}
      <AllBlogs />
    </div>
  );
}
