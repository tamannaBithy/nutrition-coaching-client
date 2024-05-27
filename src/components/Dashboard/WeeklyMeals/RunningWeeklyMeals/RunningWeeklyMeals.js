import { useTranslations } from "next-intl";
import RunningWeeklyMealsTable from "./RunningWeeklyMealsTable";

export default function RunningWeeklyMeals() {
  const t = useTranslations("Dashboard");

  // const runningMealsLangData =
  //   language?.adminDashboard?.manageWeeklyMeals.runningWeeklyMeals;

  return (
    <div className='container-fluid runningWeeklyMeals_container'>
      {/* Manage all users title  */}
      <div className='runningWeeklyMeals_title'>
        <h2>{t("ManageWeeklyMeals.RunningWeeklyMeals.pageTitle")}</h2>
      </div>

      {/* main content */}
      <div className='py-3'>
        <RunningWeeklyMealsTable />
      </div>
    </div>
  );
}
