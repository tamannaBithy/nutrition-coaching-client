"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";
import {
  useDeleteMealPreferenceMutation,
  useGetAllMealPreferencesForAdminQuery,
} from "../../../../../redux/features/queries/MEAL_PREFERENCE_API";
import EditPreferenceMeal from "./EditPreferenceMeal";
import "./PreferenceMealCards.css";

const PreferenceMealCards = () => {
  const t = useTranslations("Dashboard");

  const { locale: lang } = useParams();
  const [selectedLang, setSelectedLang] = useState(lang);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    data: preferenceData,
    isLoading,
    isError,
    refetch,
  } = useGetAllMealPreferencesForAdminQuery({
    lang: selectedLang,
  });

  const [deleteMealPreference, { isSuccess, data: preferenceResponseData }] =
    useDeleteMealPreferenceMutation();

  useEffect(() => {
    setSelectedLang(lang);
  }, []);

  //decide what to render
  let content = null;
  if (isLoading)
    content = (
      <>
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  //main content
  if (!isLoading && !isError) {
    content =
      preferenceData?.data?.length > 0 ? (
        preferenceData?.data?.map((data) => (
          <Fragment key={data?._id}>
            <div className="col-lg-6 col-md-6 col-sm-12  ">
              {/* Meal preference card container */}
              <div className="preference_meal_card my-md-3 my-sm-3 my-2 d-flex  justify-content-center align-items-center flex-column">
                {/* Image for the meal preference */}
                <div className="preference_img">
                  <Image
                    src={`http://localhost:8000${data?.preference_image}`}
                    alt="preference"
                    fill="true"
                    sizes="(min-width: 808px) 50vw, 100vw"
                  />
                </div>

                {/* Display the name of the meal preference */}
                <div className="preference_name pt-3">
                  <h6>{data?.preference}</h6>
                </div>

                {/* Dropdown menu for preference settings */}
                <div className="preference_settings dropstart">
                  <button
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <BsThreeDots />
                  </button>

                  {/* Dropdown menu items for editing and deleting */}
                  <ul className="dropdown-menu">
                    {/* Edit Button */}
                    <li>
                      <button
                        className="prefer_edit_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => handlePreferenceEdit(data)}
                      >
                        {t("ManageMealPreference.editBtnTxt")}
                      </button>
                    </li>

                    {/* Delete Button */}
                    <li>
                      <button
                        className="prefer_delete_btn"
                        onClick={() => handlePreferenceDelete(data?._id)}
                      >
                        {t("ManageMealPreference.deleteBtnTxt")}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Fragment>
        ))
      ) : (
        <div>{t("ManageMealPreference.notFound")}</div>
      );
  }

  const handleSelectedLang = (e) => {
    setSelectedLang(e.target.value);
  };

  const handlePreferenceEdit = (preferenceData) => {
    setSelectedMeal(preferenceData);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  //function for delete preference
  const handlePreferenceDelete = (preferenceId) => {
    Swal.fire({
      title: t("ManageMealPreference.alertMsg.four"),
      text: t("ManageMealPreference.alertMsg.five"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: t("ManageMealPreference.alertMsg.six"),
      cancelButtonText: t("ManageMealPreference.alertMsg.seven"),
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: t("ManageMealPreference.alertMsg.eight"),
        text: preferenceResponseData?.message[lang],
        icon: "success",
      });

      // Call your delete running weekly meal function here
      deleteMealPreference(preferenceId);
    });
  };

  // Callback function to trigger UI update
  const updateUI = () => {
    setUpdateTrigger((prevState) => !prevState);
  };

  // Function to handle successful form submission in child component
  const handleFormSubmit = () => {
    updateUI(); // Trigger UI update
    refetch(); // Refetch data to ensure it's up to date
  };

  return (
    <div className=" ">
      {/* Row containing two columns for meal preference cards */}
      <div className="row">
        <div className="col-12">
          <div className="show_per_page_section">
            <p className="m-1">Language Preference</p>
            {/* Select for how many data per page */}
            <select
              onChange={handleSelectedLang}
              className="form-select"
              aria-label="Default select example"
            >
              <option selected={selectedLang === "ar"} value="ar">
                العربية
              </option>
              <option selected={selectedLang === "en"} value="en">
                English
              </option>
            </select>
          </div>
        </div>
        {content}
        <EditPreferenceMeal
          preferenceMeal={selectedMeal}
          onFormSubmit={handleFormSubmit}
          editModalOpen={isEditModalOpen}
          editModalClose={closeEditModal}
        />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PreferenceMealCards), {
  ssr: false,
});
