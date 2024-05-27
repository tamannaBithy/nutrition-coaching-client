"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetAllMealPerDayQuery } from "../../../../redux/features/queries/MEALS_PER_DAY_API";
import { useGetAllMealPreferencesQuery } from "../../../../redux/features/queries/MEAL_PREFERENCE_API";
import { useGetAllNumberOfDaysQuery } from "../../../../redux/features/queries/NUMBER_OF_DAYS_API";
import "./PlanSelection.css";

export default function PlanSelection() {
  const t = useTranslations("OurPlans");

  // getting the language code from the params
  const { locale } = useParams();

  // State variables for image loading and selected preferences, meals per day and plan duration
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedMealPreferences, setSelectedMealPreferences] = useState([]);
  const [selectedMealsPerDay, setSelectedMealsPerDay] = useState(null);
  const [selectedPlanDuration, setSelectedPlanDuration] = useState(null);

  /* Fetching the preferences data depending on the language*/
  const { data: preferencesData, isLoading: preferencesLoading } =
    useGetAllMealPreferencesQuery({ lang: locale });

  /* Fetching the meals per day data*/
  const { data: mealsPerDayData, isLoading: mealsPerDayLoading } =
    useGetAllMealPerDayQuery();

  /* Fetching the number of days data */
  const { data: numberOfDaysData, isLoading: numberOfDaysLoading } =
    useGetAllNumberOfDaysQuery();

  /* getting the router to redirect the user after selecting all the required fields */
  const router = useRouter();

  /* Toggle the preferences data and re-render the component  */
  useEffect(() => {
    if (!preferencesLoading && preferencesData?.data?.length) {
      setSelectedMealPreferences([preferencesData?.data[0]._id]);
    }
  }, [preferencesData, preferencesLoading]);

  /* Toggle the meals preferences */
  const toggleMealPreferences = (mealPlanId) => {
    setSelectedMealPreferences((prevSelected) =>
      prevSelected.includes(mealPlanId)
        ? prevSelected.filter((selected) => selected !== mealPlanId)
        : [...prevSelected, mealPlanId]
    );
  };

  /* Toggle meals per day */
  useEffect(() => {
    if (!mealsPerDayLoading && mealsPerDayData?.data?.length) {
      setSelectedMealsPerDay(mealsPerDayData?.data[0]?.meals_count);
    }
  }, [mealsPerDayData, mealsPerDayLoading]);

  /* Toggle the meals per day data */
  const toggleMealsPerDay = (mealsCount) => {
    setSelectedMealsPerDay((prevSelected) =>
      prevSelected === mealsCount ? prevSelected : mealsCount
    );
  };

  /* Toggle number of meals */
  useEffect(() => {
    if (!numberOfDaysLoading && numberOfDaysData?.data?.length) {
      setSelectedPlanDuration(numberOfDaysData?.data[0]?.days_number);
    }
  }, [numberOfDaysData, numberOfDaysLoading]);

  /* Toggle the meals plan duration data */
  const togglePlanDuration = (daysNumber) => {
    setSelectedPlanDuration((prevSelected) =>
      prevSelected === daysNumber ? prevSelected : daysNumber
    );
  };

  /* After selecting all the data properly redirecting the user to the main menu and setting the selected values to the localStorage */
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/main-menu");

    localStorage.setItem(
      "selectedMealPreferences",
      JSON.stringify([...selectedMealPreferences])
    );
    localStorage.setItem("selectedMealsPerDay", selectedMealsPerDay);
    localStorage.setItem("selectedPlanDuration", selectedPlanDuration);
  };

  return (
    <div>
      <div className="plans_container_headings text-center">
        <h2>{t("plansHeading")}</h2>
        <h5>{t("headingDescription")}</h5>
      </div>
      <div className="plan_selection_container">
        {/* Loader */}
        {preferencesLoading || mealsPerDayLoading || numberOfDaysLoading ? (
          <div className="spinner-border " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row row-gap-5 row-gap-lg-0">
              {/* Left side - Choose your preferences */}
              <div className="col-lg-6 col-md-12 left_side_meal_plan">
                <div className="preference_title mt-4 mt-md-0">
                  <h4>{t("leftHeading")}</h4>
                </div>

                <div className="preference_txt pb-4 px-3">
                  <span>{t("leftDescription")}</span>

                  {/* Display a warning if no preferences are selected */}
                  {selectedMealPreferences?.length === 0 && (
                    <div className="warning-text ">
                      <p className="text-danger">{t("leftOption")}</p>
                    </div>
                  )}
                </div>

                {/* Display meal plans */}
                <div className="plans_group row-gap-2 row">
                  {preferencesData &&
                    preferencesData?.data?.map((mealPlan) => (
                      <div
                        key={mealPlan?._id}
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={mealPlan?.preference_desc}
                        className="col-12 col-md-6 col-sm-12"
                      >
                        <div
                          className={` box ${
                            selectedMealPreferences.includes(mealPlan?._id)
                              ? " avg-box"
                              : ""
                          }`}
                          onClick={() => toggleMealPreferences(mealPlan?._id)}
                          role="checkbox"
                          aria-checked="true"
                          aria-labelledby="foo"
                          tabIndex="0"
                          checked={selectedMealPreferences?.includes(
                            mealPlan?._id
                          )}
                        >
                          {/* Display an icon if meal plan is selected */}
                          {selectedMealPreferences?.includes(mealPlan?._id) && (
                            <div className="avg-icon">
                              <Image
                                src="/assets/our-plans/select.svg"
                                alt="selected_icon"
                                width={26}
                                height={26}
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                              />
                            </div>
                          )}

                          {/* Display the meal plan details */}
                          <div
                            className={` ${
                              selectedMealPreferences?.includes(mealPlan?._id)
                                ? "active chef_plan"
                                : "chef_plan"
                            }`}
                          >
                            <div className="d-flex justify-content-center align-items-center flex-column py-4">
                              <Image
                                alt="mealPlan-preference-image"
                                src={`http://localhost:8000${mealPlan?.preference_image}`}
                                width={40}
                                height={40}
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                              />
                              <span>{mealPlan.preference}</span>

                              <p className="preference_desc">
                                {mealPlan?.preference_desc?.slice(0, 70)}
                                {"..."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Divider between left and right sides */}
              <div className="plan_divider d-lg-block d-none plan_divider"></div>

              {/* Right side - Select meals per week */}
              <div className="col-lg-5 col-md-12 right_side_meals_per_week">
                <div className="meal_per_week_title">
                  <h4>{t("rightHeading")}</h4>
                </div>

                <div className="meal_per_week_txt mb-5">
                  <p>{t("rightDescription")}</p>
                </div>

                {/* Display options for meals per day */}
                <div className="row per_week_group">
                  {mealsPerDayData &&
                    mealsPerDayData?.data?.map((item) => (
                      <div
                        key={item?.meals_count}
                        className="col-lg-4 col-md-12 col-sm-12 pb-4"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={item?.meals_count}
                      >
                        <div
                          role="radio"
                          aria-checked={
                            selectedMealsPerDay === item?.meals_count
                              ? "true"
                              : "false"
                          }
                          aria-labelledby="foo"
                          tabIndex="0"
                          className={`week_box  ${
                            selectedMealsPerDay === item?.meals_count
                              ? "plan_per_week_active"
                              : ""
                          }`}
                          onClick={() => toggleMealsPerDay(item?.meals_count)}
                        >
                          {item?.meals_count}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Display options for plan duration */}
                <div className="meal_per_week_title">
                  <h4>{t("rightHeadingOne")}</h4>
                </div>

                <div className="meal_per_week_txt mb-5">
                  <p>{t("rightDescriptionTwo")}</p>
                </div>

                <div className="row per_week_group">
                  {numberOfDaysData &&
                    numberOfDaysData?.data?.map((item) => (
                      <div
                        key={item?.days_number}
                        className="col-lg-4 col-md-12 col-sm-12 pb-4"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={item?.days_number}
                      >
                        <div
                          role="radio"
                          aria-checked={
                            selectedPlanDuration === item?.days_number
                              ? "true"
                              : "false"
                          }
                          aria-labelledby="foo"
                          tabIndex="0"
                          className={`week_box  ${
                            selectedPlanDuration === item?.days_number
                              ? "plan_per_week_active"
                              : ""
                          }`}
                          onClick={() => togglePlanDuration(item?.days_number)}
                        >
                          {item?.days_number}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="h-100 px-2 px-md-0 my-2 pt-md-5 my-md-5">
              {selectedMealPreferences?.length === 0 &&
              selectedMealsPerDay === null &&
              selectedPlanDuration === null ? (
                <button
                  type="submit"
                  className="disabled_meal_plan_btn form-control mx-auto rounded-3 text-white"
                  disabled
                >
                  {t("plansBtn")}
                </button>
              ) : (
                <button
                  type="submit"
                  className="select_meal_plan_btn text-white form-control mx-auto rounded-3"
                >
                  {t("plansBtn")}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
