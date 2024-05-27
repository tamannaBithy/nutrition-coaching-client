"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUpdateFAQMutation } from "../../../../../redux/features/queries/FAQ_API";
import Tiptap from "../../ManagePrivacyPolicy/Tiptap";
import "./UpdateFAQ.css";

export default function UpdateFAQModal({ faqData, onFormSubmit }) {
  const t = useTranslations("Dashboard");
  const [updateFAQ] = useUpdateFAQMutation();
  const { locale } = useParams();

  // state to manage the updated blog title, description & tag selection
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // set the blog data in default value
  useEffect(() => {
    setContent(faqData?.description);
    setTitle(faqData?.title);
  }, [faqData]);

  // Function to handle changes in the blog title input field
  const handleUpdatedTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Function to handle changes in the Tiptap editor content
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  // Async function to handle the form submission
  async function handleUpdatedFAQFormSubmit(e) {
    e.preventDefault();

    const formData = {
      lang: faqData?.lang,
      title: title,
      description: content,
    };

    const { data } = await updateFAQ({
      id: faqData?._id,
      data: formData,
    });

    if (data?.status) {
      onFormSubmit();
      Swal.fire({
        icon: "success",
        title: data?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
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
    <div
      className='modal editBlogModal h-100 fade'
      id='staticBackdrop12'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'>
      <div className='modal-dialog d-flex align-items-center bg-transparent'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div className='modal-title' id='staticBackdropLabel'>
              <div className='edit_coach_title '>
                <h2>{t("ManageFAQ.pageTitle3")}</h2>
              </div>
            </div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <div className='py-3'>
              <form action='#' onSubmit={handleUpdatedFAQFormSubmit}>
                <div className='row g-3 pt-4'>
                  {/* title field */}
                  <div className='col-lg-12 col-md-12 col-sm-12'>
                    <div className='mb-2 update_blog_title_fields'>
                      <label htmlFor='update_blog_title'>
                        {" "}
                        {t("ManageFAQ.title")}
                      </label>
                      <input
                        type='text'
                        name='updatedBlogTitle'
                        id='update_blog_title'
                        className='rounded form-control'
                        required
                        value={title}
                        onChange={handleUpdatedTitleChange}
                        placeholder={t("ManageFAQ.placeHolder")}
                      />
                    </div>
                  </div>

                  {/* blog description field */}
                  <div className='col-lg-12 col-md-12 col-sm-12'>
                    <div className='mb-2 update_blog_description_field'>
                      <label htmlFor='update_blog_description'>
                        {t("ManageFAQ.description")}
                      </label>

                      <div>
                        <div>
                          <Tiptap
                            content={content}
                            onChange={(newContent) =>
                              handleContentChange(newContent)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className='col-12 update_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'>
                    <input
                      type='submit'
                      className='p-2 w-25'
                      value={t("ManageFAQ.btnText2")}
                      data-bs-dismiss='modal'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
