import { useTranslations } from "next-intl";
import AllOfferedMealsTable from "./AllOfferedMealsTable";

export default function AllOfferedMeals() {
  const t = useTranslations("Dashboard");

  return (
    <div className='container-fluid manage-offered-meal-container'>
      {/* Manage all users title  */}
      <div className='offeredMeal_title'>
        <h2>{t("ManageOfferedMeals.AllOfferedMeals.pageTitle")}</h2>
      </div>

      {/* main content */}
      <div className='py-3'>
        <AllOfferedMealsTable />
      </div>
    </div>
  );
}
