import AddTermsConditions from "@/components/Dashboard/ManageTermsConditions/AddTermsConditions";
import "./TermsConditions.css";
// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Add Terms Conditions",
  description: "",
};

/**
 * Component for managing meal preferences.
 * @component
 * @returns {JSX.Element} The rendered ManagePreference component.
 */
export default function ManageAddTermsConditions() {
  return (
    <>
      <div className='container-fluid add-blog-container'>
        <AddTermsConditions />
      </div>
    </>
  );
}
