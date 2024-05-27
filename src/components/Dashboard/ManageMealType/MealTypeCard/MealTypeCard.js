"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";
import {
  useDeleteMealTypeMutation,
  useGetAllMealTypesQuery,
} from "../../../../../redux/features/queries/MEAL_TYPES_API";
import EditMealTypeModal from "./EditMealTypeModal";
import "./MealTypeCard.css";

/**
 * Component for displaying meal type cards.
 * @component
 * @returns {JSX.Element} The rendered MealTypeCard component.
 */
const MealTypeCard = ({ langData, lang }) => {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();

  const [defaultLang, setDefaultLang] = useState(locale);

  // Fetch meal types from the API
  const {
    data: typeOfMeals,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllMealTypesQuery({ lang: defaultLang });

  const [
    deleteMealType,
    { isSuccess: deleteIsSuccess, data: deleteMealTypeData },
  ] = useDeleteMealTypeMutation();

  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState(null);

  const handleSelectedLang = (e) => {
    setDefaultLang(e.target.value);
  };

  //decide what we render
  let content = null;

  if (isLoading)
    content = (
      <>
        <div className='vh-100 d-flex align-items-center justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </>
    );

  // main content
  if (!isLoading && isSuccess) {
    content = (
      <>
        <select
          onChange={handleSelectedLang}
          className='form-select'
          aria-label='Default select example'>
          <option selected={defaultLang === "ar"} value='ar'>
            العربية
          </option>
          <option selected={defaultLang === "en"} value='en'>
            English
          </option>
        </select>
        {typeOfMeals?.data?.map((typeOfMeal, i) => (
          <div key={i} className='col-lg-6 col-md-6 col-sm-12  '>
            {/* Meal type card container */}
            <div className='type_meal_card my-md-3 my-sm-3 my-2 d-flex  justify-content-center align-items-center flex-column'>
              {/* Display the name of the meal type */}
              <div className='meal_type_name'>
                <h6>{typeOfMeal?.type_of_meal}</h6>
              </div>

              {/* Dropdown menu for meal type settings */}
              <div className='meal_type_settings dropstart'>
                <button
                  className='dropdown-toggle'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  <BsThreeDots />
                </button>

                {/* Dropdown menu items for editing and deleting */}
                <ul className='dropdown-menu'>
                  <li>
                    <button
                      className='type_meal_edit_btn'
                      data-bs-toggle='modal'
                      data-bs-target='#staticBackdrop'
                      onClick={() => handleTypeOfMealEdit(typeOfMeal)}>
                      {t("ManageMealType.editBtnTxt")}
                    </button>
                  </li>

                  <li>
                    <button
                      className='type_meal_delete_btn'
                      onClick={() => handleTypeOfMealDelete(typeOfMeal?._id)}>
                      {t("ManageMealType.deleteBtnTxt")}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  // Callback function to trigger UI update
  const updateUI = () => {
    setUpdateTrigger((prevState) => !prevState);
  };

  // Function to handle successful form submission in child component
  const handleFormSubmit = () => {
    updateUI(); // Trigger UI update
    refetch(); // Refetch data to ensure it's up to date
  };

  // Function to handle the "Edit" button click
  const handleTypeOfMealEdit = (typeOfMeal) => {
    setSelectedMealType(typeOfMeal);
  };

  // Function to handle the "Delete" button click
  const handleTypeOfMealDelete = (typeOfMealId) => {
    Swal.fire({
      title: t("ManageMealType.alertMsg.title"),
      text: t("ManageMealType.alertMsg.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: t("ManageMealType.alertMsg.confirmButtonText"),
      cancelButtonText: t("ManageMealType.alertMsg.cancelButtonText"),
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: t("ManageMealType.alertMsg.result"),
        text: deleteMealTypeData?.message[locale],
        icon: "success",
      });

      // Call your delete r numbers of meal per day function here
      deleteMealType(typeOfMealId);
    });
  };
  return (
    <>
      <div className='row'>{content}</div>

      <EditMealTypeModal
        typeOfMealData={selectedMealType}
        onFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(MealTypeCard), {
  ssr: false,
});
