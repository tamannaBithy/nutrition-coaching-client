import TermsConditionsMain from "../../../../components/TermsConditionsMain/TermsConditionsMain";
import "./termsConditions.css";

export const metadata = {
  title: "Nutrition-Coaching | Terms Conditions",
  description: "Choose your meal preferences and meal plan",
};

export default async function TermsConditions() {
  return (
    <div className='container mt-5 padding-top'>
      <TermsConditionsMain />
    </div>
  );
}
