import ManageInstructorSession from "@/components/Dashboard/ManageInstructorSession/ManageInstructorSession";
import "./manageSession.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Manage Session",
  description: "",
};

/**
 * Component for managing meal preferences.
 * @component
 * @returns {JSX.Element} The rendered ManagePreference component.
 */
export default function ManageSession() {
  return (
    <>
      <ManageInstructorSession />
    </>
  );
}
