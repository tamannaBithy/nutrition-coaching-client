import AddCustomizedMealsForm from "@/components/Dashboard/CustomizedMeals/AddCustomizedMeals/AddCustomizedMeals";
import "../CustomizedMeals.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Add Customized Meal",
  description: "",
};

export default function AddCustomizedMeals() {
  return (
    <>
      <AddCustomizedMealsForm />
    </>
  );
}
