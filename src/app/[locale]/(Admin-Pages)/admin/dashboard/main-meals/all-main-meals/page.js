import AllMainMealsMain from "@/components/Dashboard/ManageMainMeals/AllMainMeals/AllMainMealsMain";
import "./allMainMeal.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | All Main Meals",
  description: "",
};

export default function page() {
  return (
    <div>
      <AllMainMealsMain />
    </div>
  );
}
