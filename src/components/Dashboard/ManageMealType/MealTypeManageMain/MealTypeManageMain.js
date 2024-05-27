"use client";
import { useTranslations } from "next-intl";
import AddMealTypeForm from "../AddMealTypeForm/AddMealTypeForm";
import MealTypeCard from "../MealTypeCard/MealTypeCard";

export default function MealTypeManageMain() {
  const t = useTranslations("Dashboard");

  // const langData = language?.adminDashboard?.manageMealType;

  return (
    <div className='container-fluid manage-meal-type-container'>
      {/* Title section for managing meal types */}
      <div className='manage_meal_type_title'>
        {t("ManageMealType.pageTitle")}
      </div>

      <div className='row gap-2 py-3'>
        <div className='col-lg-5 col-md-12 col-sm-12'>
          <AddMealTypeForm />
        </div>

        {/* Column Divider */}
        <div className='meal_type_divider d-lg-block d-none'></div>

        <div className='col-lg-6 col-md-12 col-sm-12'>
          <MealTypeCard />
        </div>
      </div>
    </div>
  );
}
