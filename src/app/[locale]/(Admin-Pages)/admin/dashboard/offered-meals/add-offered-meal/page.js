import ManageOfferedMealMain from "@/components/Dashboard/ManageOfferedMeals/ManageOfferedMealMain/ManageOfferedMealMain";
import "./addOfferedMeal.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Add Offered Meal",
  description: "",
};

/**
 * @component AddOfferedMeal
 * @description Page for adding a new offered mea;
 * @returns {JSX.Element} The JSX representation of the AddOfferedMeal page.
 */
export default function AddOfferedMeal() {
  return (
    <>
      <ManageOfferedMealMain />
    </>
  );
}
