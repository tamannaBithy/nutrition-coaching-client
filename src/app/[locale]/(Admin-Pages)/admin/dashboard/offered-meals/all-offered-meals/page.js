import AllOfferedMeals from "@/components/Dashboard/ManageOfferedMeals/AllOfferedMeals/AllOfferedMeals";

import "./AllOfferedMeals.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | All Offered Meals",
  description: "",
};

export default function page() {
  return (
    <>
      <AllOfferedMeals />
    </>
  );
}
