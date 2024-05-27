import { useTranslations } from "next-intl";
import AllMainMealsTable from "./AllMainMealsTable";

export default function AllMainMealsMain() {
  const t = useTranslations("Dashboard");

  return (
    <div className='container-fluid runningWeeklyMeals_container'>
      {/* Manage all users title  */}
      <div className='runningWeeklyMeals_title'>
        <h2>{t("ManageMainMeals.AllMainMeals.pageTitle")}</h2>
      </div>

      {/* main content */}
      <div className='py-3'>
        <AllMainMealsTable />
      </div>
    </div>
  );
}
