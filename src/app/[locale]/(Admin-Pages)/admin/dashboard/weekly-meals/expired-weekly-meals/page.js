import ExpiredWeeklyMealsMain from "@/components/Dashboard/WeeklyMeals/ExpiredWeeklyMeals/ExpiredWeeklyMealsMain";

import "./../weekly-meals.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Expired Weekly Meal",
  description: "",
};

export default function ExpiredWeeklyMeal() {
  return (
    <div>
      <ExpiredWeeklyMealsMain />
    </div>
  );
}
