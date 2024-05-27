/* eslint-disable react/jsx-no-duplicate-props */
"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";
import Swal from "sweetalert2";
import {
  useCreateOfferedMealMutation,
  useGetPackagesListQuery,
} from "../../../../../redux/features/queries/OFFERED_MEALS_API";
import "./AddForm.css";

const AddForm = () => {
  const t = useTranslations("Dashboard");

  const { locale: langCode } = useParams();
  const [language, setLanguage] = useState(null);

  /* Getting all the packages */
  const {
    data: packagesName,
    packagesError: error,
    packagesLoading: isLoading,
  } = useGetPackagesListQuery();

  /* Create mutation function */
  const [
    createOfferedMeal,
    { isSuccess: createIsSuccess, isError: CreateIsError, data: createData },
  ] = useCreateOfferedMealMutation();

  // Transform meal preferences data for Select component
  const package_options =
    packagesName?.data?.map((pack) => ({
      value: pack?._id,
      label: pack?.package_name,
    })) || [];

  /* meals state */
  const [offeredMeal, setOfferedMeal] = useState({
    package_id: "",
    image: "",
    meal_name: "",
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0,
    nutrition_facts_image: "",
    ingredients: "",
    heating_instruction: "",
  });

  // Event handler for selecting a package
  const handlePackageChange = (selectedOption) => {
    setOfferedMeal((prevValues) => ({
      ...prevValues,
      package_id: selectedOption.value,
    }));
  };

  // Event handler for  meal name input
  const handleMealNameChange = (e) => {
    setOfferedMeal((prevValues) => ({
      ...prevValues,
      meal_name: e.target.value,
    }));
  };

  // Event handler for  protein input
  const handleProteinChange = (e) => {
    setOfferedMeal((prevValues) => ({
      ...prevValues,
      protein: parseInt(e.target.value),
    }));
  };

  // Event handler for  carbs input
  const handleCarbsChange = (e) => {
    setOfferedMeal((prevValues) => ({
      ...prevValues,
      carbs: parseInt(e.target.value),
    }));
  };

  // Event handler for  fat input
  const handleFatChange = (e) => {
    setOfferedMeal((prevValues) => ({
      ...prevValues,
      fat: parseInt(e.target.value),
    }));
  };

  // Event handler for  ingredients textarea
  const handleIngredientsChange = (e) => {
    setOfferedMeal((prevValues) => ({
      ...prevValues,
      ingredients: e.target.value,
    }));
  };

  // Event handler for  heating instruction textarea
  const handleHeatingInstructionChange = (e) => {
    setOfferedMeal((prevValues) => ({
      ...prevValues,
      heating_instruction: e.target.value,
    }));
  };

  //handle changes in the meal image input
  const onMealImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if an image already exists for the meal
      if (offeredMeal.image) {
        // Show error message or prevent further action
        return alert(t("ManageOfferedMeals.AddOfferedMeals.alert.two"));
        return;
      }
      // Update the image for a specific offered meal
      setOfferedMeal((prevValues) => ({
        ...prevValues,
        image: file,
      }));
    }
  };

  // handle changes in the nutrition facts image input
  const onNutritionImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if an image already exists for the meal
      if (offeredMeal.nutrition_facts_image) {
        // Show error message or prevent further action
        return alert(t("ManageOfferedMeals.AddOfferedMeals.alert.three"));
        return;
      }
      // Update the nutrition facts image for a specific offered meal
      setOfferedMeal((prevValues) => ({
        ...prevValues,
        nutrition_facts_image: file,
      }));
    }
  };

  // Remove the ally offered meal image
  const removeMealImage = () => {
    // Remove the image for a specific offered meal
    setOfferedMeal((prevValues) => ({
      ...prevValues,
      image: "",
    }));
  };

  // Remove the ally offered meal nutrition_facts_image
  const removeNutritionImage = () => {
    // Remove the nutrition facts image for a specific offered meal
    setOfferedMeal((prevValues) => ({
      ...prevValues,
      nutrition_facts_image: "",
    }));
  };

  // Function for reset form
  const resetForm = () => {
    setOfferedMeal({
      package_id: "",
      image: "",
      meal_name: "",
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
      nutrition_facts_image: "",
      ingredients: "",
      heating_instruction: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("package_id", offeredMeal.package_id);
    formData.append("image", offeredMeal.image);
    formData.append("meal_name", offeredMeal.meal_name);
    formData.append("protein", offeredMeal.protein);
    formData.append("carbs", offeredMeal.carbs);
    formData.append("fat", offeredMeal.fat);
    formData.append("nutrition_facts_image", offeredMeal.nutrition_facts_image);
    formData.append("ingredients", offeredMeal.ingredients);
    formData.append("heating_instruction", offeredMeal.heating_instruction);

    const { data } = await createOfferedMeal(formData);
    if (data?.status) {
      // resetForm();
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
          <h2>{t("ManageOfferedMeals.AddOfferedMeals.pageTitle2")}</h2>
        </div>
        {/* Main Content */}
        <div className='py-3'>
          <form onSubmit={handleSubmit}>
            <div className='row g-3 pt-4'>
              {/* Inputs for offeredMeals meals  */}
              {/* Select Meal Package */}
              <div className='mb-2 meal_name_fields col-lg-12 col-md-12 col-sm-12'>
                <label htmlFor='select_package'>
                  {t(
                    "ManageOfferedMeals.AddOfferedMeals.inputs.selectMealPackage.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <Select
                  id='select_package'
                  name='package_id'
                  options={package_options || []}
                  value={package_options.find(
                    (option) => option.value === offeredMeal.package_id
                  )}
                  onChange={handlePackageChange}
                  placeholder={t(
                    "ManageOfferedMeals.AddOfferedMeals.inputs.selectMealPackage.placeholder"
                  )}
                  required
                />
              </div>

              {/* image field */}
              <div className='meal_img_field d-flex custom_upload mb-2'>
                <label htmlFor='meal_image'>
                  {t("ManageOfferedMeals.AddOfferedMeals.inputs.image.label")}
                </label>
                <input
                  type='file'
                  className='custom-file-input'
                  id='meal_image'
                  onChange={(e) => onMealImageChange(e)}
                  accept='image/*'
                  hidden
                />
                <label
                  className='custom-file-label bg-white'
                  htmlFor='meal_image'>
                  {t(
                    "ManageOfferedMeals.AddOfferedMeals.inputs.packageImages.placeholder.one"
                  )}
                </label>

                {/* Meal image preview here */}
                {offeredMeal.image && (
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
                          onClick={() => removeMealImage()}
                          title='Remove the image'
                        />
                        <Image
                          width={250}
                          height={150}
                          alt='Image'
                          src={URL?.createObjectURL(offeredMeal.image)}
                          alt='Meal Image Preview'
                          className='preview-image rounded'
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* meal name field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 meal_name_fields'>
                  <label htmlFor='meal_name'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.mealName.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    name='meal_name'
                    id='meal_name'
                    className='rounded form-control'
                    placeholder={t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.mealName.placeholder"
                    )}
                    value={offeredMeal?.meal_name}
                    onChange={(e) => handleMealNameChange(e)}
                    required
                  />
                </div>
              </div>

              {/* protein field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 protein_fields'>
                  <label htmlFor='protein'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.proteinAmount.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center protein_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='protein'
                      id='protein'
                      value={offeredMeal?.protein}
                      onChange={(e) => handleProteinChange(e)}
                      onWheel={(e) => e.target.blur()}
                      required
                      placeholder={t(
                        "ManageOfferedMeals.AddOfferedMeals.inputs.proteinAmount.placeholder"
                      )}
                    />
                    <div className='p-2 bg-dark text-white border rounded-end'>
                      G
                    </div>
                  </div>
                </div>
              </div>

              {/* carbs field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 carbs_fields'>
                  <label htmlFor='carbs'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.carbsAmount.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center carbs_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='carbs'
                      id='carbs'
                      value={offeredMeal?.carbs}
                      onChange={(e) => handleCarbsChange(e)}
                      onWheel={(e) => e.target.blur()}
                      required
                      placeholder={t(
                        "ManageOfferedMeals.AddOfferedMeals.inputs.carbsAmount.placeholder"
                      )}
                    />
                    <div className='p-2 bg-dark text-white border rounded-end'>
                      G
                    </div>
                  </div>
                </div>
              </div>

              {/* fat field */}
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='mb-2 fat_fields'>
                  <label htmlFor='fat'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.fatAmount.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center fat_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='fat'
                      id='fat'
                      value={offeredMeal?.fat}
                      onChange={(e) => handleFatChange(e)}
                      onWheel={(e) => e.target.blur()}
                      required
                      placeholder={t(
                        "ManageOfferedMeals.AddOfferedMeals.inputs.fatAmount.placeholder"
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
                <div className='mb-2 calories_fields'>
                  <label htmlFor='calories'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.caloriesAmount.label"
                    )}
                  </label>
                  <div className='d-flex align-items-center calories_fields_area rounded'>
                    <input
                      type='number'
                      className='form-control border-0'
                      name='calories'
                      id='calories'
                      disabled
                      value={
                        (offeredMeal?.protein || 0) * 4 +
                        (offeredMeal?.carbs || 0) * 4 +
                        (offeredMeal?.fat || 0) * 9
                      }
                      placeholder={t(
                        "ManageOfferedMeals.AddOfferedMeals.inputs.caloriesAmount.placeholder"
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* nutrition facts image */}
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='nutrition_img_field custom_upload  mb-2'>
                  <label htmlFor='nutrition_image'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.nutritionFactsImage.label"
                    )}
                  </label>
                  <input
                    type='file'
                    className='custom-file-input'
                    id='nutrition_image'
                    onChange={(e) => onNutritionImageChange(e)}
                    accept='image/*'
                    hidden
                  />
                  <label
                    className='custom-file-label bg-white'
                    htmlFor='nutrition_image'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.nutritionFactsImage.placeholder.one"
                    )}
                  </label>

                  {/* Nutrition facts image preview here */}
                  {offeredMeal.nutrition_facts_image && (
                    <>
                      <p className='mt-3 mb-2'>
                        {t(
                          "ManageOfferedMeals.AddOfferedMeals.inputs.nutritionFactsImage.previewImage"
                        )}
                      </p>
                      <div className='d-flex align-items-center'>
                        <div className='position-relative'>
                          <IoIosClose
                            className='position-absolute top-0 end-0 bg-danger text-white rounded fs-3'
                            data-toggle='tooltip'
                            data-placement='top'
                            role='button'
                            onClick={() => removeNutritionImage()}
                            title='Remove the image'
                          />
                          <Image
                            width={250}
                            height={150}
                            alt='nutrition_image'
                            src={URL?.createObjectURL(
                              offeredMeal.nutrition_facts_image
                            )}
                            alt='Nutrition Image Preview '
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
                <div className='mb-2 ingredients_fields'>
                  <label htmlFor='ingredients'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.ingredients.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center ingredients_fields_area rounded'>
                    <textarea
                      type='text'
                      className='form-control border-0'
                      name='ingredients'
                      id='ingredients'
                      value={offeredMeal?.ingredients}
                      onChange={(e) => handleIngredientsChange(e)}
                      placeholder={t(
                        "ManageOfferedMeals.AddOfferedMeals.inputs.ingredients.placeholder"
                      )}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* heating instruction text field */}
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='mb-2 heating_fields'>
                  <label htmlFor='heating_instruction'>
                    {t(
                      "ManageOfferedMeals.AddOfferedMeals.inputs.heatingInstruction.label"
                    )}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <div className='d-flex align-items-center heating_fields_area rounded'>
                    <textarea
                      type='text'
                      className='form-control border-0'
                      name='heating_instruction'
                      id='heating_instruction'
                      value={offeredMeal?.heating_instruction}
                      onChange={(e) => handleHeatingInstructionChange(e)}
                      placeholder={t(
                        "ManageOfferedMeals.AddOfferedMeals.inputs.heatingInstruction.placeholder"
                      )}
                      required
                    />
                  </div>
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

export default dynamic(() => Promise.resolve(AddForm), {
  ssr: false,
});
