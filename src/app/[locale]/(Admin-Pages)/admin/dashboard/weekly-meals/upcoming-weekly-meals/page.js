import UpcomingWeeklyMealsMain from "@/components/Dashboard/WeeklyMeals/UpcomingWeeklyMeals/UpcomingWeeklyMealsMain";
import "../weekly-meals.css";
// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Upcoming Weekly Meal",
  description: "",
};

export default function UpcomingWeeklyMeals() {
  return (
    <>
      <UpcomingWeeklyMealsMain />
    </>
  );
}
