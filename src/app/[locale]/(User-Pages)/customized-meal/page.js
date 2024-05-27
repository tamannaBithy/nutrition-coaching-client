import CustomizedMeal from "@/components/customized-meal/CustomizedMeal";
import "./CustomizedMeal.css";

export const metadata = {
  title: "GigaDiet Meals | Customized Meals",
  description: "Make a request for customized meals",
};

export default function CustomizedMeals() {
  return (
    <div className="container padding-top ">
      <CustomizedMeal />
    </div>
  );
}
