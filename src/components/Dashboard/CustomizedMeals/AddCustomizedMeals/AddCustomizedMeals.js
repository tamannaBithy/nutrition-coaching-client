"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import { useCreateCustomizedMealMutation } from "../../../../../redux/features/queries/CUSTOMIZED_MEAL_API";

export default function AddCustomizedMealsForm() {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();
  const [createCustomizedMeal, { isLoading, isError, isSuccess, data }] =
    useCreateCustomizedMealMutation();
  const [selected, setSelected] = useState([]);
  const [selectedImages, setSelectedImages] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [langFormData, setLangFormData] = useState(locale);

  const [mealData, setMealData] = useState({
    lang: langFormData || "en",
    meal_name: "",
    select_diet: "",
    protein: "",
    fadd: "",
    carbs: "",
    prp: "",
    prc: "",
    prf: "",
    mf: "",
    sf: "",
    of: "",
    fmf: "",
    ingredients: "",
    heating_instruction: "",
    tags: [],
    image: "",
    visible: true,
  });
  // Function to handle language change
  const handleLangChange = (selectedLang) => {
    setLangFormData(selectedLang);
  };
  // Event handler for visibility checkbox
  const handleVisibilityChange = (e) => {
    setIsVisible(e.target.checked);
  };

  // Handle image drop for meal images
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 1) {
      alert(t("ManageCustomizedMeals.AddCustomizedMeals.alert"));
      return;
    }
    setSelectedImages(acceptedFiles[0]);
    // Update mealData state for images
    setMealData((prevData) => ({
      ...prevData,
      image: acceptedFiles[0],
    }));
  };

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
  };

  // Inside the render function
  const selectedTags = selected.length > 0 ? selected : [];

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // If the input type is 'number', convert the value to a number
    const processedValue = type === "number" ? parseFloat(value) : value;
    setMealData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  };

  const handleTagsChange = (tags) => {
    setMealData((prevData) => ({
      ...prevData,
      tags,
    }));
  };

  //reset form
  const resetForm = () => {
    setMealData({
      lang: langFormData || "en",
      meal_name: "",
      select_diet: "",
      protein: "",
      fadd: "",
      carbs: "",
      prp: "",
      prc: "",
      prf: "",
      mf: "",
      sf: "",
      of: "",
      fmf: "",
      ingredients: "",
      heating_instruction: "",
      tags: [],
      image: "",
      visible: true,
    });
    setSelected([]);
    setSelectedImages(null);
  };

  //form data submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append each field to the FormData object
    formData.append("lang", langFormData);

    // Append image
    formData.append("image", mealData.image);

    formData.append("meal_name", mealData.meal_name);
    formData.append("select_diet", mealData.select_diet);
    selectedTags.forEach((tag) => {
      formData.append("tags", tag);
    });

    formData.append("protein", mealData.protein);
    formData.append("fadd", mealData.fadd);
    formData.append("carbs", mealData.carbs);
    formData.append("prp", mealData.prp);
    formData.append("prc", mealData.prc);
    formData.append("prf", mealData.prf);
    formData.append("mf", mealData.mf);
    formData.append("sf", mealData.sf);
    formData.append("of", mealData.of);
    formData.append("fmf", mealData.fmf);
    formData.append("ingredients", mealData.ingredients);
    formData.append("heating_instruction", mealData.heating_instruction);
    formData.append("visible", mealData.visible);
    formData.forEach((value, key) => {
      return console.log(key, value);
    });
    // create custom meal
    const { data } = await createCustomizedMeal(formData);
    if (data?.status) {
      resetForm();
      Swal.fire({
        icon: "success",
        title: data?.message?.en,
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
  };
  return (
    <div className='customized-meal-form-main'>
      <div className='container'>
        <div className='title d-flex justify-content-between align-items-center'>
          <h2>{t("ManageCustomizedMeals.AddCustomizedMeals.pageTitle")}</h2>
        </div>
        {/* begin: form */}
        <form onSubmit={handleSubmit}>
          <div className='row'>
            {/* language preference */}
            <div className='col-12 mb-3'>
              <div className='show_per_page_section'>
                <p className='m-1'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.languagePreference"
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
            {/* images field */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='mb-3 set_images_field'>
                <label htmlFor='images'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.image.label"
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
                          "ManageCustomizedMeals.AddCustomizedMeals.inputs.image.placeholder.one"
                        )}
                        ...
                      </p>
                      <p className='text-center'>
                        {t(
                          "ManageCustomizedMeals.AddCustomizedMeals.inputs.image.placeholder.two"
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className='text-center'>
                        {t(
                          "ManageCustomizedMeals.AddCustomizedMeals.inputs.image.placeholder.three"
                        )}
                      </p>
                      <p className='text-center'>
                        {t(
                          "ManageCustomizedMeals.AddCustomizedMeals.inputs.image.placeholder.two"
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
                          "ManageCustomizedMeals.AddCustomizedMeals.inputs.image.previewImages"
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
            {/* tags field */}
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <div className='mb-3 input_fields'>
                <label htmlFor='tags'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.mealTags.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <div className='d-flex align-items-center tag_fields_area rounded'>
                  <TagsInput
                    name='tags'
                    value={selected}
                    onChange={setSelected}
                    id='tags'
                    className='form-control border-0 w-100'
                    required
                    placeHolder={t(
                      "ManageCustomizedMeals.AddCustomizedMeals.inputs.mealTags.placeholder"
                    )}
                  />
                </div>
              </div>
            </div>
            {/* meal name field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='number'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.mealName.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='text'
                  name='meal_name'
                  id='meal_name'
                  value={mealData.meal_name}
                  onChange={handleInputChange}
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.mealName.placeholder"
                  )}
                />
              </div>
            </div>
            {/* select diet  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='number'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.selectDiet.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <select
                  name='select_diet'
                  id='diet'
                  className='form-select'
                  value={mealData.select_diet}
                  onChange={handleInputChange}
                  aria-label='Default select example'>
                  <option value='keto diet'>
                    {t(
                      "ManageCustomizedMeals.AddCustomizedMeals.inputs.selectDiet.options.one"
                    )}
                  </option>
                  <option value='clean diet'>
                    {t(
                      "ManageCustomizedMeals.AddCustomizedMeals.inputs.selectDiet.options.two"
                    )}
                  </option>
                </select>
              </div>
            </div>
            {/* protein  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='protein'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.protein.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  name='protein'
                  value={mealData.protein}
                  onChange={handleInputChange}
                  onWheel={(e) => e.target.blur()}
                  id='protein'
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.protein.placeholder"
                  )}
                />
              </div>
            </div>
            {/* fadd  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='fadd'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.fadd.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  name='fadd'
                  value={mealData.fadd}
                  onChange={handleInputChange}
                  onWheel={(e) => e.target.blur()}
                  id='fadd'
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.fadd.placeholder"
                  )}
                />
              </div>
            </div>
            {/* carbs  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='carbs'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.carbs.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  name='carbs'
                  value={mealData.carbs}
                  onChange={handleInputChange}
                  onWheel={(e) => e.target.blur()}
                  id='carbs'
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.carbs.placeholder"
                  )}
                />
              </div>
            </div>
            {/* prp  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='prp'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.prp.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  name='prp'
                  value={mealData.prp}
                  onChange={handleInputChange}
                  onWheel={(e) => e.target.blur()}
                  id='prp'
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.prp.placeholder"
                  )}
                />
              </div>
            </div>
            {/* prc  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='prc'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.prc.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  name='prc'
                  value={mealData.prc}
                  onChange={handleInputChange}
                  onWheel={(e) => e.target.blur()}
                  id='prc'
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.prc.placeholder"
                  )}
                />
              </div>
            </div>
            {/* prf  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='prf'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.prf.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  name='prf'
                  value={mealData.prf}
                  onChange={handleInputChange}
                  onWheel={(e) => e.target.blur()}
                  id='prf'
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.prf.placeholder"
                  )}
                />
              </div>
            </div>
            {/* mf  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='mf'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.mf.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  name='mf'
                  value={mealData.mf}
                  onChange={handleInputChange}
                  onWheel={(e) => e.target.blur()}
                  id='mf'
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.mf.placeholder"
                  )}
                />
              </div>
            </div>
            {/* sf  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='sf'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.sf.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  name='sf'
                  value={mealData.sf}
                  onChange={handleInputChange}
                  onWheel={(e) => e.target.blur()}
                  id='sf'
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.sf.placeholder"
                  )}
                />
              </div>
            </div>
            {/* of  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='of'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.of.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  name='of'
                  value={mealData.of}
                  onChange={handleInputChange}
                  onWheel={(e) => e.target.blur()}
                  id='of'
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.of.placeholder"
                  )}
                />
              </div>
            </div>
            {/* fmf  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='fmf'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.fmf.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  name='fmf'
                  value={mealData.fmf}
                  onChange={handleInputChange}
                  onWheel={(e) => e.target.blur()}
                  id='fmf'
                  className='rounded form-control'
                  required
                  placeholder={t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.fmf.placeholder"
                  )}
                />
              </div>
            </div>
            {/* ingredients  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='ingredients'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.ingredients.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>

                <div className='d-flex align-items-center input_fields_area rounded'>
                  <textarea
                    type='text'
                    rows={1}
                    name='ingredients'
                    id='ingredients'
                    value={mealData.ingredients}
                    onChange={handleInputChange}
                    className='rounded form-control'
                    required
                    placeholder={t(
                      "ManageCustomizedMeals.AddCustomizedMeals.inputs.ingredients.placeholder"
                    )}
                  />
                </div>
              </div>
            </div>
            {/* heating_instruction  field */}
            <div className='col-md-6'>
              <div className='mb-3 input_fields'>
                <label htmlFor='heatingInstruction'>
                  {t(
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.heatingInstruction.label"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
                <div className='d-flex align-items-center input_fields_area rounded'>
                  <textarea
                    rows={1}
                    type='text'
                    name='heating_instruction'
                    value={mealData.heating_instruction}
                    onChange={handleInputChange}
                    id='heatingInstruction'
                    className='rounded form-control'
                    required
                    placeholder={t(
                      "ManageCustomizedMeals.AddCustomizedMeals.inputs.heatingInstruction.placeholder"
                    )}
                  />
                </div>
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
                    "ManageCustomizedMeals.AddCustomizedMeals.inputs.visibleToUser"
                  )}
                  <sup className='text-danger'>*</sup>
                </label>
              </div>
            </div>
            {/* Submit button */}
            <div className='col-12 add_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'>
              <button className='p-2 w-25 update-btn'>
                {t("ManageCustomizedMeals.AddCustomizedMeals.btn")}
              </button>
            </div>
          </div>
        </form>
        {/* end: form */}
      </div>
    </div>
  );
}
