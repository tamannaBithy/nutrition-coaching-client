"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";
import {
  useDeleteMealPerDayMutation,
  useGetAllMealPerDayForAdminQuery,
} from "../../../../../redux/features/queries/MEALS_PER_DAY_API";
import EditMealsNumberModal from "./EditMealsNumberModal";
import "./ManageMealsNumber.css";

/**
 * Component for managing the number of meals per week.
 * @component
 * @returns {JSX.Element} The rendered ManageMealsNumber component.
 */
const ManageMealsNumber = () => {
  const t = useTranslations("Dashboard");

  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [selectedMealPerDayNumber, setSelectedMealPerDayNumber] =
    useState(null);
  const { data, isLoading, isSuccess, refetch } =
    useGetAllMealPerDayForAdminQuery();
  const [
    deleteMealPerDay,
    {
      isLoading: mealPerDayLoading,
      isSuccess: mealPerDayIsSuccess,
      mealPerDayData,
    },
  ] = useDeleteMealPerDayMutation();

  //decide what to render
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

  if (!isLoading && isSuccess) {
    content = (
      <>
        {data?.data?.map((mealsCount, i) => (
          <div key={i} className='col-lg-4 col-md-6 col-sm-12  '>
            <div className='numbers_of_meal_card my-md-3 my-sm-3 my-2 d-flex  justify-content-center align-items-center flex-column'>
              {/* Display the first number of meals */}
              <div className='numbers_of_meal'>
                <h6>{mealsCount?.meals_count}</h6>
              </div>

              {/* Dropdown menu for the  number of meals settings */}
              <div className='numbers_of_meal_settings dropstart'>
                <button
                  className='dropdown-toggle'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  <BsThreeDots />
                </button>

                {/* Dropdown menu items for editing and deleting the  number of meals */}
                <ul className='dropdown-menu'>
                  <li className='px-2'>
                    <button
                      className='numbers_of_meal_edit_btn'
                      data-bs-toggle='modal'
                      data-bs-target='#staticBackdrop'
                      onClick={() => handleNumbersOfMealEdit(mealsCount)}>
                      {t("ManageMealsPerDay.editBtnTxt")}
                    </button>
                  </li>

                  <li className='px-2'>
                    <button
                      className='numbers_of_meal_delete_btn'
                      onClick={() =>
                        handleNumbersOfMealDelete(mealsCount?._id)
                      }>
                      {t("ManageMealsPerDay.deleteBtnTxt")}
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
  const handleNumbersOfMealEdit = (numberOfMealCounts) => {
    setSelectedMealPerDayNumber(numberOfMealCounts);
  };

  // Function to handle the "Delete" button click
  const handleNumbersOfMealDelete = (numberOfMealId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove to numbers of meal per day ..?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove to numbers of meal per day!",
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Removed!",
        text: "Delete successfully",
        icon: "success",
      });

      // Call your delete r numbers of meal per day function here
      deleteMealPerDay(numberOfMealId);
    });
  };

  return (
    <div className='row'>
      {/* Card container for the first number of meals */}
      {content}
      <EditMealsNumberModal
        mealPerDay={selectedMealPerDayNumber}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(ManageMealsNumber), {
  ssr: false,
});
