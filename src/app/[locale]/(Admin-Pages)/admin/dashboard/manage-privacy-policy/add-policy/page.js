import AddPrivacyPolicy from "@/components/Dashboard/ManagePrivacyPolicy/AddPrivacyPolicy";
import "./add-policy.css";
// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Add Privacy Policy",
  description: "",
};

/**
 * Component for managing meal preferences.
 * @component
 * @returns {JSX.Element} The rendered ManagePreference component.
 */
export default function ManageAddPrivacyPolicy() {
  return (
    <>
      {" "}
      <div className='container-fluid add-blog-container'>
        <AddPrivacyPolicy />
      </div>
    </>
  );
}
