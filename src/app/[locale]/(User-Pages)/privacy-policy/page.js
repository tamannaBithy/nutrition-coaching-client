import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";
import "./PrivacyPolicy.css";

export const metadata = {
  title: "GigaDiet | Privacy Policy",
  description: "Choose your meal preferences and meal plan",
};

export default async function PrivacyPolicyMain() {
  return (
    <div className='container mt-5 faq_section padding-top'>
      <PrivacyPolicy />
    </div>
  );
}
