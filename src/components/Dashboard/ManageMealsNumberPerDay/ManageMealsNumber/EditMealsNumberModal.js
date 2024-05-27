"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUpdateMealPerDayMutation } from "../../../../../redux/features/queries/MEALS_PER_DAY_API";

const EditMealsNumberModal = ({ mealPerDay, onFormSubmit }) => {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();

  const [updateMealPerDay, { isSuccess, data: updateMealPerDayData }] =
    useUpdateMealPerDayMutation();
  // Define state variables to hold form field values
  const [mealCount, setMealCount] = useState("");
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    if (mealPerDay) {
      setMealCount(mealPerDay?.meals_count);
      setVisible(mealPerDay?.visible);
    }
  }, [mealPerDay]);

  useEffect(() => {
    if (updateMealPerDayData?.status && isSuccess) {
      Swal.fire({
        text: updateMealPerDayData?.message[locale],
        icon: "success",
      });
    }
  }, [isSuccess, updateMealPerDayData?.status]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        meals_count: mealCount,
        visible,
      };
      // Call the mutation function to update mealPerDay
      await updateMealPerDay({
        id: mealPerDay?._id,
        data: formData,
      });

      // Execute any additional action after form submission if needed
      if (onFormSubmit) {
        onFormSubmit();
      }
    } catch (error) {
      console.error("Error updating meal per day:", error);
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
              {t("ManageMealsPerDay.editTitle")}
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
                <form onSubmit={handleSubmit}>
                  {/* Input field for entering the number of meals */}
                  <div className='mb-4 numbers_of_meal'>
                    <label htmlFor='mealNumbers'>
                      {t("ManageMealsPerDay.inputs.mealsPerDay.label")}
                      <sup className='text-danger'>*</sup>
                    </label>
                    <input
                      type='number'
                      placeholder={t(
                        "ManageMealsPerDay.inputs.mealsPerDay.placeholder"
                      )}
                      name='mealNumbers'
                      value={mealCount}
                      onChange={(e) => setMealCount(parseInt(e.target.value))}
                      required
                      className='rounded form-control'
                    />
                  </div>

                  {/* visible */}
                  <div className='col-lg-12 col-md-12 col-sm-12'>
                    <div className='form-check form-switch pt-2'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckChecked2'
                        checked={visible}
                        onChange={(e) => setVisible(e.target.checked)}
                        name='visible'
                      />
                      <label
                        className='form-check-label'
                        htmlFor='flexSwitchCheckChecked2'>
                        {t("ManageMealsPerDay.inputs.visibleToUser")}
                        <sup className='text-danger'>*</sup>
                      </label>
                    </div>
                  </div>

                  {/* Button for submitting the form and creating the number of meals entry */}
                  <div className='mb-4 create_number_of_meal d-flex justify-content-end'>
                    <input
                      type='submit'
                      value={t("ManageMealsPerDay.btnTxt")}
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

export default dynamic(() => Promise.resolve(EditMealsNumberModal), {
  ssr: false,
});
