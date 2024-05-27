"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import { useUpdateInstructorMutation } from "../../../../../redux/features/queries/INSTRUCTOR_API";

export default function UpdateCoachModal({ coachData, onFormSubmit }) {
  const [updateInstructor] = useUpdateInstructorMutation();
  const { locale } = useParams();
  const t = useTranslations("Dashboard");

  // state to manage the updated coach image
  const [selectedLang, setSelectedLang] = useState("en");
  const [updatedImage, setUpdatedImage] = useState(null);

  // state to manage the updated instructor name, qualification, details
  const [updatedName, setUpdatedName] = useState("");
  const [updatedQualification, setUpdatedQualification] = useState("");
  const [updatedDetails, setUpdatedDetails] = useState("");

  // State to manage the updated visibility of the coach
  const [updatedVisible, setUpdatedVisible] = useState(null);

  useEffect(() => {
    setUpdatedImage(coachData?.image);
    setUpdatedName(coachData?.instructor_name);
    setUpdatedQualification(coachData?.instructor_qualification);
    setUpdatedDetails(coachData?.instructor_details);
    setUpdatedVisible(coachData?.visible);
  }, [coachData]);

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

  // Event handler for language preference select
  const handleLanguageChange = (e) => {
    setSelectedLang(e.target.value);
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
    const formData = new FormData();
    formData.append("lang", selectedLang);
    formData.append("image", updatedImage);
    formData.append("instructor_name", updatedName);
    formData.append("instructor_qualification", updatedQualification);
    formData.append("instructor_details", updatedDetails);
    formData.append("visible", updatedVisible);

    const { data } = await updateInstructor({
      id: coachData?._id,
      data: formData,
    });
    if (data?.status) {
      onFormSubmit();
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

  //  const langData = language?.adminDashboard?.manageCoach?.updateCoach;

  return (
    <div
      className="modal editCoachModal h-100 fade"
      id="staticBackdrop6"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog d-flex align-items-center bg-transparent">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title" id="staticBackdropLabel">
              <div className="edit_coach_title ">
                <h2>{t("ManageCoach.updateCoach.pageTitle")}</h2>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="py-3">
              <div className="py-3">
                <form onSubmit={handleUpdatedFormSubmit}>
                  <div className="row g-3 pt-4">
                    {/* language preference */}
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="show_per_page_section mb-2">
                        <label htmlFor="lang_preference">
                          {t(
                            "ManageCoach.updateCoach.inputs.languagePreference"
                          )}
                        </label>

                        {/* Select for how many data per page */}
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="lang_preference"
                          value={selectedLang}
                          onChange={handleLanguageChange}
                        >
                          <option value="ar">العربية</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>

                    {/* update coach image field */}
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="update_img_field  mb-2">
                        <label htmlFor="update_image">
                          {t(
                            "ManageCoach.updateCoach.inputs.updateImage.label"
                          )}
                        </label>

                        <div
                          {...getUpdatedImageRootProps()}
                          className="dropzone p-5 image_drop_zone form-control"
                          role="button"
                        >
                          <input
                            id="update_image"
                            {...getUpdatedImageInputProps()}
                          />
                          {isUpdatedImageDragActive ? (
                            <p className="text-center">
                              {t(
                                "ManageCoach.updateCoach.inputs.updateImage.dropPlaceholder"
                              )}
                            </p>
                          ) : (
                            <p className="text-center">
                              {t(
                                "ManageCoach.updateCoach.inputs.updateImage.dropPlaceholder"
                              )}
                            </p>
                          )}
                        </div>

                        {updatedImage && (
                          <>
                            <p className="mt-3 mb-2">
                              {t(
                                "ManageCoach.updateCoach.inputs.updateImage.previewImage"
                              )}
                            </p>
                            <div className="d-flex align-items-center">
                              <div className="position-relative">
                                <IoIosClose
                                  className="position-absolute top-0 end-0 bg-danger text-white rounded fs-3"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  role="button"
                                  onClick={removeUpdatedImage}
                                  title="Remove the image"
                                />
                                <Image
                                  width={150}
                                  height={150}
                                  src={
                                    updatedImage instanceof File
                                      ? URL.createObjectURL(updatedImage)
                                      : `http://localhost:8000${updatedImage}`
                                  }
                                  alt={`Updated Coach Image Preview`}
                                  className="preview-image rounded"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* update coach name field */}
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 update_name_fields">
                        <label htmlFor="instructor_name">
                          {t("ManageCoach.updateCoach.inputs.updateName.label")}
                          <sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          name="updatedName"
                          id="instructor_name"
                          className="rounded form-control"
                          required
                          value={updatedName}
                          onChange={handleUpdatedNameChange}
                          placeholder={t(
                            "ManageCoach.updateCoach.inputs.updateName.placeHolder"
                          )}
                        />
                      </div>
                    </div>

                    {/* update coach qualification field  */}
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 update_qualification_fields">
                        <label htmlFor="instructor_qualification">
                          {t(
                            "ManageCoach.updateCoach.inputs.updateQualification.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          name="updatedQualification"
                          id="instructor_qualification"
                          className="rounded form-control"
                          required
                          value={updatedQualification}
                          onChange={handleUpdatedQualificationChange}
                          placeholder={t(
                            "ManageCoach.updateCoach.inputs.updateQualification.placeHolder"
                          )}
                        />
                      </div>
                    </div>

                    {/* update coach details field */}
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="mb-2 update_details_field">
                        <label htmlFor="instructor_details">
                          {t(
                            "ManageCoach.updateCoach.inputs.updateDetails.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>

                        <div className="d-flex align-items-center input_fields_area rounded">
                          <textarea
                            type="text"
                            rows="4"
                            className="form-control "
                            name="updatedDetails"
                            id="instructor_details"
                            placeholder={t(
                              "ManageCoach.updateCoach.inputs.updateDetails.placeHolder"
                            )}
                            value={updatedDetails}
                            onChange={handleUpdatedDetailsChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/*update visible to user check box field */}
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="form-check form-switch mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="update_visible_checked"
                          checked={updatedVisible}
                          onChange={handleUpdateVisibilityChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="update_visible_checked"
                        >
                          {t("ManageCoach.updateCoach.inputs.visible.label")}
                          <sup className="text-danger">*</sup>
                        </label>
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="col-12 update_coach_btn py-3 d-flex align-items-center w-100 justify-content-center">
                      <input
                        type="submit"
                        className="p-2 w-25"
                        value={t("ManageCoach.updateCoach.inputs.buttonText")}
                        data-bs-dismiss="modal"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
