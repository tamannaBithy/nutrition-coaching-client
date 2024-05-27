/* eslint-disable react/jsx-no-duplicate-props */
"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import { useCreateMealPreferenceMutation } from "../../../../../redux/features/queries/MEAL_PREFERENCE_API";
import "./AddPreferenceForm.css";

const AddPreferenceForm = () => {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();

  const [createMealPreference, { isError, isSuccess, data }] =
    useCreateMealPreferenceMutation();

  // state to manage the preference image upload
  const [preferenceImage, setPreferenceImage] = useState("");

  // State to manage the entered preference value
  const [preference, setPreference] = useState("");
  const [preferenceDesc, setPreferenceDesc] = useState("");

  // State to manage the visibility of the preference
  const [visibleToUser, setVisibleToUser] = useState(true);

  // State variables for lang(Language code), package name, tags, price and visibility
  const [langFormData, setLangFormData] = useState("en");

  // Handle image drop for preference meal image
  const onPreferenceImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setPreferenceImage(acceptedFiles[0]);
    } else {
      alert(t("ManageMealPreference.alertMsg.one"));
    }
  };

  // Configure dropzone for preference meal image
  const {
    getRootProps: getPreferenceImageRootProps,
    getInputProps: getPreferenceImageInputProps,
    isDragActive: isPreferenceImageDragActive,
  } = useDropzone({
    onDrop: onPreferenceImageDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  // Remove the nutrition facts image
  const removePreferenceMealImage = () => {
    setPreferenceImage(null);
  };

  // Function to handle changes in the preference input field
  const handlePreferenceChange = (e) => {
    setPreference(e.target.value);
  };
  const handlePreferenceDescChange = (e) => {
    setPreferenceDesc(e.target.value);
  };

  // Function to handle changes in the "Visible to user" checkbox
  const handleVisibilityChange = () => {
    setVisibleToUser(!visibleToUser);
  };

  // Event handler for language preference select
  const handleLanguageChange = (e) => {
    setLangFormData(e.target.value);
  };

  useEffect(() => {
    if (isSuccess && data?.status) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: t("ManageMealPreference.alertMsg.two"),
        showConfirmButton: false,
        timer: 2500,
      });
      // resetForm();
    }

    if (data?.status === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("ManageMealPreference.alertMsg.three"),
      });
    }
  }, [isSuccess, data?.status]);

  // Async function to handle the form submission
  async function handlePreferenceFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lang", langFormData);
    if (preferenceImage) {
      formData.append("preference_image", preferenceImage);
    }
    formData.append("preference_desc", preferenceDesc);
    formData.append("preference", preference);
    formData.append("visible", visibleToUser);

    //create meal preference
    createMealPreference(formData);
    // Reset the form after submission
    resetForm();
  }

  // Function to reset the form fields
  const resetForm = () => {
    setPreferenceImage(null);
    setPreference("");
    setVisibleToUser(true);
    setPreferenceDesc("");
  };

  return (
    <div className='pt-4'>
      {/* Form for adding a meal preference */}
      <form onSubmit={handlePreferenceFormSubmit}>
        {/* language preference */}
        <div className='show_per_page_section mb-4'>
          <p className='m-1'>
            {t("ManageMealPreference.inputs.languagePreference")}
          </p>
          {/* Select for how many data per page */}
          <select
            className='form-select'
            aria-label='Default select example'
            value={langFormData}
            onChange={handleLanguageChange}>
            <option value='ar'>العربية</option>
            <option value='en'>English</option>
          </select>
        </div>

        {/* Input field for entering the preference name */}
        <div className='mb-4 preference_name'>
          <label htmlFor='preference'>
            {t("ManageMealPreference.inputs.preferenceName.label")}
            <sup className='text-danger'>*</sup>
          </label>
          <input
            type='text'
            placeholder={t(
              "ManageMealPreference.inputs.preferenceName.placeholder"
            )}
            name='preference'
            required
            value={preference}
            onChange={handlePreferenceChange}
            className='rounded form-control'
          />
        </div>

        <div className='preference_name'>
          <div className='mb-2 ingredients_fields'>
            <label htmlFor='preference_desc'>
              {t("ManageMealPreference.inputs.preferenceDescription.label")}
              <sup className='text-danger'>*</sup>
            </label>
            <div className='d-flex align-items-center ingredients_fields_area rounded'>
              <textarea
                type='text'
                className='form-control border-0'
                name='preference_desc'
                id='preference_desc'
                value={preferenceDesc}
                onChange={handlePreferenceDescChange}
                placeholder={t(
                  "ManageMealPreference.inputs.preferenceDescription.placeholder"
                )}
                required
              />
            </div>
          </div>
        </div>

        {/* Input field for preference image*/}
        <div className='image_upZone  mb-4'>
          <label htmlFor='mealPreferenceImage'>
            {t("ManageMealPreference.inputs.image.label")}
          </label>

          <div
            {...getPreferenceImageRootProps()}
            className='dropzone p-5 image_drop_zone  form-control'
            role='button'>
            <input
              id='mealPreferenceImage'
              {...getPreferenceImageInputProps()}
            />
            {isPreferenceImageDragActive ? (
              <p className='text-center'>
                {t("ManageMealPreference.inputs.image.placeholder.one")}
              </p>
            ) : (
              <p className='text-center'>
                {t("ManageMealPreference.inputs.image.placeholder.two")}
              </p>
            )}
          </div>

          {preferenceImage && (
            <>
              <p className='mt-3 mb-2'>
                {t("ManageMealPreference.inputs.image.previewImage")}
              </p>
              <div className='d-flex align-items-center'>
                <div className='position-relative'>
                  <IoIosClose
                    className='position-absolute top-0 end-0 bg-danger text-white rounded fs-3'
                    data-toggle='tooltip'
                    data-placement='top'
                    role='button'
                    onClick={removePreferenceMealImage}
                    title='Remove the image'
                  />
                  <Image
                    width={100}
                    height={100}
                    alt='nutrition_facts_image'
                    src={URL?.createObjectURL(preferenceImage)}
                    alt={`Preference Image Preview`}
                    className='preview-image rounded'
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* visible to user check box field */}
        <div className='form-check col-12 form-switch mb-4'>
          <input
            className='form-check-input'
            type='checkbox'
            role='switch'
            id='flexSwitchCheckChecked'
            checked={visibleToUser}
            onChange={handleVisibilityChange}
          />
          <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
            {t("ManageMealPreference.inputs.visibleToUser.label")}

            <sup className='text-danger'>*</sup>
          </label>
        </div>

        {/* Button for submitting the form and creating the preference */}
        <div className='mb-4 create_preference d-flex justify-content-end'>
          <input type='submit' value={t("ManageMealPreference.btnTxt")} />
        </div>
      </form>
    </div>
  );
};

export default dynamic(() => Promise.resolve(AddPreferenceForm), {
  ssr: false,
});
