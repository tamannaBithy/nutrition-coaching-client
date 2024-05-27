import { useTranslations } from "next-intl";
import ExpiredWeeklyMealsTable from "./ExpiredWeeklyMealsTable";

export default function ExpiredWeeklyMealsMain() {
  const t = useTranslations("Dashboard");

  return (
    <div className='container-fluid runningWeeklyMeals_container'>
      {/* Manage all users title  */}
      <div className='runningWeeklyMeals_title'>
        <h2>{t("ManageWeeklyMeals.ExpiredWeeklyMeals.pageTitle")}</h2>
      </div>

      {/* main content */}
      <div className='py-3'>
        <ExpiredWeeklyMealsTable />
      </div>
    </div>
  );
}
