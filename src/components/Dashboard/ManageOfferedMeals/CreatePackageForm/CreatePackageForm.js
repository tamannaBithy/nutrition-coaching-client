/* eslint-disable react/jsx-no-duplicate-props */
"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import { useCreateOfferedMealPackageMutation } from "../../../../../redux/features/queries/OFFERED_MEALS_API";
import "./CreatePackageForm.css";

const CreatePackageForm = () => {
  const t = useTranslations("Dashboard");

  const [createOfferedMealPackage, { isSuccess, isError, data }] =
    useCreateOfferedMealPackageMutation();
  const { locale: langCode } = useParams();
  const [language, setLanguage] = useState(null);
  // State variables for lang(Language code), package name, tags, price and visibility
  const [langFormData, setLangFormData] = useState("en");
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState();
  const [isVisible, setIsVisible] = useState(true);
  /* selected package for tags */
  const [selected, setSelected] = useState([]);
  // state to manage the offered meal image
  const [offeredImage, setOfferedImage] = useState(null);

  // Handle image drop for offered meal image
  const onOfferedImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setOfferedImage(acceptedFiles[0]);
    } else {
      alert(t("ManageOfferedMeals.AddOfferedMeals.alert.one"));
    }
  };

  // Remove the offered meal image
  const removeOfferedImage = () => {
    setOfferedImage(null);
  };

  // Configure dropzone for offered meal image
  const {
    getRootProps: getOfferedImageRootProps,
    getInputProps: getOfferedImageInputProps,
    isDragActive: isOfferedImageDragActive,
  } = useDropzone({
    onDrop: onOfferedImageDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  /* Package Image Handling code starts here */

  // Event handler for package name input
  const handlePackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  // Event handler for package price input
  const handlePackagePriceChange = (e) => {
    setPackagePrice(e.target.value);
  };

  // Event handler for language preference select
  const handleLanguageChange = (e) => {
    setLangFormData(e.target.value);
  };

  // Event handler for visibility checkbox
  const handleVisibilityChange = (e) => {
    setIsVisible(e.target.checked);
  };

  // Inside the render function
  const selectedTags = selected.length > 0 ? selected : [];

  // Clear form fields after successful submission
  const resetFrom = () => {
    setLangFormData("en");
    setPackageName("");
    setPackagePrice("");
    setSelected([]);
    setOfferedImage(null);
    setIsVisible(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("lang", langFormData);
    formData.append("package_name", packageName);
    formData.append("package_image", offeredImage);

    selectedTags.forEach((tag) => {
      formData.append("tags", tag);
    });

    formData.append("price", parseInt(packagePrice));
    formData.append("visible", isVisible);

    const { data } = await createOfferedMealPackage(formData);
    if (data?.status) {
      resetFrom();
      Swal.fire({
        icon: "success",
        title: data?.message[langCode],
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: data?.message[langCode],
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  // const langData =
  //   language?.adminDashboard?.manageOfferedMeals?.addOfferedMeals;
  return (
    <>
      <div className='container-fluid add-offered-meal-container'>
        {" "}
        {/* Page Title */}
        <div className='add_offered_meal_title '>
          <h2>{t("ManageOfferedMeals.AddOfferedMeals.pageTitle")}</h2>
        </div>
        {/* Main Content */}
        <div className='py-3'>
          <form onSubmit={handleSubmit}>
            <div className='row g-3 pt-4'>
              {/* language selection filed */}
              <div className='col-12'>
                <div className='show_per_page_section'>
                  <label className='m-1'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.languagePreference"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                    value={langFormData}
                    onChange={handleLanguageChange}>
                    <option value='ar'>العربية</option>
                    <option value='en'>English</option>
                  </select>
                </div>
              </div>

              {/* image field */}
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='offered_img_field  mb-2'>
                  <label htmlFor='offered_image'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.packageImages.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  {/* Image input field */}
                  <div
                    {...getOfferedImageRootProps()}
                    className='dropzone p-5 image_drop_zone form-control'
                    role='button'>
                    <input
                      id='offered_image'
                      {...getOfferedImageInputProps()}
                    />
                    {isOfferedImageDragActive ? (
                      <p className='text-center'>
                        {t(
                          "ManageOfferedMeals.AddOfferedMeals.inputs.packageImages.placeholder.one"
                        )}
                      </p>
                    ) : (
                      <p className='text-center'>
                        {t(
                          "ManageOfferedMeals.AddOfferedMeals.inputs.packageImages.placeholder.two"
                        )}
                      </p>
                    )}
                  </div>

                  {/* Image preview here */}
                  {offeredImage && (
                    <>
                      <p className='mt-3 mb-2'>
                        {t(
                          "ManageOfferedMeals.AddOfferedMeals.inputs.packageImages.previewImage"
                        )}
                      </p>
                      <div className='d-flex align-items-center'>
                        <div className='position-relative'>
                          <IoIosClose
                            className='position-absolute top-0 end-0 bg-danger text-white rounded fs-3'
                            data-toggle='tooltip'
                            data-placement='top'
                            role='button'
                            onClick={removeOfferedImage}
                            title='Remove the image'
                          />
                          <Image
                            width={250}
                            height={150}
                            alt='offered_image'
                            src={URL?.createObjectURL(offeredImage)}
                            alt={`Offered Meal Image Preview`}
                            className='preview-image rounded'
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* package name field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 package_name_fields'>
                  <label htmlFor='package_name'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.packageName.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    name='packageName'
                    id='package_name'
                    className='rounded form-control'
                    placeholder={t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.packageName.placeholder"
                    )}
                    value={packageName}
                    onChange={handlePackageNameChange}
                    required
                  />
                </div>
              </div>

              {/* tags field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 tags_fields'>
                  <label htmlFor='tags'>
                    {t("ManageOfferedMeals.AddOfferedMeals.inputs.tags.label")}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <TagsInput
                      name='tags'
                      id='tags'
                      value={selected}
                      onChange={setSelected}
                      className='form-control '
                      required
                      placeHolder={t(
                        "ManageOfferedMeals.AddOfferedMeals.inputs.tags.placeholder"
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* price field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 price_fields'>
                  <label htmlFor='price'>
                    {t("ManageOfferedMeals.AddOfferedMeals.inputs.price.label")}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='number'
                    name='price'
                    id='price'
                    className='rounded form-control'
                    placeholder={t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.price.placeholder"
                    )}
                    value={packagePrice}
                    onChange={handlePackagePriceChange}
                    required
                  />
                </div>
              </div>

              {/* visible checkbox */}
              <div className='col-lg-6 col-md-12 col-sm-12 pt-lg-4'>
                <div className='form-check form-switch mb-2 pt-lg-1'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    id='offered_meal_visible_checked'
                    checked={isVisible}
                    onChange={handleVisibilityChange}
                    required
                  />
                  <label
                    className='form-check-label'
                    htmlFor='offered_meal_visible_checked'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.visibleToUser.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <div className='col-lg-12 col-md-12 col-sm-12 mt-3'>
                <div className='d-flex justify-content-end'>
                  <button type='submit' className='btn btn-success'>
                    {t("ManageOfferedMeals.AddOfferedMeals.btnTxt2")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(CreatePackageForm), {
  ssr: false,
});
