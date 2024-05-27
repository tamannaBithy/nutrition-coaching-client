import { useTranslations } from "next-intl";
import AddMealsNumberForm from "../AddMealsNumberForm/AddMealsNumberForm";
import ManageMealsNumber from "../ManageMealsNumber/ManageMealsNumber";

export default function ManageMealPerDayMain() {
  const t = useTranslations("Dashboard");

  // const langData = language?.adminDashboard?.manageMealsPerWeek;
  return (
    <div className='container-fluid manage-meal-number-week-container'>
      {/* Title section for managing the number of meals per week */}
      <div className='manage_number_of_week_title'>
        <h2>{t("ManageMealsPerDay.pageTitle")}</h2>
      </div>

      {/* Row containing two columns for AddMealsNumberForm and ManageMealsNumber */}
      <div className='row gap-2 py-3'>
        {/* Column for AddMealsNumberForm */}
        <div className='col-lg-5 col-md-12 col-sm-12'>
          <AddMealsNumberForm />
        </div>

        {/* Column Divider (visible only for large screens) */}
        <div className='meal_number_divider d-lg-block d-none'></div>

        {/* Column for ManageMealsNumber */}
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <ManageMealsNumber />
        </div>
      </div>
    </div>
  );
}
