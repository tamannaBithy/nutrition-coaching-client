"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useGetPrivacyPolicyQuery } from "../../../redux/features/queries/Privacy_Policy_API";
export default function PrivacyPolicy() {
  const { locale } = useParams();
  const t = useTranslations("PrivacyPolicy");
  const { data } = useGetPrivacyPolicyQuery({ lang: locale });
  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <div className='title mt-5'>
        <h2>{t("title")}</h2>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: data?.data,
        }}></div>
    </div>
  );
}
