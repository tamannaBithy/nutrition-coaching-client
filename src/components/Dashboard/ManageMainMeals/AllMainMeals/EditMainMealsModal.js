import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import { useUpdateMainMealMenuMutation } from "../../../../../redux/features/queries/MAIN_MEAL_MENU_API";
import { useGetAllMealPreferencesQuery } from "../../../../../redux/features/queries/MEAL_PREFERENCE_API";
import { useGetAllMealTypesQuery } from "../../../../../redux/features/queries/MEAL_TYPES_API";
import "./EditMainMealsModal.css";

const EditMainMealsModal = ({ mealData, onFormSubmit }) => {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();
  const [language, setLanguage] = useState(null);
  const [selectedLang, setSelectedLang] = useState(locale);
  // State for meal form inputs
  const [selectedImages, setSelectedImages] = useState("");
  const [nutritionFactsImage, setNutritionFactsImage] = useState("");
  // State for selected preference and type of meal
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [selectedTypeOfMeal, setSelectedTypeOfMeal] = useState({
    _id: "",
    value: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [updateMainMealMenu, { data: updateMainMealMenuData, isSuccess }] =
    useUpdateMainMealMenuMutation();
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

  // Use useEffect to update state when preferenceMeal changes
  useEffect(() => {
    if (mealData) {
      setNutritionFactsImage(mealData?.nutrition_facts || "");
      setSelectedImages(mealData?.image || "");
      setIsVisible(mealData?.visible || false);
      setSelectedLang(mealData?.lang || "en");
      if (mealData?.preference?._id) {
        setSelectedPreference(mealData?.preference);
      }
      if (mealData?.type_of_meal) {
        setSelectedTypeOfMeal({
          _id: mealData?.type_of_meal?._id,
          value: mealData?.type_of_meal?.value,
        });
      }
    }
  }, [mealData]);

  // Function to handle visibility change
  const handleVisibilityChange = (e) => {
    setIsVisible(e.target.checked);
  };

  const handleSelectedLang = (e) => {
    setSelectedLang(e.target.value);
  };

  const [formData, setFormData] = useState({
    lang: selectedLang || "en",
    preference: "",
    type_of_meal: "",
    meal_name: "",
    image: "",
    main_badge_tag: "",
    nutrition_facts: "",
    tags: [],
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0,
    ingredients: "",
    heating_instruction: "",
    old_price: 0,
    regular_price: 0,
    visible: true,
  });

  // Handle image drop for meal images
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      alert(t("ManageMainMeals.AllMainMeals.alert.one"));
      return;
    }

    setSelectedImages(acceptedFiles[0]);

    // Update mealData state for images
    setFormData((prevData) => ({
      ...prevData,
      image: acceptedFiles[0],
    }));
  };

  // Handle image drop for nutrition facts image
  const onNutritionFactsImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setNutritionFactsImage(acceptedFiles[0]);

      // Update mealData state for nutrition facts image
      setFormData((prevData) => ({
        ...prevData,
        nutrition_facts: acceptedFiles[0],
      }));
    } else {
      alert(t("ManageMainMeals.AllMainMeals.alert.two"));
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
    setFormData((prevData) => ({
      ...prevData,
      images: "",
    }));
  };

  // Remove the nutrition facts image
  const removeNutritionFactsImage = () => {
    setNutritionFactsImage(null);

    // Update mealData state for nutrition facts image
    setFormData((prevData) => ({
      ...prevData,
      nutrition_facts_image: null,
    }));
  };

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    // Calculate calories
    if (name === "protein" || name === "carbs" || name === "fat") {
      const { protein, carbs, fat } = updatedFormData;
      updatedFormData = {
        ...updatedFormData,
        calories: protein * 4 + carbs * 4 + fat * 9,
      };
    }

    setFormData(updatedFormData);
  };

  // Function to handle tag changes
  const handleTagChange = (tags) => {
    setFormData({
      ...formData,
      tags,
    });
  };

  // Inside the render function
  const selectedTags = formData?.tags?.length > 0 ? formData?.tags : [];

  // Handle form submission
  const handleEditMealSubmit = (e) => {
    e.preventDefault();
    const mealFormData = new FormData();

    mealFormData.append("lang", formData.lang);
    if (selectedPreference && selectedPreference._id) {
      mealFormData.append("preference", selectedPreference._id);
    } else if (preferences?.data?.[0]?._id) {
      mealFormData.append("preference", preferences.data[0]._id);
    }
    if (selectedTypeOfMeal && selectedTypeOfMeal._id) {
      mealFormData.append("type_of_meal", selectedTypeOfMeal._id);
    } else if (type_of_meal?.data?.[0]?._id) {
      mealFormData.append("type_of_meal", type_of_meal?.data[0]._id);
    }

    mealFormData.append("meal_name", formData.meal_name);
    mealFormData.append("main_badge_tag", formData.main_badge_tag);
    mealFormData.append("protein", formData.protein);
    mealFormData.append("fat", formData.fat);
    mealFormData.append("carbs", formData.carbs);
    mealFormData.append("ingredients", formData.ingredients);
    mealFormData.append("heating_instruction", formData.heating_instruction);
    mealFormData.append("old_price", formData.old_price);
    mealFormData.append("regular_price", formData.regular_price);
    selectedTags.forEach((tag, index) => {
      mealFormData.append("tags", tag);
    });

    mealFormData.append("visible", formData.visible);
    // Append images
    mealFormData.append("image", formData.image);

    //Call the UPDATE API
    updateMainMealMenu({
      id: mealData?._id,
      data: mealFormData,
    }).then(() => {
      if (isSuccess) {
        Swal.fire({
          text: updateMainMealMenuData?.message[locale],
          icon: "success",
        });
      }
      onFormSubmit();
    });
  };

  return (
    <div
      className="modal editMainMealsModal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog d-flex align-items-center bg-transparent">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {t("ManageMainMeals.AllMainMeals.inputs.editMainMealsTitle")}
            </h5>
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
                <form onSubmit={handleEditMealSubmit}>
                  <div className="row g-3 pt-4">
                    {/* Language Preference */}
                    <div className="show_per_page_section">
                      <p className="m-1">
                        {" "}
                        {t(
                          "ManageMainMeals.AllMainMeals.inputs.languagePreference"
                        )}
                      </p>
                      {/* Select for how many data per page */}
                      <select
                        onChange={handleSelectedLang}
                        value={selectedLang}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="select_pref">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.selectPreference.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <Select
                          id="select_pref"
                          name="preference"
                          value={
                            selectedPreference
                              ? {
                                  label: selectedPreference.value,
                                  value: selectedPreference._id,
                                }
                              : null
                          }
                          onChange={(selectedOption) => {
                            setSelectedPreference({
                              _id: selectedOption.value,
                              value: selectedOption.label,
                            });
                            setFormData((prevData) => ({
                              ...prevData,
                              preference: selectedOption.value,
                            }));
                          }}
                          options={pref_options}
                          placeholder={t(
                            "ManageMainMeals.AllMainMeals.inputs.selectPreference.placeholder"
                          )}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="meal_type">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.typeOfMeals.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <Select
                          value={
                            selectedTypeOfMeal
                              ? {
                                  label: selectedTypeOfMeal.value,
                                  value: selectedTypeOfMeal._id,
                                }
                              : null
                          }
                          onChange={(selectedOption) => {
                            setSelectedTypeOfMeal({
                              _id: selectedOption.value,
                              value: selectedOption.label,
                            });
                            setFormData((prevData) => ({
                              ...prevData,
                              type_of_meal: selectedOption.value,
                            }));
                          }}
                          options={typesOfMeal_options}
                          placeholder={t(
                            "ManageMainMeals.AllMainMeals.inputs.typeOfMeals.placeholder"
                          )}
                          required
                        />
                      </div>
                    </div>
                    {/* images field */}
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="mb-2 set_images_field">
                        <label htmlFor="images">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.setMealImages.label"
                          )}
                        </label>
                        <div
                          {...getMealImagesRootProps()}
                          className="dropzone p-5 image_drop_zone form-control"
                          role="button"
                        >
                          <input id="images" {...getMealImagesInputProps()} />
                          {isMealImagesDragActive ? (
                            <>
                              <p className="text-center">
                                {t(
                                  "ManageMainMeals.AllMainMeals.inputs.setMealImages.placeholder.one"
                                )}
                                ...
                              </p>
                              <p className="text-center">
                                {t(
                                  "ManageMainMeals.AllMainMeals.inputs.setMealImages.placeholder.two"
                                )}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="text-center">
                                {t(
                                  "ManageMainMeals.AllMainMeals.inputs.setMealImages.placeholder.three"
                                )}
                              </p>
                              <p className="text-center">
                                {t(
                                  "ManageMainMeals.AllMainMeals.inputs.setMealImages.placeholder.two"
                                )}
                              </p>
                            </>
                          )}
                        </div>

                        <div>
                          {selectedImages && (
                            <>
                              <p className="mt-3 mb-2">
                                {t(
                                  "ManageMainMeals.AllMainMeals.inputs.setMealImages.previewImages"
                                )}
                              </p>
                              <div className="d-flex flex-wrap align-items-center gap-2">
                                <div className="position-relative">
                                  <IoIosClose
                                    className="position-absolute top-0 end-0 bg-danger text-white rounded fs-3"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    role="button"
                                    onClick={removeImage}
                                    title="Remove the image"
                                  />
                                  <Image
                                    width={200}
                                    height={150}
                                    src={
                                      selectedImages instanceof File
                                        ? URL.createObjectURL(selectedImages)
                                        : `http://localhost:8000${selectedImages}`
                                    }
                                    alt={`Preview`}
                                    className="preview-image rounded"
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="meal_name">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.mealName.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <div className="d-flex align-items-center input_fields_area rounded">
                          <input
                            type="text"
                            className="form-control border-0"
                            name="meal_name"
                            id="meal_name"
                            value={formData.meal_name}
                            onChange={handleInputChange}
                            required
                            placeholder={t(
                              "ManageMainMeals.AllMainMeals.inputs.mealName.placeholder"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="main_badge_tag">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.mealBadge.label"
                          )}
                        </label>
                        <div className="d-flex align-items-center input_fields_area rounded">
                          <input
                            type="text"
                            className="form-control border-0"
                            name="main_badge_tag"
                            id="main_badge_tag"
                            value={formData.main_badge_tag}
                            onChange={handleInputChange}
                            placeholder={t(
                              "ManageMainMeals.AllMainMeals.inputs.mealBadge.placeholder"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="tags">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.mealTags.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <div className="d-flex align-items-center tag_fields_area rounded">
                          <TagsInput
                            value={formData.tags}
                            onChange={handleTagChange}
                            name="tags"
                            id="tags"
                            className="form-control border-0 w-100"
                            required
                            placeHolder={t(
                              "ManageMainMeals.AllMainMeals.inputs.mealTags.placeholder"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="protein">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.proteinAmount.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <div className="d-flex align-items-center input_fields_area rounded">
                          <input
                            type="number"
                            className="form-control border-0"
                            name="protein"
                            id="protein"
                            value={formData.protein}
                            onChange={handleInputChange}
                            required
                            placeholder={t(
                              "ManageMainMeals.AllMainMeals.inputs.proteinAmount.placeholder"
                            )}
                          />
                          <div className="p-2 bg-dark text-white border rounded-end">
                            G
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="fat">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.fatAmount.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <div className="d-flex align-items-center input_fields_area rounded">
                          <input
                            type="number"
                            className="form-control border-0"
                            name="fat"
                            id="fat"
                            value={formData.fat}
                            onChange={handleInputChange}
                            required
                            placeholder={t(
                              "ManageMainMeals.AllMainMeals.inputs.fatAmount.placeholder"
                            )}
                          />
                          <div className="p-2 bg-dark text-white border rounded-end">
                            G
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="carbs">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.carbsAmount.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <div className="d-flex align-items-center input_fields_area rounded">
                          <input
                            type="number"
                            className="form-control border-0"
                            name="carbs"
                            id="carbs"
                            value={formData.carbs}
                            onChange={handleInputChange}
                            required
                            placeholder={t(
                              "ManageMainMeals.AllMainMeals.inputs.carbsAmount.placeholder"
                            )}
                          />
                          <div className="p-2 bg-dark text-white border rounded-end">
                            G
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="calories">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.caloriesAmount.label"
                          )}
                        </label>
                        <div className="d-flex align-items-center input_fields_area rounded">
                          <input
                            type="number"
                            className="form-control border-0"
                            name="calories"
                            id="calories"
                            value={formData.calories}
                            onChange={handleInputChange}
                            disabled
                            placeholder={t(
                              "ManageMainMeals.AllMainMeals.inputs.caloriesAmount.placeholder"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Nutrition Facts Image */}
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="mb-2 set_images_field">
                        <label htmlFor="nutrition_facts_image">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.nutritionFactsImage.label"
                          )}
                        </label>
                        <div
                          {...getNutritionFactsImageRootProps()}
                          className="dropzone p-5 image_drop_zone form-control"
                          role="button"
                        >
                          <input
                            id="nutrition_facts_image"
                            {...getNutritionFactsImageInputProps()}
                          />
                          {isNutritionFactsImageDragActive ? (
                            <p className="text-center">
                              {t(
                                "ManageMainMeals.AllMainMeals.inputs.nutritionFactsImage.placeholder.one"
                              )}
                              ...
                            </p>
                          ) : (
                            <p className="text-center">
                              {t(
                                "ManageMainMeals.AllMainMeals.inputs.nutritionFactsImage.placeholder.two"
                              )}
                            </p>
                          )}
                        </div>
                        {nutritionFactsImage && (
                          <>
                            <p className="mt-3 mb-2">
                              {t(
                                "ManageMainMeals.AllMainMeals.inputs.nutritionFactsImage.previewImage"
                              )}
                            </p>
                            <div className="d-flex align-items-center">
                              <div className="position-relative">
                                <IoIosClose
                                  className="position-absolute top-0 end-0 bg-danger text-white rounded fs-3"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  role="button"
                                  onClick={removeNutritionFactsImage}
                                  title="Remove the image"
                                />
                                <Image
                                  width={200}
                                  height={200}
                                  src={
                                    nutritionFactsImage instanceof File
                                      ? URL.createObjectURL(nutritionFactsImage)
                                      : `http://localhost:8000${nutritionFactsImage}`
                                  }
                                  alt={`Nutrition Facts Preview`}
                                  className="preview-image rounded"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="ingredients">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.ingredients.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <div className="d-flex align-items-center input_fields_area rounded">
                          <textarea
                            type="text"
                            className="form-control border-0"
                            name="ingredients"
                            id="ingredients"
                            value={formData.ingredients}
                            onChange={handleInputChange}
                            placeholder={t(
                              "ManageMainMeals.AllMainMeals.inputs.ingredients.placeholder"
                            )}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="heating_instruction">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.heatingInstruction.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <div className="d-flex align-items-center input_fields_area rounded">
                          <textarea
                            type="text"
                            className="form-control border-0"
                            name="heating_instruction"
                            id="heating_instruction"
                            value={formData.heating_instruction}
                            onChange={handleInputChange}
                            placeholder={t(
                              "ManageMainMeals.AllMainMeals.inputs.heatingInstruction.placeholder"
                            )}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="old_price">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.oldPrice.label"
                          )}
                        </label>
                        <div className="d-flex align-items-center input_fields_area rounded">
                          <input
                            type="number"
                            className="form-control border-0"
                            name="old_price"
                            id="old_price"
                            value={formData.old_price}
                            onChange={handleInputChange}
                            placeholder={t(
                              "ManageMainMeals.AllMainMeals.inputs.oldPrice.placeholder"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="mb-2 input_fields">
                        <label htmlFor="regular_price">
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.regularPrice.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                        <div className="d-flex align-items-center input_fields_area rounded">
                          <input
                            type="number"
                            className="form-control border-0"
                            name="regular_price"
                            id="regular_price"
                            value={formData.regular_price}
                            onChange={handleInputChange}
                            placeholder={t(
                              "ManageMainMeals.AllMainMeals.inputs.placeholder.placeholder"
                            )}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* visible */}
                    <div className="col-lg-2 col-md-12 col-sm-12 pt-4">
                      <div className="form-check form-switch pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          name="visible"
                          checked={isVisible}
                          onChange={handleVisibilityChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckChecked"
                        >
                          {t(
                            "ManageMainMeals.AllMainMeals.inputs.visibleToUser.label"
                          )}
                          <sup className="text-danger">*</sup>
                        </label>
                      </div>
                    </div>

                    <div className="add_main_meal_btn py-3 d-flex align-items-center w-100 justify-content-center">
                      <input
                        type="submit"
                        className="p-2 w-25"
                        data-bs-dismiss="modal"
                        value={t(
                          "ManageMainMeals.AllMainMeals.inputs.updateBtn"
                        )}
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
};

export default dynamic(() => Promise.resolve(EditMainMealsModal), {
  ssr: false,
});
