import AllCustomizedMealsTable from "@/components/Dashboard/CustomizedMeals/AllCustomizedMeals/AllCustomizedMeals";
import "../CustomizedMeals.css";

export const metadata = {
  title: "GigaDiet Meals | All Customized Meals",
  description: "",
};

export default function AllCustomizedMeals() {
  return (
    <>
      <AllCustomizedMealsTable />
    </>
  );
}
