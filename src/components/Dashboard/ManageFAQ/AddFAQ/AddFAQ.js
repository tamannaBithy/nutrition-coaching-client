"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { useCreateFAQMutation } from "../../../../../redux/features/queries/FAQ_API";
import Tiptap from "../../ManagePrivacyPolicy/Tiptap";

export default function AddFAQ() {
  const t = useTranslations("Dashboard");
  const [createFAQ, { isSuccess }] = useCreateFAQMutation();

  const { locale } = useParams();
  const [langFormData, setLangFormData] = useState(locale);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // Function to handle language change
  const handleLangChange = (selectedLang) => {
    setLangFormData(selectedLang);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
  };
  // Async function to handle the form submission
  async function handleAddFAQFormSubmit(e) {
    e.preventDefault();
    const formData = {
      lang: langFormData,
      title: title,
      description: content,
    };
    const { data } = await createFAQ(formData);

    if (data?.status) {
      Swal.fire({
        icon: "success",
        title: data?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
      resetForm();
    } else {
      Swal.fire({
        icon: "error",
        title: data?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }
  return (
    <div className=' py-3'>
      <form action='#' onSubmit={handleAddFAQFormSubmit}>
        <div className='row g-3 pt-4'>
          {/* language preference */}
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='show_per_page_section mb-2'>
              <label htmlFor='lang_preference'>
                {" "}
                {t("ManageFAQ.languagePreference")}
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

          {/* blog title field */}
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='mb-2 blog_title_fields'>
              <label htmlFor='title'>
                {t("ManageFAQ.title")}
                <sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                name='title'
                id='title'
                className='rounded form-control'
                required
                value={title}
                onChange={handleTitleChange}
                placeholder={t("ManageFAQ.placeHolder")}
              />
            </div>
          </div>

          {/* blog description field */}
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='mb-2 blog_description_field'>
              <label htmlFor='blog_description'>
                {t("ManageFAQ.description")}
                <sup className='text-danger'>*</sup>
              </label>

              <div>
                <Tiptap
                  content={content}
                  onChange={(newContent) => handleContentChange(newContent)}
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className=' add_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'>
            <input
              type='submit'
              className='p-2 w-25'
              value={t("ManageFAQ.btnText")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
