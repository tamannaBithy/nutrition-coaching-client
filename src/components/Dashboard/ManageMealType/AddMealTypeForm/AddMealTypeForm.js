"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { useCreateMealTypeMutation } from "../../../../../redux/features/queries/MEAL_TYPES_API";
import "./AddMealTypeForm.css";

/**
 * Component for adding a meal type.
 * @component
 * @returns {JSX.Element} The rendered AddMealTypeForm component.
 */
const AddMealTypeForm = () => {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();

  const [createMealType, { isError, isSuccess, data }] =
    useCreateMealTypeMutation();
  const [langFormData, setLangFormData] = useState(locale);
  // State to manage the entered type of meal
  const [typeOfMeal, setTypeOfMeal] = useState("");

  // Function to handle changes in the type of meal input field
  const handleTypeOfMealChange = (e) => {
    setTypeOfMeal(e.target.value);
  };

  // Function to handle language change
  const handleLangChange = (selectedLang) => {
    setLangFormData(selectedLang);
  };

  // Async function to handle the form submission
  async function handleMealTypeFormSubmit(e) {
    e.preventDefault();
    const formData = {
      lang: langFormData,
      type_of_meal: typeOfMeal,
    };

    //create meal type
    const { data } = await createMealType(formData);
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
    setTypeOfMeal("");
  };

  return (
    <div className='pt-4'>
      {/* Form for adding a meal type */}
      <form action='#' onSubmit={handleMealTypeFormSubmit}>
        {/* language preference */}
        <div className='show_per_page_section mb-4'>
          <p className='m-1'>{t("ManageMealType.inputs.languagePreference")}</p>
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

        {/* Input field for entering the type of meal */}
        <div className='mb-4 type_of_meal'>
          <label htmlFor='typeOfMeal'>
            {t("ManageMealType.inputs.typeOfMeal.label")}
            <sup className='text-danger'>*</sup>
          </label>
          <input
            type='text'
            placeholder={t("ManageMealType.inputs.typeOfMeal.placeholder")}
            name='typeOfMeal'
            required
            value={typeOfMeal}
            onChange={handleTypeOfMealChange}
            className='rounded form-control'
          />
        </div>

        {/* Button for submitting the form and creating the meal type */}
        <div className='mb-4 create_meal_type d-flex justify-content-end'>
          <input type='submit' value={t("ManageMealType.btnTxt")} />
        </div>
      </form>
    </div>
  );
};

export default dynamic(() => Promise.resolve(AddMealTypeForm), {
  ssr: false,
});
