import AddFAQ from "@/components/Dashboard/ManageFAQ/AddFAQ/AddFAQ";
import "../faq.css";
// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | ADD FAQ",
  description: "",
};

/**
 * Component for managing meal preferences.
 * @component
 * @returns {JSX.Element} The rendered ManagePreference component.
 */
export default function ManageAddFAQ() {
  return (
    <>
      <div className='container-fluid add-blog-container'>
        <div className='add_blog_title'>
          <h2>Add FAQ</h2>
        </div>
        <AddFAQ />
      </div>
    </>
  );
}
