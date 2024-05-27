import MainMealAddForm from "@/components/Dashboard/ManageMainMeals/MainMealAddForm/MainMealAddForm";
import "./addMainMeal.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Add Main Meal",
  description: "",
};

/**
 * @component AddMainMeal
 * @description Page for adding a new main meal.
 * @returns {JSX.Element} The JSX representation of the AddMainMeal page.
 */
export default function AddMainMeal() {
  return (
    <>
      <MainMealAddForm />
    </>
  );
}
