import AllFAQ from "@/components/Dashboard/ManageFAQ/AllFAQ/AllFAQ";
import "../faq.css";
// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | ALL FAQ",
  description: "",
};

/**
 * Component for managing meal preferences.
 * @component
 * @returns {JSX.Element} The rendered ManagePreference component.
 */
export default function ManageAllFAQ() {
  return (
    <div className='container-fluid add-blog-container'>
      <AllFAQ />
    </div>
  );
}
