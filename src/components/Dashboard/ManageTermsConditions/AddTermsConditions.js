"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useCreateOrUpdateTermsAndConditionsMutation,
  useGetTermsAndConditionsQuery,
} from "../../../../redux/features/queries/Terms_And_Conditions_API";
import "../ManagePrivacyPolicy/ManagePrivacyPolicy.css";
import Tiptap from "../ManagePrivacyPolicy/Tiptap";

export default function AddTermsConditions() {
  const t = useTranslations("Dashboard");
  const { locale } = useParams();
  const { data: termsAndConditionsData } = useGetTermsAndConditionsQuery({
    lang: locale,
  });
  const [createOrUpdateTermsAndConditions] =
    useCreateOrUpdateTermsAndConditionsMutation();
  const [langFormData, setLangFormData] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setLangFormData(locale);
  }, [locale]);

  useEffect(() => {
    if (termsAndConditionsData) {
      // Set content to the value from the query data if it exists
      setContent(termsAndConditionsData?.data);
    }
  }, [termsAndConditionsData]);

  // Function to handle language change
  const handleLangChange = (selectedLang) => {
    setLangFormData(selectedLang);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      lang: langFormData,
      content: content,
    };

    const { data: createdData } = await createOrUpdateTermsAndConditions(data);
    if (createdData?.status) {
      Swal.fire({
        icon: "success",
        title: createdData?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: createdData?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <>
      <div className='add_blog_title '>
        <h2>{t("ManageTramsAndCondition.pageTitle")}</h2>
      </div>

      <div className='py-3'>
        <form action='#' onSubmit={handleSubmit}>
          <div className='row g-3 pt-4'>
            {/* language preference */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='show_per_page_section mb-2'>
                <label htmlFor='lang_preference'>
                  {t("ManageTramsAndCondition.languagePreference")}
                </label>

                {/* Select for how many data per page */}
                <select
                  className='form-select'
                  aria-label='Default select example'
                  value={langFormData}
                  onChange={(e) => handleLangChange(e.target.value)}>
                  <option value='ar'>العربية</option>
                  <option value='en'>English</option>
                </select>
              </div>
            </div>

            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='mb-2 blog_title_fields'>
                <label htmlFor='blog_title'>
                  {t("ManageTramsAndCondition.description")}
                  <sup className='text-danger'>*</sup>
                </label>
                <Tiptap
                  content={content}
                  onChange={(newContent) => handleContentChange(newContent)}
                />
              </div>
            </div>

            <div className='add_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'>
              <input
                type='submit'
                className='p-2 w-25'
                value={`${
                  termsAndConditionsData
                    ? t("ManageTramsAndCondition.btnText")
                    : t("ManageTramsAndCondition.btnText2")
                }`}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
