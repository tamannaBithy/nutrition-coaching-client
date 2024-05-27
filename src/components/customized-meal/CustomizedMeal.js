"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import {
  useCreateUserCustomizedMealInputMutation,
  useGetUserCustomizedMealInputQuery,
} from "../../../redux/features/queries/USER_INPUT_FOR_CUSTOMIZED_MEAL_API";
import CustomizedMealList from "./CustomizedMealList";

export default function CustomizedMeal() {
  const t = useTranslations("CustomizedMealsRequest");

  const [createUserCustomizedMealInput] =
    useCreateUserCustomizedMealInputMutation();

  // Fetching user input data using the generated query hook
  const { data: userInputDetails } = useGetUserCustomizedMealInputQuery();

  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [mealType, setMealType] = useState("keto diet");

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value); // Update the mealType state with the selected value
  };

  const handleProteinChange = (event) => {
    setProtein(event.target.value);
  };

  const handleFatChange = (event) => {
    setFat(event.target.value);
  };

  const handleCarbsChange = (event) => {
    setCarbs(event.target.value);
  };

  useEffect(() => {
    setMealType("keto diet");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Parse inputs to ensure they are treated as numbers
    const parsedProtein = parseFloat(protein);
    const parsedFat = parseFloat(fat);
    const parsedCarbs = parseFloat(carbs);

    // Validate inputs before submitting the form
    if (
      isNaN(parsedProtein) ||
      isNaN(parsedFat) ||
      isNaN(parsedCarbs) ||
      protein < 0 ||
      fat < 0 ||
      carbs < 0
    ) {
      // Display an error message or take appropriate action
      alert("Invalid input. Please provide valid positive values.");
      return;
    }
    const formData = {
      protein: parsedProtein,
      fat: parsedFat,
      carbs: parsedCarbs,
      category: mealType,
    };

    console.log(formData);

    const { data } = await createUserCustomizedMealInput(formData);

    // show the success & error message
    if (data?.status) {
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

  return userInputDetails ? (
    <CustomizedMealList />
  ) : (
    <>
      <div className="px-2 py-5">
        <div className="add_blog_title ">
          <h2>{t("title")}</h2>
        </div>
        <div className="row">
          {/*begin: form area */}
          <div className="col-md-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-3 pt-4">
                {/* Protein field */}
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="blog_title_fields">
                    <label htmlFor="meal_title">
                      {t("form.inputs.one.label")}
                      <sup className="text-danger">*</sup>
                    </label>
                    <select
                      className="form-control"
                      id="meal_type"
                      value={mealType} // Set the value of the dropdown to mealType state
                      onChange={handleMealTypeChange} // Call handleMealTypeChange on change
                    >
                      <option value="keto diet" selected>
                        Keto Diet
                      </option>
                      <option value="clean diet">Clean Diet</option>
                    </select>
                  </div>
                </div>
                {/* Protein field */}
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="blog_title_fields">
                    <label htmlFor="meal_title">
                      {t("form.inputs.two.label")}

                      <sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="number"
                      name="protein"
                      id="meal_title"
                      className="rounded form-control"
                      value={protein}
                      onChange={handleProteinChange}
                      required
                      placeholder={t("form.inputs.two.placeholder")}
                    />
                  </div>
                </div>

                {/* Fat field */}
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className=" blog_title_fields">
                    <label htmlFor="meal_title">
                      {t("form.inputs.three.label")}

                      <sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="number"
                      name="fat"
                      id="meal_title"
                      className="rounded form-control"
                      value={fat}
                      onChange={handleFatChange}
                      required
                      placeholder={t("form.inputs.three.placeholder")}
                    />
                  </div>
                </div>

                {/* carbs field */}
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="mb-2 blog_title_fields">
                    <label htmlFor="meal_title">
                      {t("form.inputs.four.label")}

                      <sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="number"
                      name="carbs"
                      id="meal_title"
                      className="rounded form-control"
                      value={carbs}
                      onChange={handleCarbsChange}
                      required
                      placeholder={t("form.inputs.four.placeholder")}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className=" add_blog_btn py-3 d-flex align-items-center w-100 justify-content-center">
                  <input type="submit" className="p-2 w-25" value="Submit" />
                </div>
              </div>
            </form>
          </div>
          {/*end: form area */}

          {/*begin: right area */}
          <div className="col-md-7">
            <div className="right-area">
              <Image
                src="/assets/custom-meal.png"
                width={500}
                height={400}
                alt="CUSTOM-MEAL"
              />
            </div>
          </div>
          {/*end: right area */}
        </div>
      </div>
    </>
  );
}
