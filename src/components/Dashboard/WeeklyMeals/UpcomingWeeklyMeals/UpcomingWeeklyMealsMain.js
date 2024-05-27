import { useTranslations } from "next-intl";
import UpcomingWeeklyMealsTable from "./UpcomingWeeklyMealsTable";

export default function UpcomingWeeklyMealsMain() {
  const t = useTranslations("Dashboard");

  return (
    <div className='container-fluid runningWeeklyMeals_container'>
      {/* Manage all users title  */}
      <div className='runningWeeklyMeals_title'>
        <h2>{t("ManageWeeklyMeals.UpcomingWeeklyMeals.pageTitle")}</h2>
      </div>

      {/* main content */}
      <div className='py-3'>
        <UpcomingWeeklyMealsTable />
      </div>
    </div>
  );
}
