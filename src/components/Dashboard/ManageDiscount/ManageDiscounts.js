"use client";

import { useTranslations } from "next-intl";
import MainMenuDiscountForm from "./MainMenuDiscountForm/MainMenuDiscountForm";
import ViewDiscountCard from "./ViewDiscountCard/ViewDiscountCard";

export default function ManageDiscounts() {
  const t = useTranslations("Dashboard");

  return (
    <>
      {/* Title section for managing discounts */}
      <div className='manage_discount_title text-center mb-4'>
        <h2>{t("ManageDiscounts.title")}</h2>
      </div>

      {/* Row containing two columns for AddDiscountForm and ViewDiscountCard */}
      <div className='row gap-2 py-3'>
        {/* Discount Tabs content */}
        <div className='col-lg-5 col-md-12 col-sm-12'>
          <MainMenuDiscountForm />
        </div>

        {/* Column Divider (visible only for large screens) */}
        <div className='discount_divider d-lg-block d-none'></div>

        {/* Column for ViewDiscountCard */}
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <ViewDiscountCard />
        </div>
      </div>
    </>
  );
}
