"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  useDeleteFAQMutation,
  useGetAllFAQsQuery,
} from "../../../../../redux/features/queries/FAQ_API";
import UpdateFAQModal from "./UpdateFAQ";
function AllFAQ() {
  const t = useTranslations("Dashboard");
  const [deleteFAQ] = useDeleteFAQMutation();
  const { locale } = useParams();
  const { data, refetch } = useGetAllFAQsQuery({ lang: locale });
  const [selectedFAQ, setSelectedFAQ] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);

  // Callback function to trigger UI update
  const updateUI = () => {
    setUpdateTrigger((prevState) => !prevState);
  };

  // Function to handle successful form submission in child component
  const handleFormSubmit = () => {
    updateUI(); // Trigger UI update
    refetch(); // Refetch data to ensure it's up to date
  };

  //Function for edit blog
  const handleEditFAQ = (faq) => {
    setSelectedFAQ(faq);
  };
  // Delete coach handler
  const handleDeleteFAQ = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! But you can re-add it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      // Call your delete main meal function here
      const { data } = await deleteFAQ(id);
      if (data?.status) {
        Swal.fire({
          title: "Removed!",
          text: data?.message[locale],
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Ops! Error delete coach",
          text: data?.message[locale],
          icon: "error",
        });
      }
    });
  };
  return (
    <div className='pt-4'>
      <div className='add_blog_title'>
        <h2>{t("ManageFAQ.pageTitle2")}</h2>
      </div>
      <div className='d-flex flex-wrap flex-column flex-sm-row row-gap-2 row-gap-md-0 align-content-center justify-content-between mb-4'>
        <div className='show_per_page_section'>
          <p className='m-1'>{t("ManageFAQ.languagePreference")}</p>
          {/* Select for how many data per page */}
          <select className='form-select' aria-label='Default select example'>
            <option value='ar'>العربية</option>
            <option value='en'>English</option>
          </select>
        </div>
      </div>

      {/* table */}
      <div className='table-responsive'>
        <table className='table table-hover table-bordered'>
          {/* table head data */}
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>{t("ManageFAQ.tableHead.labelOne")}</th>
              <th scope='col'>{t("ManageFAQ.tableHead.labelTwo")}</th>
              <th scope='col'>{t("ManageFAQ.tableHead.labelThree")}</th>
            </tr>
          </thead>

          <>
            {data?.data?.length > 0 ? (
              <tbody>
                {data?.data?.map((faq, i) => (
                  <tr key={i}>
                    <th scope='row' style={{ width: "80px" }}>
                      {i + 1}
                    </th>

                    <th scope='row' style={{ width: "200px" }}>
                      {faq?.title}
                    </th>
                    <td scope='row' style={{ width: "350px" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: faq?.description?.slice(0, 100),
                        }}></div>
                    </td>
                    <td style={{ width: "120px" }}>
                      <div className='d-flex gap-1 align-items-center'>
                        <div>
                          <button
                            data-toggle='tooltip'
                            type='button'
                            data-placement='left'
                            title='Edit'
                            className='edit_btn'
                            data-bs-toggle='modal'
                            data-bs-target='#staticBackdrop12'
                            onClick={() => handleEditFAQ(faq)}>
                            <FiEdit style={{ color: "#fff" }} />
                          </button>
                        </div>

                        <div>
                          <button
                            type='button'
                            data-toggle='tooltip'
                            data-placement='right'
                            title='Delete'
                            className='delete_btn'
                            onClick={() => handleDeleteFAQ(faq?._id)}>
                            <RiDeleteBin6Line style={{ color: "#fff" }} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                <UpdateFAQModal
                  faqData={selectedFAQ}
                  onFormSubmit={handleFormSubmit}
                />
              </tbody>
            ) : (
              <div
                className={`text-center  my-5 ${
                  locale === "ar" ? "notFound_meals_arabic " : "notFound_meals"
                }`}>
                <h4 className='text-dark '>{t("ManageFAQ.notFound")}</h4>
              </div>
            )}
          </>
        </table>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(AllFAQ), {
  ssr: false,
});
