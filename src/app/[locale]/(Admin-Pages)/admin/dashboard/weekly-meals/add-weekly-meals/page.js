import AddWeeklyMealForm from "@/components/Dashboard/WeeklyMeals/AddWeeklyMealForm/AddWeeklyMealForm";
import "./AddWeeklyMeals.css";
// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Add Weekly Meals",
  description: "",
};

export default function AddWeeklyMeals() {
  return (
    <>
      <AddWeeklyMealForm />
    </>
  );
}
