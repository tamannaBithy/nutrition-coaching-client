"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUpdateMealTypeMutation } from "../../../../../redux/features/queries/MEAL_TYPES_API";

const EditMealTypeModal = ({ typeOfMealData, onFormSubmit }) => {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();

  const [updateMealType, { isSuccess, data }] = useUpdateMealTypeMutation();
  // Define state variables to hold form field values
  const [typeOfMeal, setTypeOfMeal] = useState("");
  const [languagePreference, setLanguagePreference] = useState(locale);

  useEffect(() => {
    if (typeOfMealData) {
      setTypeOfMeal(typeOfMealData?.type_of_meal);
      setLanguagePreference(typeOfMealData?.lang);
    }
  }, [typeOfMealData]);

  //toast for success or error message
  useEffect(() => {
    if (isSuccess && data?.status) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: data?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
      // resetForm();
    }

    if (data?.status === false) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        text: data?.message[locale],
      });
    }
  }, [isSuccess, data?.status]);

  //handle Submit Meal Type
  const handleSubmitMealType = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        type_of_meal: typeOfMeal,
        lang: languagePreference,
      };
      // Call the mutation function to update mealPerDay
      await updateMealType({
        id: typeOfMealData?._id,
        data: formData,
      });

      // Execute any additional action after form submission if needed
      if (onFormSubmit) {
        onFormSubmit();
      }
    } catch (error) {
      console.error("Error updating meal type:", error);
    }
  };

  return (
    <div
      className='modal fade'
      id='staticBackdrop'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'>
      <div className='modal-dialog d-flex h-100 align-items-center '>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='staticBackdropLabel'>
              {t("ManageMealType.editTitle")}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <div className='py-3'>
              <div className='py-3'>
                <form onSubmit={handleSubmitMealType}>
                  {/* language preference */}
                  <div className='show_per_page_section mb-4'>
                    <p className='m-1'>
                      {t("ManageMealType.inputs.languagePreference")}
                    </p>
                    {/* Select for how many data per page */}
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      value={languagePreference}
                      onChange={(e) => setLanguagePreference(e.target.value)}>
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
                      placeholder={t(
                        "ManageMealType.inputs.typeOfMeal.placeholder"
                      )}
                      name='typeOfMeal'
                      value={typeOfMeal}
                      onChange={(e) => setTypeOfMeal(e.target.value)}
                      required
                      className='rounded form-control'
                    />
                  </div>

                  {/* Button for submitting the form and creating the meal type */}
                  <div className='mb-4 create_meal_type d-flex justify-content-end'>
                    <input
                      type='submit'
                      value={t("ManageMealType.updateBtnTxt")}
                      data-bs-dismiss='modal'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(EditMealTypeModal), {
  ssr: false,
});
