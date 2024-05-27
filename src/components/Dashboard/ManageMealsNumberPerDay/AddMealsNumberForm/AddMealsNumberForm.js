"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { useCreateMealPerDayMutation } from "../../../../../redux/features/queries/MEALS_PER_DAY_API";
import "./AddMealsNumberForm.css";

/**
 * Component for adding the number of meals per week.
 * @component
 * @returns {JSX.Element} The rendered AddMealsNumberForm component.
 */
export default function AddMealsNumberForm() {
  const t = useTranslations("Dashboard");
  const { locale } = useParams();

  const [createMealPerDay, { isError, isSuccess, data }] =
    useCreateMealPerDayMutation();
  // State to manage the entered number of meals
  const [mealNumbers, setMealNumbers] = useState("");
  // State to manage visibility
  const [isVisible, setIsVisible] = useState(true);

  // Function to handle changes in the number of meals input field
  const handleMealNumberChange = (e) => {
    // Ensure that the input is a positive number
    const value =
      e.target.value.trim() === ""
        ? ""
        : Math.max(0, parseInt(e.target.value, 10) || 0);
    setMealNumbers(value);
  };
  // Function to handle changes in visibility checkbox
  const handleVisibilityChange = (e) => {
    setIsVisible(e.target.checked);
  };

  // Async function to handle the form submission
  async function handleNumbersOfMealSubmit(e) {
    e.preventDefault();
    const formData = {
      meals_count: parseInt(mealNumbers),
      visible: isVisible,
    };
    const { data } = await createMealPerDay(formData);
    // showing success message
    if (data?.status) {
      resetForm();
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

  // Function to reset the form fields
  const resetForm = () => {
    setMealNumbers("");
  };

  return (
    <div className='pt-4'>
      {/* Form for adding the number of meals per week */}
      <form action='#' onSubmit={handleNumbersOfMealSubmit}>
        {/* Input field for entering the number of meals */}
        <div className='mb-4 numbers_of_meal'>
          <label htmlFor='mealNumbers'>
            {t("ManageMealsPerDay.inputs.mealsPerDay.label")}
            <sup className='text-danger'>*</sup>
          </label>
          <input
            type='number'
            placeholder={t("ManageMealsPerDay.inputs.mealsPerDay.placeholder")}
            name='mealNumbers'
            required
            value={mealNumbers}
            onChange={handleMealNumberChange}
            className='rounded form-control'
          />
        </div>

        {/* visible */}
        <div className='col-lg-12 col-md-12 col-sm-12 pt-4'>
          <div className='form-check form-switch pt-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='flexSwitchCheckChecked'
              name='visible'
              checked={isVisible} // Set checked value based on state
              onChange={handleVisibilityChange} // Handle changes
            />
            <label
              className='form-check-label'
              htmlFor='flexSwitchCheckChecked'>
              {t("ManageMealsPerDay.inputs.visibleToUser")}
              <sup className='text-danger'>*</sup>
            </label>
          </div>
        </div>

        {/* Button for submitting the form and creating the number of meals entry */}
        <div className='mb-4 create_number_of_meal d-flex justify-content-end'>
          <input type='submit' value={t("ManageMealsPerDay.btnTxt")} />
        </div>
      </form>
    </div>
  );
}
