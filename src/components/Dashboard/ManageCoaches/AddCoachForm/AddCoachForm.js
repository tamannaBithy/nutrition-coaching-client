/* eslint-disable react/jsx-no-duplicate-props */
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import { useCreateInstructorMutation } from "../../../../../redux/features/queries/INSTRUCTOR_API";
import "./AddCoachForm.css";

export default function AddCoachForm() {
  const t = useTranslations("Dashboard");
  const [createInstructor, { isSuccess }] = useCreateInstructorMutation();
  // state to manage the coach image
  const [coachImage, setCoachImage] = useState(null);
  // State variables for lang(Language code), package name, tags, price and visibility
  const [selectedLang, setSelectedLang] = useState("en");

  // state to manage the instructor name, qualification, details
  const [instructorName, setInstructorName] = useState("");
  const [instructorQualification, setInstructorQualification] = useState("");
  const [instructorDetails, setInstructorDetails] = useState("");

  // State to manage the visibility of the coach
  const [visibleCoach, setVisibleCoach] = useState(true);

  const { locale } = useParams();

  // Handle image drop for coach image
  const onCoachImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setCoachImage(acceptedFiles[0]);
    } else {
      alert("Please select only one image for coach image");
    }
  };

  // Configure dropzone for coach image
  const {
    getRootProps: getCoachImageRootProps,
    getInputProps: getCoachImageInputProps,
    isDragActive: isCoachImageDragActive,
  } = useDropzone({
    onDrop: onCoachImageDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  // Remove the coach image
  const removeCoachImage = () => {
    setCoachImage(null);
  };

  // Function to handle changes in the instructor name input field
  const handleInstructorNameChange = (e) => {
    setInstructorName(e.target.value);
  };

  // Event handler for language preference select
  const handleLanguageChange = (e) => {
    setSelectedLang(e.target.value);
  };

  // Function to handle changes in the instructor qualification input field
  const handleInstructorQualificationChange = (e) => {
    setInstructorQualification(e.target.value);
  };

  // Function to handle changes in the instructor details textarea field
  const handleInstructorDetailsChange = (e) => {
    setInstructorDetails(e.target.value);
  };

  // Function to handle changes in the "Visible to user" checkbox
  const handleVisibilityChange = () => {
    setVisibleCoach(!visibleCoach);
  };

  // Async function to handle the form submission
  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lang", selectedLang);
    formData.append("image", coachImage);
    formData.append("instructor_name", instructorName);
    formData.append("instructor_qualification", instructorQualification);
    formData.append("instructor_details", instructorDetails);
    formData.append("visible", visibleCoach);

    const { data } = await createInstructor(formData);

    if (data?.status) {
      Swal.fire({
        icon: "success",
        title: data?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: data?.message?.en,
        showConfirmButton: false,
        timer: 2500,
      });
    }
    // Reset the form after successful submission
    if (isSuccess) {
      resetForm();
    }
  }

  // Function to reset the form fields
  const resetForm = () => {
    setCoachImage(null);
    setInstructorName("");
    setInstructorQualification("");
    setInstructorDetails("");
    setVisibleCoach(true);
  };

  return (
    <>
      {/* Page Title */}
      <div className='add_coach_title '>
        <h2> {t("ManageCoach.addCoach.pageTitle")} </h2>
      </div>

      <form onSubmit={handleFormSubmit} className='py-3'>
        <div className='row g-3 pt-4'>
          {/* language preference */}
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='show_per_page_section mb-2'>
              <label htmlFor='lang_preference'>
                {" "}
                {t("ManageCoach.addCoach.inputs.languagePreference")}
              </label>

              {/* Select for how many data per page */}
              <select
                className='form-select'
                aria-label='Default select example'
                id='lang_preference'
                value={selectedLang}
                onChange={handleLanguageChange}>
                <option value='ar'>العربية</option>
                <option value='en'>English</option>
              </select>
            </div>
          </div>

          {/* coach image field */}
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='coach_img_field  mb-2'>
              <label htmlFor='coach_image'>
                {t("ManageCoach.addCoach.inputs.coachImage.label")}
              </label>

              <div
                {...getCoachImageRootProps()}
                className='dropzone p-5 image_drop_zone form-control'
                role='button'>
                <input id='coach_image' {...getCoachImageInputProps()} />
                {isCoachImageDragActive ? (
                  <p className='text-center'>
                    {" "}
                    {t(
                      "ManageCoach.addCoach.inputs.coachImage.dropPlaceholder"
                    )}
                  </p>
                ) : (
                  <p className='text-center'>
                    {t(
                      "ManageCoach.addCoach.inputs.coachImage.dragPlaceHolder"
                    )}
                  </p>
                )}
              </div>

              {coachImage && (
                <>
                  <p className='mt-3 mb-2'>
                    {" "}
                    {t("ManageCoach.addCoach.inputs.coachImage.previewImage")}
                  </p>
                  <div className='d-flex align-items-center'>
                    <div className='position-relative'>
                      <IoIosClose
                        className='position-absolute top-0 end-0 bg-danger text-white rounded fs-3'
                        data-toggle='tooltip'
                        data-placement='top'
                        role='button'
                        onClick={removeCoachImage}
                        title='Remove the image'
                      />
                      <Image
                        width={150}
                        height={150}
                        alt='coach_image'
                        src={URL?.createObjectURL(coachImage)}
                        alt={`Coach Image Preview`}
                        className='preview-image rounded'
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* coach name field */}
          <div className='col-lg-6 col-md-12 col-sm-12'>
            <div className='mb-2 coach_name_fields'>
              <label htmlFor='instructor_name'>
                {t("ManageCoach.addCoach.inputs.name.label")}
                <sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                name='instructorName'
                id='instructor_name'
                className='rounded form-control'
                required
                value={instructorName}
                onChange={handleInstructorNameChange}
                placeholder={t("ManageCoach.addCoach.inputs.name.placeHolder")}
              />
            </div>
          </div>

          {/* coach qualification field  */}
          <div className='col-lg-6 col-md-12 col-sm-12'>
            <div className='mb-2 coach_qualification_fields'>
              <label htmlFor='instructor_qualification'>
                {t("ManageCoach.addCoach.inputs.qualification.label")}
                <sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                name='instructorQualification'
                id='instructor_qualification'
                className='rounded form-control'
                required
                value={instructorQualification}
                onChange={handleInstructorQualificationChange}
                placeholder={t(
                  "ManageCoach.addCoach.inputs.qualification.placeHolder"
                )}
              />
            </div>
          </div>

          {/* coach details field */}
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='mb-2 coach_details_field'>
              <label htmlFor='instructor_details'>
                {t("ManageCoach.addCoach.inputs.details.label")}
                <sup className='text-danger'>*</sup>
              </label>

              <div className='d-flex align-items-center input_fields_area rounded'>
                <textarea
                  type='text'
                  className='form-control '
                  name='instructorDetails'
                  id='instructor_details'
                  placeholder={t(
                    "ManageCoach.addCoach.inputs.details.placeHolder"
                  )}
                  value={instructorDetails}
                  onChange={handleInstructorDetailsChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* visible to user check box field */}
          <div className='col-lg-6 col-md-12 col-sm-12'>
            <div className='form-check form-switch mb-2'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='coach_visible_checked'
                checked={visibleCoach}
                onChange={handleVisibilityChange}
              />
              <label
                className='form-check-label'
                htmlFor='coach_visible_checked'>
                {t("ManageCoach.addCoach.inputs.visible.label")}
                <sup className='text-danger'>*</sup>
              </label>
            </div>
          </div>

          {/* Submit button */}
          <div className='col-12 add_coach_btn py-3 d-flex align-items-center w-100 justify-content-center'>
            <input
              type='submit'
              className='p-2 w-25'
              value={t("ManageCoach.addCoach.inputs.buttonText")}
            />
          </div>
        </div>
      </form>
    </>
  );
}
