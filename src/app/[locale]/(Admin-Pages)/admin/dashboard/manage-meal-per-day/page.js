import ManageMealPerDayMain from "@/components/Dashboard/ManageMealsNumberPerDay/ManageMealPerDayMain/ManageMealPerDayMain";
import "./manageMealPerWeek.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Manage Meals Per Day",
  description: "",
};

/**
 * Component for managing the number of meals per Day.
 * @component
 * @returns {JSX.Element} The rendered manageMealPerDay component.
 */
export default function manageMealPerDay() {
  return (
    // Container for the entire manageMealPerDay component
    <>
      <ManageMealPerDayMain />
    </>
  );
}
