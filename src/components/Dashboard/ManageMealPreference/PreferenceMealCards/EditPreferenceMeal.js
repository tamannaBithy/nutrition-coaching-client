"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import { useUpdateMealPreferenceMutation } from "../../../../../redux/features/queries/MEAL_PREFERENCE_API";

const EditPreferenceMeal = ({
  preferenceMeal,
  onFormSubmit,
  editModalOpen,
  editModalClose,
}) => {
  const t = useTranslations("Dashboard");

  const [
    updateMealPreference,
    { isLoading, isSuccess, data: updateMealPreferenceData },
  ] = useUpdateMealPreferenceMutation();
  const { locale: langCode } = useParams();
  const [language, setLanguage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Initialize state variables with preferenceMeal data
  // State variables
  const [preferenceImage, setPreferenceImage] = useState("");
  const [preferenceName, setPreferenceName] = useState("");
  const [preferenceDescription, setPreferenceDescription] = useState("");
  const [visibleToUser, setVisibleToUser] = useState(false);

  // Use useEffect to update state when preferenceMeal changes
  useEffect(() => {
    if (preferenceMeal) {
      setPreferenceImage(preferenceMeal.preference_image || "");
      setPreferenceName(preferenceMeal.preference || "");
      setPreferenceDescription(preferenceMeal.preference_desc || "");
      setVisibleToUser(preferenceMeal.visible || false);
    }
  }, [preferenceMeal]);

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

  const handlePreferenceEditFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("preference", preferenceName);
    formData.append("preference_desc", preferenceDescription);
    formData.append("visible", visibleToUser);
    formData.append("preference_image", preferenceImage);
    formData.append("lang", langCode);

    updateMealPreference({
      id: preferenceMeal?._id,
      data: formData,
    }).then(() => {
      if (isSuccess) {
        Swal.fire({
          text: updateMealPreferenceData?.message[langCode],
          icon: "success",
        });
      }
      // Close the modal after successful submission
      onFormSubmit();
      editModalClose();
    });
  };

  return (
    <>
      <div
        className="modal editPreferenceMeal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog d-flex h-100 align-items-center ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {t("ManageMealPreference.inputs.editPreferenceMeals.title")}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={editModalClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="py-3">
                <div className="py-3">
                  <form onSubmit={handlePreferenceEditFormSubmit}>
                    <div className="mb-4 preference_name">
                      <label htmlFor="preference">
                        {t(
                          "ManageMealPreference.inputs.editPreferenceMeals.title"
                        )}
                        <sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        placeholder={t(
                          "ManageMealPreference.inputs.editPreferenceMeals.preferenceName.placeholder"
                        )}
                        name="preference"
                        required
                        className="rounded form-control"
                        value={preferenceName}
                        onChange={(e) => setPreferenceName(e.target.value)}
                      />
                    </div>

                    <div className="preference_name">
                      <div className="mb-2 ingredients_fields">
                        <label htmlFor="preference_desc">
                          {t(
                            "ManageMealPreference.inputs.editPreferenceMeals.preferenceDescription.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <div className="d-flex align-items-center ingredients_fields_area rounded">
                          <textarea
                            type="text"
                            className="form-control border-0"
                            name="preference_desc"
                            id="preference_desc"
                            placeholder={t(
                              "ManageMealPreference.inputs.editPreferenceMeals.preferenceDescription.placeholder"
                            )}
                            required
                            value={preferenceDescription}
                            onChange={(e) =>
                              setPreferenceDescription(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="image_upZone  mb-4">
                      <label htmlFor="mealPreferenceImage">
                        {t(
                          "ManageMealPreference.inputs.editPreferenceMeals.image.label"
                        )}
                      </label>
                      <div
                        {...getPreferenceImageRootProps()}
                        className="dropzone p-5 image_drop_zone  form-control"
                        role="button"
                      >
                        <input
                          id="mealPreferenceImage"
                          {...getPreferenceImageInputProps()}
                        />
                        {isPreferenceImageDragActive ? (
                          <p className="text-center">
                            {t(
                              "ManageMealPreference.inputs.editPreferenceMeals.image.placeholder.one"
                            )}
                            ...
                          </p>
                        ) : (
                          <p className="text-center">
                            {t(
                              "ManageMealPreference.inputs.editPreferenceMeals.image.placeholder.two"
                            )}
                          </p>
                        )}
                      </div>
                      {preferenceImage && (
                        <>
                          <p className="mt-3 mb-2">
                            {t(
                              "ManageMealPreference.inputs.editPreferenceMeals.image.previewImage"
                            )}
                          </p>
                          <div className="d-flex align-items-center">
                            <div className="position-relative">
                              <button
                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                onClick={removePreferenceMealImage}
                              >
                                <IoIosClose
                                  className="position-absolute top-0 end-0 bg-danger text-white rounded fs-3"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  role="button"
                                  onClick={removePreferenceMealImage}
                                  title="Remove the image"
                                />
                              </button>
                              <Image
                                src={
                                  preferenceImage instanceof File
                                    ? URL.createObjectURL(preferenceImage)
                                    : `http://localhost:8000${preferenceImage}`
                                }
                                alt="Preference Image Preview"
                                className="preview-image rounded"
                                width={100}
                                height={100}
                                style={{ width: "100px", height: "100px" }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="form-check col-12 form-switch mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        required
                        checked={visibleToUser}
                        onChange={(e) => setVisibleToUser(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                      >
                        {t(
                          "ManageMealPreference.inputs.editPreferenceMeals.visibleToUser.label"
                        )}
                        <sup className="text-danger">*</sup>
                      </label>
                    </div>

                    <div className="mb-4 create_preference d-flex justify-content-end">
                      <input
                        type="submit"
                        data-bs-dismiss="modal"
                        value={t("ManageMealPreference.btnTxt")}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(EditPreferenceMeal), {
  ssr: false,
});
