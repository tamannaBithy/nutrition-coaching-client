"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useGetTermsAndConditionsQuery } from "../../../redux/features/queries/Terms_And_Conditions_API";
export default function TermsConditionsMain() {
  const t = useTranslations("TramsAndCondition");
  const { locale } = useParams();
  const { data } = useGetTermsAndConditionsQuery({ lang: locale });
  return (
    <div className='page_container_user'>
      <div className='title text-center'>
        <h2>{t("title")}</h2>
      </div>

      {/* Content area */}
      <div className='content-area mt-5'>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.data,
          }}></div>
      </div>
    </div>
  );
}
