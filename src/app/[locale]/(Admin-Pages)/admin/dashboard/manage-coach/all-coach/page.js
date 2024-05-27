import CoachesList from "@/components/Dashboard/ManageCoaches/CoachesList/CoachesList";
import "./allCoach.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | All Coach",
  description: "",
};

/**
 * @component AllCoach
 * @description Page for all coaches
 * @returns {JSX.Element} The JSX representation of the AllCoach page.
 */
export default function AllCoach() {
  return (
    <div className='container-fluid all-coach-container'>
      <CoachesList />
    </div>
  );
}
