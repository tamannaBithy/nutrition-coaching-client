import ManagePreferenceMain from "@/components/Dashboard/ManageMealPreference/ManagePreferenceMain/ManagePreferenceMain";
import "./managePreference.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Manage Preference",
  description: "",
};

/**
 * Component for managing meal preferences.
 * @component
 * @returns {JSX.Element} The rendered ManagePreference component.
 */
export default function ManagePreference() {
  return (
    <>
      <ManagePreferenceMain />
    </>
  );
}
