import NutritionCoachingMain from "@/components/nutrition-coaching/NutritionCoachingMain/NutritionCoachingMain";
import "./nutritionCoaching.css";

export const metadata = {
  title: "GigaDiet Meals | Nutrition-Coaching",
  description: "",
};

export default function NutritionCoaching() {
  return (
    <div className='padding-top'>
      <NutritionCoachingMain />
    </div>
  );
}
