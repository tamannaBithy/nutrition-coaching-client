import AddCoachForm from "@/components/Dashboard/ManageCoaches/AddCoachForm/AddCoachForm";
import "./addCoach.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Add Coach",
  description: "",
};

/**
 * @component AddCoach
 * @description Page for adding a new coach
 * @returns {JSX.Element} The JSX representation of the AddCoach page.
 */
export default function AddCoach() {
  return (
    <div className='container-fluid add-coach-container'>
      <AddCoachForm />
    </div>
  );
}
