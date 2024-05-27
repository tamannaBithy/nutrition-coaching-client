/* eslint-disable react/jsx-no-duplicate-props */
"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import { getDictionary } from "../../../../../getDictionary";
import "./UpdateCoachForm.css";

export default function UpdateCoachForm({ id }) {
  const { lang } = useParams();
  // State to store the fetched language
  const [language, setLanguage] = useState(null);

  // state to manage the updated coach image
  const [updatedImage, setUpdatedImage] = useState(null);

  // state to manage the updated instructor name, qualification, details
  const [updatedName, setUpdatedName] = useState("");
  const [updatedQualification, setUpdatedQualification] = useState("");
  const [updatedDetails, setUpdatedDetails] = useState("");

  // State to manage the updated visibility of the coach
  const [updatedVisible, setUpdatedVisible] = useState(true);

  useEffect(() => {
    // Fetch the language dictionary asynchronously
    getDictionary(lang)
      .then((fetchedLanguage) => {
        setLanguage(fetchedLanguage);
      })
      .catch((error) => {
        // Handle any errors that occur during fetching
        console.error("Error fetching language dictionary:", error);
      });
  }, [lang]); // Run the effect whenever `lang` changes

  const langData = language?.adminDashboard?.manageCoach?.updateCoach;

  console.log(langData?.inputs);

  // Handle update image drop for coach image
  const onUpdateImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setUpdatedImage(acceptedFiles[0]);
    } else {
      alert("Please select only one image for coach image");
    }
  };

  // Configure dropzone for update coach image
  const {
    getRootProps: getUpdatedImageRootProps,
    getInputProps: getUpdatedImageInputProps,
    isDragActive: isUpdatedImageDragActive,
  } = useDropzone({
    onDrop: onUpdateImageDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  // Remove the updated coach image
  const removeUpdatedImage = () => {
    setUpdatedImage(null);
  };

  // Function to handle changes in the update instructor name input field
  const handleUpdatedNameChange = (e) => {
    setUpdatedName(e.target.value);
  };

  // Function to handle changes in the update instructor qualification input field
  const handleUpdatedQualificationChange = (e) => {
    setUpdatedQualification(e.target.value);
  };

  // Function to handle changes in the update instructor details textarea field
  const handleUpdatedDetailsChange = (e) => {
    setUpdatedDetails(e.target.value);
  };

  // Function to handle changes in the update "Visible to user" checkbox
  const handleUpdateVisibilityChange = () => {
    setUpdatedVisible(!updatedVisible);
  };

  // Async function to handle the update form submission
  async function handleUpdatedFormSubmit(e) {
    e.preventDefault();
    console.log(updatedImage, "update coach image");
    console.log(updatedName, "update coach name");
    console.log(updatedQualification, "update coach qualification");
    console.log(updatedDetails, "update coach details");
    console.log(updatedVisible, "update coach visibility");
    // Reset the form after submission
    resetForm();
  }

  // Function to reset the form fields
  const resetForm = () => {
    setUpdatedImage(null);
    setUpdatedName("");
    setUpdatedQualification("");
    setUpdatedDetails("");
    setUpdatedVisible(true);
  };

  return (
    <>
      {/* Page Title */}
      <div className='update_coach_title '>
        <h2>{langData?.pageTitle}</h2>
      </div>

      {/* Main Content */}
      <div className='py-3'>
        <form action='#' onSubmit={handleUpdatedFormSubmit}>
          <div className='row g-3 pt-4'>
            {/* language preference */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='show_per_page_section mb-2'>
                <label htmlFor='lang_preference'>
                  {" "}
                  {langData?.inputs?.languagePreference}
                </label>

                {/* Select for how many data per page */}
                <select
                  className='form-select'
                  aria-label='Default select example'
                  id='lang_preference'
                  // value={showPerPage}
                  // onChange={handleShowPerPageChange}
                >
                  <option value='ar'>العربية</option>
                  <option value='en'>English</option>
                </select>
              </div>
            </div>

            {/* update coach image field */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='update_img_field  mb-2'>
                <label htmlFor='update_image'>
                  {" "}
                  {langData?.inputs?.updateImage?.label}{" "}
                </label>

                <div
                  {...getUpdatedImageRootProps()}
                  className='dropzone p-5 image_drop_zone form-control'
                  role='button'>
                  <input id='update_image' {...getUpdatedImageInputProps()} />
                  {isUpdatedImageDragActive ? (
                    <p className='text-center'>
                      {" "}
                      {langData?.inputs?.updateImage?.dropPlaceholder}
                    </p>
                  ) : (
                    <p className='text-center'>
                      {langData?.inputs?.updateImage?.dragPlaceHolder}
                    </p>
                  )}
                </div>

                {updatedImage && (
                  <>
                    <p className='mt-3 mb-2'>
                      {" "}
                      {langData?.inputs?.updateImage?.previewImage}
                    </p>
                    <div className='d-flex align-items-center'>
                      <div className='position-relative'>
                        <IoIosClose
                          className='position-absolute top-0 end-0 bg-danger text-white rounded fs-3'
                          data-toggle='tooltip'
                          data-placement='top'
                          role='button'
                          onClick={removeUpdatedImage}
                          title='Remove the image'
                        />
                        <Image
                          width={150}
                          height={150}
                          alt='coach_image'
                          src={URL?.createObjectURL(updatedImage)}
                          alt={`Updated Coach Image Preview`}
                          className='preview-image rounded'
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* update coach name field */}
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <div className='mb-2 update_name_fields'>
                <label htmlFor='instructor_name'>
                  {langData?.inputs?.updateName?.label}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='text'
                  name='updatedName'
                  id='instructor_name'
                  className='rounded form-control'
                  required
                  value={updatedName}
                  onChange={handleUpdatedNameChange}
                  placeholder={langData?.inputs?.updateName?.placeHolder}
                />
              </div>
            </div>

            {/* update coach qualification field  */}
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <div className='mb-2 update_qualification_fields'>
                <label htmlFor='instructor_qualification'>
                  {langData?.inputs?.updateQualification?.label}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='text'
                  name='updatedQualification'
                  id='instructor_qualification'
                  className='rounded form-control'
                  required
                  value={updatedQualification}
                  onChange={handleUpdatedQualificationChange}
                  placeholder={
                    langData?.inputs?.updateQualification?.placeHolder
                  }
                />
              </div>
            </div>

            {/* update coach details field */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='mb-2 update_details_field'>
                <label htmlFor='instructor_details'>
                  {langData?.inputs?.updateDetails?.label}
                  <sup className='text-danger'>*</sup>
                </label>

                <div className='d-flex align-items-center input_fields_area rounded'>
                  <textarea
                    type='text'
                    className='form-control '
                    name='updatedDetails'
                    id='instructor_details'
                    placeholder={langData?.inputs?.updateDetails?.placeHolder}
                    value={updatedDetails}
                    onChange={handleUpdatedDetailsChange}
                  />
                </div>
              </div>
            </div>

            {/*update visible to user check box field */}
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <div className='form-check form-switch mb-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  role='switch'
                  id='update_visible_checked'
                  checked={updatedVisible}
                  onChange={handleUpdateVisibilityChange}
                />
                <label
                  className='form-check-label'
                  htmlFor='update_visible_checked'>
                  {langData?.inputs?.visible?.label}
                  <sup className='text-danger'>*</sup>
                </label>
              </div>
            </div>

            {/* Submit button */}
            <div className='col-12 update_coach_btn py-3 d-flex align-items-center w-100 justify-content-center'>
              <input
                type='submit'
                className='p-2 w-25'
                value={langData?.inputs?.buttonText}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
