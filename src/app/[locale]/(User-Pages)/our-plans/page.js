import PlanSelection from "@/components/Form/PlanSelection/PlanSelection";
import "./plans.css";

export const metadata = {
  title: "Nutrition-Coaching | Our-Plans",
  description: "Choose your meal preferences and meal plan",
};

export default async function OurPlans() {
  return (
    <div className='container mt-5 padding-top'>
      <PlanSelection />
    </div>
  );
}
