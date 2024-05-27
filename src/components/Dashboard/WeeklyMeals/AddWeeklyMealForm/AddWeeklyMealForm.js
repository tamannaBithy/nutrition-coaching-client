/* eslint-disable react/jsx-no-duplicate-props */
"use client";
import moment from "moment";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Swal from "sweetalert2";
import { useGetAllWeeklyMealCategoriesQuery } from "../../../../../redux/features/queries/WEEKLY_MEAL_CATEGORIES_API ";
import { useCreateWeeklyMealMenuMutation } from "../../../../../redux/features/queries/WEEKLY_MEAL_MENU_API";
import "./AddWeeklyMealForm.css";

const AddWeeklyMealForm = () => {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();
  const [langFormData, setLangFormData] = useState(locale);

  const [createWeeklyMealMenu, { isLoading, isSuccess, isError, error, data }] =
    useCreateWeeklyMealMenuMutation();
  // Fetch meal preferences from the API
  const {
    data: weeklyMealCategories,
    error: weeklyMealCategoriesError,
    isLoading: weeklyMealCategoriesLoading,
  } = useGetAllWeeklyMealCategoriesQuery({ lang: locale });

  // State for meal form inputs
  const [selectedImages, setSelectedImages] = useState(null);
  const [nutritionFactsImage, setNutritionFactsImage] = useState(null);
  const [selected, setSelected] = useState([]);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [objWeek, setObjWeek] = useState({
    date: new Date(),
    dateFrom: null,
    dateTo: null,
    weekNumber: null,
  });

  // Handle date change in the Week Picker
  const onChange = (date) => {
    const weekNumber = moment(date).isoWeek();
    const dateFrom = moment(date).startOf("isoWeek").format("YYYY-MM-DD");
    const dateTo = moment(date).endOf("isoWeek").format("YYYY-MM-DD");

    setObjWeek({
      date,
      dateFrom,
      dateTo,
      weekNumber,
    });
  };

  // Render the selected date in a readable format
  const renderValue = (date) => {
    const weekNumber = moment(date).isoWeek();
    const year = moment(date).year();

    return `W${weekNumber}, ${year}`;
  };

  // Transform meal preferences data for Select component
  const category_options =
    weeklyMealCategories?.data?.map((categories) => ({
      value: categories?._id,
      label: categories?.weekly_meal_category,
    })) || [];

  // Calculate calories based on the formula: calories = (protein * 4) + (carbs * 4) + (fat * 9)
  const calories = protein * 4 + carbs * 4 + fat * 9;

  const [mealData, setMealData] = useState({
    lang: langFormData || "en",
    category: "",
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
    available_from: "",
    unavailable_from: "",
    visible: true,
  });

  // Function to handle language change
  const handleLangChange = (selectedLang) => {
    setLangFormData(selectedLang);
  };

  // Handle image drop for meal images
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 1) {
      alert(`${t("ManageWeeklyMeals.AddWeeklyMeals.alertMsg")}`);
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
      alert(`${t("ManageWeeklyMeals.AddWeeklyMeals.alertMsg")}`);
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

    // Update mealData state for images
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

  const resetForm = () => {
    setSelectedImages(null);
    setNutritionFactsImage(null);
    setSelected([]);
    setProtein(0);
    setCarbs(0);
    setFat(0);
    setObjWeek({
      date: new Date(),
      dateFrom: null,
      dateTo: null,
      weekNumber: null,
    });
    setMealData({
      lang: langFormData || "en",
      category: "",
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
      available_from: "",
      unavailable_from: "",
      visible: true,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("lang", langFormData);
    formData.append("category", mealData.category);
    // Append images
    formData.append("image", mealData.image);

    formData.append("meal_name", mealData.meal_name);
    formData.append("main_badge_tag", mealData.main_badge_tag);
    selectedTags.forEach((tag) => {
      formData.append("tags", tag);
    });

    formData.append("protein", parseInt(protein));
    formData.append("fat", parseInt(fat));
    formData.append("carbs", parseInt(carbs));
    formData.append("nutrition_facts", mealData.nutrition_facts_image);
    formData.append("ingredients", mealData.ingredients);
    formData.append("heating_instruction", mealData.heating_instruction);
    formData.append(
      "available_from",
      objWeek.dateFrom !== null ? objWeek.dateFrom : "default_value"
    );
    formData.append(
      "unavailable_from",
      objWeek.dateTo !== null ? objWeek.dateTo : "default_value"
    );
    formData.append("visible", mealData.visible);

    // the meal object to be submitted
    const { data } = await createWeeklyMealMenu(formData);
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
        title: data?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    }
    // Reset the form after successful submission
    resetForm();
  };

  return (
    <>
      <div className='container-fluid manage-add-main-meal-container'>
        {/* Page Title */}
        <div className='add_main_meal_title '>
          <h2>{t("ManageWeeklyMeals.AddWeeklyMeals.pageTitle")}</h2>
        </div>
        <div className='py-3'>
          <form onSubmit={handleSubmit}>
            <div className='row g-3 pt-4'>
              {/* Language Preference */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='show_per_page_section mb-2'>
                  <p className='mb-1'>
                    {t(
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.languagePreference"
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
              {/* category field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='select_category'>
                    {t(
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.selectCategory.label"
                    )}
                    <sup className='text-danger'>*</sup>{" "}
                  </label>
                  <Select
                    id='select_category'
                    name='category'
                    placeholder={t(
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.selectCategory.placeholder"
                    )}
                    required
                    options={category_options}
                    onChange={(selectedOption) =>
                      handleInputChange({
                        target: {
                          name: "category",
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
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.setMealImages.label"
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
                            "ManageWeeklyMeals.AddWeeklyMeals.inputs.setMealImages.placeholder.one"
                          )}{" "}
                          ...
                        </p>
                        <p className='text-center'>
                          {t(
                            "ManageWeeklyMeals.AddWeeklyMeals.inputs.setMealImages.placeholder.two"
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className='text-center'>
                          {t(
                            "ManageWeeklyMeals.AddWeeklyMeals.inputs.setMealImages.placeholder.three"
                          )}
                        </p>
                        <p className='text-center'>
                          {t(
                            "ManageWeeklyMeals.AddWeeklyMeals.inputs.setMealImages.placeholder.two"
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
                            "ManageWeeklyMeals.AddWeeklyMeals.inputs.setMealImages.previewImages"
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
                              alt={`Preview Image`}
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
                    {t(
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.mealName.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='text'
                      className='form-control'
                      name='meal_name'
                      id='meal_name'
                      required
                      value={mealData?.meal_name}
                      onChange={handleInputChange}
                      placeholder={t(
                        "ManageWeeklyMeals.AddWeeklyMeals.inputs.mealName.placeholder"
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* main badge tag field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='main_badge_tag'>
                    {t(
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.mealBadge.label"
                    )}
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='text'
                      className='form-control '
                      name='main_badge_tag'
                      id='main_badge_tag'
                      value={mealData?.main_badge_tag}
                      onChange={handleInputChange}
                      placeholder={t(
                        "ManageWeeklyMeals.AddWeeklyMeals.inputs.mealBadge.placeholder"
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* tags field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='tags'>
                    {t(
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.mealTags.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <TagsInput
                      value={selected}
                      onChange={setSelected}
                      name='tags'
                      id='tags'
                      className='form-control border-0 w-100'
                      required
                      placeHolder={t(
                        "ManageWeeklyMeals.AddWeeklyMeals.inputs.mealTags.placeholder"
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
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.proteinAmount.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='protein'
                      id='protein'
                      value={protein}
                      onChange={(e) => setProtein(parseFloat(e.target.value))}
                      onWheel={(e) => e.target.blur()}
                      placeholder={t(
                        "ManageWeeklyMeals.AddWeeklyMeals.inputs.proteinAmount.placeholder"
                      )}
                      required
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
                    {t(
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.fatAmount.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='fat'
                      id='fat'
                      value={fat}
                      onChange={(e) => setFat(parseFloat(e.target.value))}
                      onWheel={(e) => e.target.blur()}
                      required
                      placeholder={t(
                        "ManageWeeklyMeals.AddWeeklyMeals.inputs.fatAmount.placeholder"
                      )}
                    />
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
                    {t(
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.carbsAmount.label"
                    )}
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
                      onChange={(e) => setCarbs(parseFloat(e.target.value))}
                      onWheel={(e) => e.target.blur()}
                      placeholder={t(
                        "ManageWeeklyMeals.AddWeeklyMeals.inputs.carbsAmount.placeholder"
                      )}
                    />
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
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.caloriesAmount.label"
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
                        "ManageWeeklyMeals.AddWeeklyMeals.inputs.caloriesAmount.placeholder"
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
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.nutritionFactsImage.label"
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
                        {t(
                          "ManageWeeklyMeals.AddWeeklyMeals.inputs.nutritionFactsImage.placeholder.one"
                        )}{" "}
                        ...
                      </p>
                    ) : (
                      <p className='text-center'>
                        {t(
                          "ManageWeeklyMeals.AddWeeklyMeals.inputs.nutritionFactsImage.placeholder.two"
                        )}
                      </p>
                    )}
                  </div>
                  {nutritionFactsImage && (
                    <>
                      <p className='mt-3 mb-2'>
                        {t(
                          "ManageWeeklyMeals.AddWeeklyMeals.inputs.nutritionFactsImage.previewImage"
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
                    {t(
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.ingredients.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <textarea
                      type='text'
                      className='form-control '
                      name='ingredients'
                      id='ingredients'
                      value={mealData?.ingredients}
                      placeholder={t(
                        "ManageWeeklyMeals.AddWeeklyMeals.inputs.ingredients.placeholder"
                      )}
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
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.heatingInstruction.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>

                  <div className='d-flex align-items-center input_fields_area rounded'>
                    <textarea
                      type='text'
                      className='form-control '
                      name='heating_instruction'
                      id='heating_instruction'
                      value={mealData?.heating_instruction}
                      placeholder={t(
                        "ManageWeeklyMeals.AddWeeklyMeals.inputs.heatingInstruction.placeholder"
                      )}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* available from and unavailable from date field*/}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 input_fields'>
                  <label htmlFor='week_select'>
                    {t(
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.enterMealAvailability.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className='d-flex align-items-center input_fields_area rounded'>
                      {/* Week pick calendar */}
                      <DatePicker
                        placeholder={t(
                          "ManageWeeklyMeals.AddWeeklyMeals.inputs.enterMealAvailability.placeholder"
                        )}
                        isoWeek
                        className='rounded'
                        id='week_select'
                        showWeekNumbers
                        value={objWeek.date}
                        onChange={onChange}
                        renderValue={renderValue}
                        required
                      />
                    </div>
                    <div className='col'>
                      <div className='weekInfos'>
                        {objWeek?.dateFrom !== null && (
                          <div>
                            <span>
                              {t(
                                "ManageWeeklyMeals.AddWeeklyMeals.inputs.enterMealAvailability.available"
                              )}
                              :{" "}
                            </span>
                            <b>{objWeek?.dateFrom}</b>
                          </div>
                        )}

                        {objWeek?.dateTo !== null && (
                          <div>
                            <span>
                              {t(
                                "ManageWeeklyMeals.AddWeeklyMeals.inputs.enterMealAvailability.unavailable"
                              )}
                              :{" "}
                            </span>
                            <b>{objWeek?.dateTo}</b>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* visible */}
              <div className='col-lg-2 col-md-12 col-sm-12 pt-4'>
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
                      "ManageWeeklyMeals.AddWeeklyMeals.inputs.visibleToUser.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                </div>
              </div>

              {/* submit button */}
              <div className=' add_weekly_meal_btn py-3 d-flex align-items-center w-100 justify-content-center'>
                <input
                  type='submit'
                  className='p-2 w-25'
                  value={t("ManageWeeklyMeals.AddWeeklyMeals.btnTxt")}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(AddWeeklyMealForm), {
  ssr: false,
});
