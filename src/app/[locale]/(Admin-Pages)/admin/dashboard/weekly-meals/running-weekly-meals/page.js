import RunningWeeklyMeals from "@/components/Dashboard/WeeklyMeals/RunningWeeklyMeals/RunningWeeklyMeals";

import "../weekly-meals.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Running Weekly Meal",
  description: "",
};

export default function RunningWeeklyMealsPage() {
  return (
    <>
      <RunningWeeklyMeals />
    </>
  );
}
