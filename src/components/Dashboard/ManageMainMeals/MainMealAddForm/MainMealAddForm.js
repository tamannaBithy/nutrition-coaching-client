/* eslint-disable react/jsx-no-duplicate-props */
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";
import "rsuite/dist/rsuite.min.css";
import Swal from "sweetalert2";
import { useCreateMainMealMenuMutation } from "../../../../../redux/features/queries/MAIN_MEAL_MENU_API";
import { useGetAllMealPreferencesQuery } from "../../../../../redux/features/queries/MEAL_PREFERENCE_API";
import { useGetAllMealTypesQuery } from "../../../../../redux/features/queries/MEAL_TYPES_API";
import "./MainMealAddForm.css";

export default function MainMealAddForm() {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();
  const [language, setLanguage] = useState(null);
  const [langFormData, setLangFormData] = useState("en");

  const [createMainMealMenu, { isSuccess, isError, data }] =
    useCreateMainMealMenuMutation();
  // Fetch meal preferences from the API
  const {
    data: preferences,
    error: preferenceError,
    isLoading: preferenceLoading,
  } = useGetAllMealPreferencesQuery({ lang: locale });

  // Fetch meal types from the API
  const {
    data: typeOfMeals,
    error: typeOfMealsError,
    isLoading: typeOfMealsLoading,
  } = useGetAllMealTypesQuery({ lang: locale });

  // State for meal form inputs
  const [selectedImages, setSelectedImages] = useState(null);
  const [nutritionFactsImage, setNutritionFactsImage] = useState(null);
  const [selected, setSelected] = useState([]);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);

  // Transform meal preferences data for Select component
  const pref_options =
    preferences?.data?.map((preference) => ({
      value: preference?._id,
      label: preference?.preference,
    })) || [];

  // Transform meal types data for Select component
  const typesOfMeal_options =
    typeOfMeals?.data?.map((mealType) => ({
      value: mealType?._id,
      label: mealType?.type_of_meal,
    })) || [];

  // Calculate calories based on the formula: calories = (protein * 4) + (carbs * 4) + (fat * 9)
  const calories = protein * 4 + carbs * 4 + fat * 9;

  const [mealData, setMealData] = useState({
    lang: langFormData || "en",
    preference: "",
    type_of_meal: "",
    image: null,
    meal_name: "",
    main_badge_tag: "",
    tags: [],
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0,
    nutrition_facts: null,
    ingredients: "",
    heating_instruction: "",
    old_price: 0,
    regular_price: 0,
    visible: true,
  });

  // Function to handle language change
  const handleLangChange = (selectedLang) => {
    setLangFormData(selectedLang);
  };

  // Handle image drop for meal images
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 1) {
      alert(t("ManageMainMeals.AddMainMeals.alert.one"));
      return;
    }

    // Set the selected image in the state
    setSelectedImages(acceptedFiles[0]);

    // Update mealData state for images
    setMealData((prevData) => ({
      ...prevData,
      image: acceptedFiles[0],
    }));
  };

  // Handle image drop for nutrition facts image
  const onNutritionFactsImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setNutritionFactsImage(acceptedFiles[0]);

      // Update mealData state for nutrition facts image
      setMealData((prevData) => ({
        ...prevData,
        nutrition_facts_image: acceptedFiles[0],
      }));
    } else {
      alert(t("ManageMainMeals.AddMainMeals.alert.two"));
    }
  };

  // Configure dropzone for nutrition facts image
  const {
    getRootProps: getNutritionFactsImageRootProps,
    getInputProps: getNutritionFactsImageInputProps,
    isDragActive: isNutritionFactsImageDragActive,
  } = useDropzone({
    onDrop: onNutritionFactsImageDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  // Configure dropzone for meal images
  const {
    getRootProps: getMealImagesRootProps,
    getInputProps: getMealImagesInputProps,
    isDragActive: isMealImagesDragActive,
  } = useDropzone({
    onDrop: onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  // Remove an image from the selected images
  const removeImage = () => {
    setSelectedImages(null);
    // Update mealData state for nutrition facts image
    setMealData((prevData) => ({
      ...prevData,
      image: null,
    }));
  };

  // Remove the nutrition facts image
  const removeNutritionFactsImage = () => {
    setNutritionFactsImage(null);

    // Update mealData state for nutrition facts image
    setMealData((prevData) => ({
      ...prevData,
      nutrition_facts_image: null,
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Parse numbers for price fields
    const parsedValue = type === "number" ? parseFloat(value) : value;

    // Update mealData state
    setMealData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  // Inside the render function
  const selectedTags = selected.length > 0 ? selected : [];

  //reset form after submission form
  // Reset function
  const resetForm = () => {
    setMealData({
      lang: langFormData || "en",
      preference: "",
      type_of_meal: "",
      image: null,
      meal_name: "",
      main_badge_tag: "",
      tags: [],
      protein: 0,
      fat: 0,
      carbs: 0,
      calories: 0,
      nutrition_facts: null,
      ingredients: "",
      heating_instruction: "",
      old_price: 0,
      regular_price: 0,
      visible: true,
    });
    setSelectedImages(null);
    setNutritionFactsImage(null);
    setSelected([]);
    setProtein(0);
    setFat(0);
    setCarbs(0);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append each field to the FormData object
    formData.append("lang", langFormData);
    formData.append("preference", mealData.preference);
    formData.append("type_of_meal", mealData.type_of_meal);

    // Append images

    formData.append(`image`, mealData.image); // Append each image individually

    formData.append("meal_name", mealData.meal_name);
    formData.append("main_badge_tag", mealData.main_badge_tag);
    selectedTags.forEach((tag, index) => {
      formData.append("tags", tag);
    });
    formData.append("protein", protein);
    formData.append("fat", fat);
    formData.append("carbs", carbs);
    formData.append("nutrition_facts", mealData.nutrition_facts_image);
    formData.append("ingredients", mealData.ingredients);
    formData.append("heating_instruction", mealData.heating_instruction);
    formData.append("old_price", mealData.old_price);
    formData.append("regular_price", mealData.regular_price);
    formData.append("visible", mealData.visible);

    /* Submitting the form data by rtk */
    const { data } = await createMainMealMenu(formData);

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
  };

  // const langData = language?.adminDashboard?.manageMainMeals?.addMainMeals;
  return (
    <>
      <div className='container-fluid manage-add-main-meal-container'>
        {/* Page Title */}
        <div className='add_main_meal_title '>
          <h2>{t("ManageMainMeals.AddMainMeals.pageTitle")}</h2>
        </div>

        {/* Main Content */}
        <div className='py-3'>
          <form onSubmit={handleSubmit}>
            <div className='row g-3 pt-4'>
              {/* language preference */}
              <div className='col-12'>
                <div className='show_per_page_section'>
                  <p className='m-1'>
                    {t(
                      "ManageMainMeals.AddMainMeals.inputs.languagePreference"
                    )}
                  </p>
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
              </div>

              {/* preference field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='select_pref'>
                    {t(
                      "ManageMainMeals.AddMainMeals.inputs.selectPreference.label"
                    )}
                    <sup className='text-danger'>*</sup>{" "}
                  </label>
                  <Select
                    id='select_pref'
                    name='preference'
                    placeholder={t(
                      "ManageMainMeals.AddMainMeals.inputs.selectPreference.placeholder"
                    )}
                    required
                    options={pref_options}
                    onChange={(selectedOption) =>
                      handleInputChange({
                        target: {
                          name: "preference",
                          value: selectedOption.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              {/* type of meal field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='meal_type'>
                    {t("ManageMainMeals.AddMainMeals.inputs.typeOfMeals.label")}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <Select
                    id='meal_type'
                    name='type_of_meal'
                    required
                    placeholder={t(
                      "ManageMainMeals.AddMainMeals.inputs.typeOfMeals.placeholder"
                    )}
                    options={typesOfMeal_options}
                    onChange={(selectedOption) =>
                      handleInputChange({
                        target: {
                          name: "type_of_meal",
                          value: selectedOption.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              {/* images field */}
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='mb-2 set_images_field'>
                  <label htmlFor='images'>
                    {t(
                      "ManageMainMeals.AddMainMeals.inputs.setMealImages.label"
                    )}
                  </label>
                  <div
                    {...getMealImagesRootProps()}
                    className='dropzone p-5 image_drop_zone form-control'
                    role='button'>
                    <input id='images' {...getMealImagesInputProps()} />
                    {isMealImagesDragActive ? (
                      <>
                        <p className='text-center'>
                          {t(
                            "ManageMainMeals.AddMainMeals.inputs.setMealImages.placeholder.one"
                          )}
                          ...
                        </p>
                        <p className='text-center'>
                          {t(
                            "ManageMainMeals.AddMainMeals.inputs.setMealImages.placeholder.two"
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className='text-center'>
                          {t(
                            "ManageMainMeals.AddMainMeals.inputs.setMealImages.placeholder.three"
                          )}
                        </p>
                        <p className='text-center'>
                          {t(
                            "ManageMainMeals.AddMainMeals.inputs.setMealImages.placeholder.two"
                          )}
                        </p>
                      </>
                    )}
                  </div>

                  <div>
                    {selectedImages && (
                      <>
                        <p className='mt-3 mb-2'>
                          {t(
                            "ManageMainMeals.AddMainMeals.inputs.setMealImages.previewImages"
                          )}
                        </p>
                        <div className='d-flex flex-wrap align-items-center gap-2'>
                          <div className='position-relative'>
                            <IoIosClose
                              className='position-absolute top-0 end-0 bg-danger text-white rounded fs-3'
                              data-toggle='tooltip'
                              data-placement='top'
                              role='button'
                              onClick={removeImage}
                              title='Remove the image'
                            />
                            <Image
                              width={200}
                              height={150}
                              alt='meal_image'
                              src={URL?.createObjectURL(selectedImages)}
                              alt={`Preview `}
                              className='preview-image rounded'
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* meal name field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='meal_name'>
                    {t("ManageMainMeals.AddMainMeals.inputs.mealName.label")}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='text'
                      className='form-control border-0'
                      name='meal_name'
                      id='meal_name'
                      required
                      value={mealData?.meal_name}
                      onChange={handleInputChange}
                      placeholder={t(
                        "ManageMainMeals.AddMainMeals.inputs.mealName.placeholder"
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* main badge tag field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='main_badge_tag'>
                    {t("ManageMainMeals.AddMainMeals.inputs.mealBadge.label")}
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='text'
                      className='form-control border-0'
                      name='main_badge_tag'
                      id='main_badge_tag'
                      value={mealData?.main_badge_tag}
                      onChange={handleInputChange}
                      placeholder={t(
                        "ManageMainMeals.AddMainMeals.inputs.mealBadge.placeholder"
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* tags field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='tags'>
                    {t("ManageMainMeals.AddMainMeals.inputs.mealTags.label")}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center tag_fields_area rounded'>
                    <TagsInput
                      value={selected}
                      onChange={setSelected}
                      name='tags'
                      id='tags'
                      className='form-control border-0 w-100'
                      required
                      placeHolder={t(
                        "ManageMainMeals.AddMainMeals.inputs.mealTags.placeholder"
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* protein field*/}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='protein'>
                    {t(
                      "ManageMainMeals.AddMainMeals.inputs.proteinAmount.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      className='form-control border-0'
                      type='number'
                      name='protein'
                      id='protein'
                      required
                      value={protein}
                      onChange={(e) => setProtein(e.target.value)}
                      onWheel={(e) => e.target.blur()}
                      placeholder={t(
                        "ManageMainMeals.AddMainMeals.inputs.proteinAmount.placeholder"
                      )}
                    />
                    <div className='p-2 bg-dark text-white border rounded-end'>
                      G
                    </div>
                  </div>
                </div>
              </div>

              {/* fat field*/}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='fat'>
                    {t("ManageMainMeals.AddMainMeals.inputs.fatAmount.label")}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='fat'
                      id='fat'
                      required
                      value={fat}
                      onChange={(e) => setFat(e.target.value)}
                      onWheel={(e) => e.target.blur()}
                      placeholder={t(
                        "ManageMainMeals.AddMainMeals.inputs.fatAmount.placeholder"
                      )}></input>
                    <div className='p-2 bg-dark text-white border rounded-end'>
                      G
                    </div>
                  </div>
                </div>
              </div>

              {/* carbs field*/}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='carbs'>
                    {t("ManageMainMeals.AddMainMeals.inputs.carbsAmount.label")}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='carbs'
                      id='carbs'
                      required
                      value={carbs}
                      onChange={(e) => setCarbs(e.target.value)}
                      onWheel={(e) => e.target.blur()}
                      placeholder={t(
                        "ManageMainMeals.AddMainMeals.inputs.carbsAmount.placeholder"
                      )}></input>
                    <div className='p-2 bg-dark text-white border rounded-end'>
                      G
                    </div>
                  </div>
                </div>
              </div>

              {/* calories field*/}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='calories'>
                    {t(
                      "ManageMainMeals.AddMainMeals.inputs.caloriesAmount.label"
                    )}
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='calories'
                      id='calories'
                      disabled
                      value={calories}
                      placeholder={t(
                        "ManageMainMeals.AddMainMeals.inputs.caloriesAmount.placeholder"
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Nutrition Facts Image */}
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='mb-2 set_images_field'>
                  <label htmlFor='nutrition_facts_image'>
                    {t(
                      "ManageMainMeals.AddMainMeals.inputs.nutritionFactsImage.label"
                    )}
                  </label>
                  <div
                    {...getNutritionFactsImageRootProps()}
                    className='dropzone p-5 image_drop_zone form-control'
                    role='button'>
                    <input
                      id='nutrition_facts_image'
                      {...getNutritionFactsImageInputProps()}
                    />
                    {isNutritionFactsImageDragActive ? (
                      <p className='text-center'>
                        {" "}
                        {t(
                          "ManageMainMeals.AddMainMeals.inputs.nutritionFactsImage.placeholder.one"
                        )}
                        ...
                      </p>
                    ) : (
                      <p className='text-center'>
                        {t(
                          "ManageMainMeals.AddMainMeals.inputs.nutritionFactsImage.placeholder.two"
                        )}
                      </p>
                    )}
                  </div>
                  {nutritionFactsImage && (
                    <>
                      <p className='mt-3 mb-2'>
                        {t(
                          "ManageMainMeals.AddMainMeals.inputs.nutritionFactsImage.previewImage"
                        )}
                      </p>
                      <div className='d-flex align-items-center'>
                        <div className='position-relative'>
                          <IoIosClose
                            className='position-absolute top-0 end-0 bg-danger text-white rounded fs-3'
                            data-toggle='tooltip'
                            data-placement='top'
                            role='button'
                            onClick={removeNutritionFactsImage}
                            title='Remove the image'
                          />
                          <Image
                            width={200}
                            height={200}
                            alt='nutrition_facts_image'
                            src={URL?.createObjectURL(nutritionFactsImage)}
                            alt={`Nutrition Facts Preview`}
                            className='preview-image rounded'
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ingredients text field */}
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='ingredients'>
                    {t("ManageMainMeals.AddMainMeals.inputs.ingredients.label")}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <textarea
                      type='text'
                      className='form-control border-0'
                      name='ingredients'
                      id='ingredients'
                      placeholder={t(
                        "ManageMainMeals.AddMainMeals.inputs.ingredients.placeholder"
                      )}
                      value={mealData?.ingredients}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* heating instruction text field */}
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='heating_instruction'>
                    {t(
                      "ManageMainMeals.AddMainMeals.inputs.heatingInstruction.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>

                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <textarea
                      type='text'
                      className='form-control border-0'
                      name='heating_instruction'
                      id='heating_instruction'
                      placeholder={t(
                        "ManageMainMeals.AddMainMeals.inputs.heatingInstruction.placeholder"
                      )}
                      value={mealData?.heating_instruction}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* old price field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='old_price'>
                    {t("ManageMainMeals.AddMainMeals.inputs.oldPrice.label")}
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='old_price'
                      id='old_price'
                      defaultValue={mealData?.old_price || 0}
                      placeholder={t(
                        "ManageMainMeals.AddMainMeals.inputs.oldPrice.placeholder"
                      )}
                      onChange={handleInputChange}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                </div>
              </div>

              {/* regular price field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='regular_price'>
                    {t(
                      "ManageMainMeals.AddMainMeals.inputs.regularPrice.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='regular_price'
                      id='regular_price'
                      placeholder={t(
                        "ManageMainMeals.AddMainMeals.inputs.regularPrice.placeholder"
                      )}
                      value={mealData?.regular_price}
                      onChange={handleInputChange}
                      onWheel={(e) => e.target.blur()}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* visible */}
              <div className='col-lg-12 col-md-12 col-sm-12 pt-4'>
                <div className='form-check form-switch pt-2'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='flexSwitchCheckChecked'
                    name='visible'
                    defaultChecked={mealData.visible}
                    onChange={(e) =>
                      setMealData((prevData) => ({
                        ...prevData,
                        visible: e.target.checked,
                      }))
                    }
                  />
                  <label
                    className='form-check-label'
                    htmlFor='flexSwitchCheckChecked'>
                    {t(
                      "ManageMainMeals.AddMainMeals.inputs.visibleToUser.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <div className=' add_main_meal_btn py-3 d-flex align-items-center w-100 justify-content-center'>
                <input
                  type='submit'
                  className=' p-2  w-25'
                  value={t("ManageMainMeals.AddMainMeals.btnTxt")}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
