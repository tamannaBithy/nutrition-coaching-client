"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { IoFilter, IoWarning } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useGetAllCartsQuery } from "../../../redux/features/queries/CART_API";
import { useGetAllMainMealMenusForUsersMutation } from "../../../redux/features/queries/MAIN_MEAL_MENU_API";
import MainMenuPriceCard from "../Common/MainMenuPriceCard";
import CartItemsPopup from "./CartItemsPopup/CartItemsPopup";
import "./MainMenuItems.css";

export default function MainMenuItems() {
  const t = useTranslations("MainMealsMenu");

  const { locale } = useParams();
  const [language, setLanguage] = useState(null);

  // Fetching selected preferences from localStorage or defaulting to an empty array
  const selectedPref =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("selectedMealPreferences")) || []
      : [];

  // Mutation hook for fetching main meal menus of the running week
  const [GetAllMainMealMenusForUser, { isLoading, isError, isSuccess }] =
    useGetAllMainMealMenusForUsersMutation();

  const {
    data: allCarts,
    isLoading: allCartsLoading,
    isError: allCartsError,
  } = useGetAllCartsQuery();

  // State to store the fetched main meal menus and selected filter values
  const [mainMeals, setMainMeals] = useState({});
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // New state for search

  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);

  const handleOpenOffcanvas = () => {
    setOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setOffcanvasOpen(false);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllMainMealMenusForUser({
          data: {
            preference: selectedPref,
          },
          lang: locale,
        });

        console.log(result);

        // Set the fetched data to the state
        setMainMeals(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => setMainMeals({});
  }, [locale]);

  // Extracting filters and meal data from the fetched data
  const filters_pref = mainMeals?.data?.filter_by_preferences;
  const filter_tag = mainMeals?.data?.filter_by_tag;
  const filters_meal_type = mainMeals?.data?.filter_by_type_of_meal;
  const mealsData = mainMeals?.data?.meals_data;

  // Handler for checkbox changes
  const handleCheckboxChange = (value, type) => {
    switch (type) {
      case "preferences":
        setSelectedPreferences((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "tags":
        setSelectedTags((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "mealTypes":
        setSelectedMealTypes((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  // Function to apply filters to the meal data
  const applyFilters = (meal) => {
    const preferencesFilter =
      selectedPreferences.length === 0 ||
      (meal &&
        meal.meals &&
        selectedPreferences.includes(String(meal.meals[0]?.preference)));

    const tagsFilter =
      selectedTags.length === 0 ||
      (meal &&
        meal.meals &&
        meal.meals.some(
          (mealData) =>
            mealData.tags &&
            mealData.tags.some((tag) => selectedTags.includes(tag))
        ));

    const mealTypesFilter =
      selectedMealTypes.length === 0 ||
      (meal &&
        meal.type_of_meal &&
        selectedMealTypes.includes(meal.type_of_meal));

    return preferencesFilter && tagsFilter && mealTypesFilter;
  };

  // Function to apply search filter to the meal data
  const applySearchFilter = (meal) => {
    if (!searchKeyword) {
      return true; // No search keyword, include all meals
    }

    return (
      meal &&
      meal.meals &&
      (meal.meals.some((mealData) =>
        mealData.meal_name.toLowerCase().includes(searchKeyword.toLowerCase())
      ) ||
        (meal.type_of_meal &&
          meal.type_of_meal
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())) ||
        meal.meals[0]?.preference
          .toLowerCase()
          .includes(searchKeyword.toLowerCase()))
    );
  };

  // Filtering the main meal data based on selected filters and search keyword
  const filteredMainAllMealData = mealsData
    ? mealsData.filter((meal) => applyFilters(meal) && applySearchFilter(meal))
    : [];

  // Handler for search input change
  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const selectedMealsPerDay =
    typeof window !== "undefined"
      ? localStorage.getItem("selectedMealsPerDay")
      : localStorage.getItem("selectedMealsPerDay");

  const selectedPlanDuration =
    typeof window !== "undefined"
      ? localStorage.getItem("selectedPlanDuration")
      : localStorage.getItem("selectedPlanDuration");
  const totalItems =
    (allCarts?.data?.mainMealCart[0]?.menus?.length || 0) +
    (allCarts?.data?.offeredMealCart[0]?.menus?.length || 0);

  return (
    <div className='position-relative padding-top'>
      {/* Caution  */}
      <div
        className='toast show '
        role='alert'
        aria-live='assertive'
        aria-atomic='true'>
        <div className='toast-header'>
          <strong>{t("caution.title")}</strong>
          <IoWarning />
        </div>
        <div className='toast-body'>
          <p>
            {t("caution.mealsPerDay")}: <b>{selectedMealsPerDay}</b>{" "}
            {t("caution.days")}
          </p>
          <p>
            {t("caution.planDuration")}: <b>{selectedPlanDuration}</b>{" "}
            {t("caution.days")}
          </p>
          <p>
            {t("caution.mainMenuCartItems")}:{" "}
            <b>
              {allCarts?.data?.mainMealCart[0]?.menus?.length || 0}/
              {selectedPlanDuration * selectedMealsPerDay}
            </b>
          </p>
        </div>
      </div>
      {/* Cart items sticky  */}
      <div className='cartSticky position-relative'>
        <button
          className='middleStickyBtn'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasWithBackdrop'
          aria-controls='offcanvasWithBackdrop'>
          <MdOutlineShoppingBag />
          <div className='d-flex align-items-center column-gap-1'>
            <strong>{totalItems}</strong>
            {t("sideBarCanvas.items")}
          </div>
        </button>

        {mealsData &&
          mealsData?.length > 0 &&
          mealsData?.map((mealData, i) => (
            <CartItemsPopup
              key={i}
              mealData={mealData}
              isOpen={isOffcanvasOpen}
              handleClose={handleCloseOffcanvas}
            />
          ))}
      </div>

      <div className='container-fluid pb-5 container_padding'>
        <h2 className='py-5 text-center main_menu_title'>{t("pageTitle")}</h2>
        <div className='main-menu-area'>
          <div className='col-12 d-flex align-items-center justify-content-center'>
            {/* Loader */}
            {isLoading && (
              <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            )}
          </div>

          <div className='row'>
            {/* Filters For Small Device....... */}
            <div
              className='offcanvas offcanvas-end'
              tabIndex='-1'
              id='offcanvasRight'
              aria-labelledby='offcanvasRightLabel'>
              <div className='offcanvas-header'>
                <button
                  type='button'
                  className='btn-close text-reset'
                  data-bs-dismiss='offcanvas'
                  aria-label='Close'></button>
              </div>
              {filters_pref && filters_pref.length > 0 && (
                <div className='offcanvas-body'>
                  {/* Filters Here....... */}
                  <div className='col-xl-12'>
                    <div className='sidebar-widget price_range range mb-30'>
                      {/* Preferences filter */}

                      <>
                        <div className='accordion shadow' id='accordionExample'>
                          <div className='accordion-item mb-2'>
                            <h2 className='accordion-header' id='headingOne'>
                              <button
                                className='accordion-button'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#collapseOne'
                                aria-expanded='true'
                                aria-controls='collapseOne'>
                                <span className='main_menu_filter_title'>
                                  {t("filters.filterByPreferences")}
                                </span>
                              </button>
                            </h2>
                            <div
                              id='collapseOne'
                              className='accordion-collapse collapse show'
                              aria-labelledby='headingOne'
                              data-bs-parent='#accordionExample'>
                              <div className='accordion-body'>
                                <div className='list-group mb-4'>
                                  <div className='list-group-item '>
                                    <div className='custome-checkbox'>
                                      {filters_pref?.map((pref, index) => (
                                        <Fragment key={index}>
                                          <div className='custom_flex'>
                                            <input
                                              className='form-check-input me-2'
                                              type='checkbox'
                                              name={`checkbox-${index}`}
                                              id={`exampleCheckbox${index}`}
                                              value={pref}
                                              checked={selectedPreferences.includes(
                                                pref
                                              )}
                                              onChange={() =>
                                                handleCheckboxChange(
                                                  pref,
                                                  "preferences"
                                                )
                                              }
                                            />
                                            <label
                                              className='form-check-label'
                                              htmlFor={`exampleCheckbox${index}`}>
                                              <span>{pref}</span>
                                            </label>
                                          </div>
                                        </Fragment>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>

                      {/* Tags filter */}
                      {filter_tag && filter_tag.length > 0 && (
                        <>
                          <div
                            className='accordion shadow'
                            id='accordionExample'>
                            <div className='accordion-item'>
                              <h2
                                className='accordion-header mb-2'
                                id='headingTwo'>
                                <button
                                  className='accordion-button'
                                  type='button'
                                  data-bs-toggle='collapse'
                                  data-bs-target='#collapseTwo'
                                  aria-expanded='true'
                                  aria-controls='collapseTwo'>
                                  <span className='main_menu_filter_title'>
                                    {t("filters.filterByTags")}
                                  </span>
                                </button>
                              </h2>
                              <div
                                id='collapseTwo'
                                className='accordion-collapse collapse show'
                                aria-labelledby='headingTwo'
                                data-bs-parent='#accordionExample'>
                                <div className='accordion-body'>
                                  <div className='list-group mb-4'>
                                    <div className='list-group-item '>
                                      <div className='custome-checkbox'>
                                        {filter_tag?.map((tag, index) => (
                                          <Fragment key={index}>
                                            <div className='custom_flex'>
                                              <input
                                                className='form-check-input me-2'
                                                type='checkbox'
                                                name={`tag-checkbox-${index}`}
                                                id={`exampleTagCheckbox${index}`}
                                                value={tag}
                                                checked={selectedTags.includes(
                                                  tag
                                                )}
                                                onChange={() =>
                                                  handleCheckboxChange(
                                                    tag,
                                                    "tags"
                                                  )
                                                }
                                              />
                                              <label
                                                className='form-check-label'
                                                htmlFor={`exampleTagCheckbox${index}`}>
                                                <span>{tag}</span>
                                              </label>
                                            </div>
                                          </Fragment>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Meal Types filter */}
                      {filters_meal_type && filters_meal_type.length > 0 && (
                        <>
                          <div
                            className='accordion shadow'
                            id='accordionExample'>
                            <div className='accordion-item'>
                              <h2
                                className='accordion-header mb-2'
                                id='headingThree'>
                                <button
                                  className='accordion-button'
                                  type='button'
                                  data-bs-toggle='collapse'
                                  data-bs-target='#collapseThree'
                                  aria-expanded='true'
                                  aria-controls='collapseThree'>
                                  <span className='main_menu_filter_title'>
                                    {t("filters.filterByMealType")}
                                  </span>
                                </button>
                              </h2>
                              <div
                                id='collapseThree'
                                className='accordion-collapse collapse show'
                                aria-labelledby='headingThree'
                                data-bs-parent='#accordionExample'>
                                <div className='accordion-body'>
                                  <div className='list-group mb-4'>
                                    <div className='list-group-item '>
                                      <div className='custome-checkbox'>
                                        {filters_meal_type?.map(
                                          (mealType, index) => (
                                            <Fragment key={index}>
                                              <div className='custom_flex'>
                                                <input
                                                  className='form-check-input me-2'
                                                  type='checkbox'
                                                  name={`meal-type-checkbox-${index}`}
                                                  id={`exampleMealTypeCheckbox${index}`}
                                                  value={mealType}
                                                  checked={selectedMealTypes.includes(
                                                    mealType
                                                  )}
                                                  onChange={() =>
                                                    handleCheckboxChange(
                                                      mealType,
                                                      "mealTypes"
                                                    )
                                                  }
                                                />
                                                <label
                                                  className='form-check-label'
                                                  htmlFor={`exampleMealTypeCheckbox${index}`}>
                                                  <span>{mealType}</span>
                                                </label>
                                              </div>
                                            </Fragment>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Filters For Big Device....... */}
            <div className='col-xl-3 filter_area'>
              <div className='sidebar-widget price_range range mb-30'>
                {/* Preferences filter */}
                {filters_pref && filters_pref.length > 0 && (
                  <>
                    <div className='accordion shadow' id='accordionExample'>
                      <div className='accordion-item mb-2'>
                        <h2 className='accordion-header' id='headingOne'>
                          <button
                            className='accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseOne'
                            aria-expanded='true'
                            aria-controls='collapseOne'>
                            <span className='main_menu_filter_title'>
                              {t("filters.filterByPreferences")}
                            </span>
                          </button>
                        </h2>
                        <div
                          id='collapseOne'
                          className='accordion-collapse collapse show'
                          aria-labelledby='headingOne'
                          data-bs-parent='#accordionExample'>
                          <div className='accordion-body'>
                            <div className='list-group mb-4'>
                              <div className='list-group-item '>
                                <div className='custome-checkbox'>
                                  {filters_pref?.map((pref, index) => (
                                    <Fragment key={index}>
                                      <div className='custom_flex'>
                                        <input
                                          className='form-check-input me-2'
                                          type='checkbox'
                                          name={`checkbox-${index}`}
                                          id={`exampleCheckbox${index}`}
                                          value={pref}
                                          checked={selectedPreferences.includes(
                                            pref
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(
                                              pref,
                                              "preferences"
                                            )
                                          }
                                        />
                                        <label
                                          className='form-check-label'
                                          htmlFor={`exampleCheckbox${index}`}>
                                          <span>{pref}</span>
                                        </label>
                                      </div>
                                    </Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Tags filter */}
                {filter_tag && filter_tag.length > 0 && (
                  <>
                    <div className='accordion shadow' id='accordionExample'>
                      <div className='accordion-item'>
                        <h2 className='accordion-header mb-2' id='headingTwo'>
                          <button
                            className='accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseTwo'
                            aria-expanded='true'
                            aria-controls='collapseTwo'>
                            <span className='main_menu_filter_title'>
                              {t("filters.filterByTags")}
                            </span>
                          </button>
                        </h2>
                        <div
                          id='collapseTwo'
                          className='accordion-collapse collapse show'
                          aria-labelledby='headingTwo'
                          data-bs-parent='#accordionExample'>
                          <div className='accordion-body'>
                            <div className='list-group mb-4'>
                              <div className='list-group-item '>
                                <div className='custome-checkbox'>
                                  {filter_tag?.map((tag, index) => (
                                    <Fragment key={index}>
                                      <div className='custom_flex'>
                                        <input
                                          className='form-check-input me-2'
                                          type='checkbox'
                                          name={`tag-checkbox-${index}`}
                                          id={`exampleTagCheckbox${index}`}
                                          value={tag}
                                          checked={selectedTags.includes(tag)}
                                          onChange={() =>
                                            handleCheckboxChange(tag, "tags")
                                          }
                                        />
                                        <label
                                          className='form-check-label'
                                          htmlFor={`exampleTagCheckbox${index}`}>
                                          <span>{tag}</span>
                                        </label>
                                      </div>
                                    </Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Meal Types filter */}
                {filters_meal_type && filters_meal_type.length > 0 && (
                  <>
                    <div className='accordion shadow' id='accordionExample'>
                      <div className='accordion-item'>
                        <h2 className='accordion-header mb-2' id='headingThree'>
                          <button
                            className='accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseThree'
                            aria-expanded='true'
                            aria-controls='collapseThree'>
                            <span className='main_menu_filter_title'>
                              {t("filters.filterByMealType")}
                            </span>
                          </button>
                        </h2>
                        <div
                          id='collapseThree'
                          className='accordion-collapse collapse show'
                          aria-labelledby='headingThree'
                          data-bs-parent='#accordionExample'>
                          <div className='accordion-body'>
                            <div className='list-group mb-4'>
                              <div className='list-group-item '>
                                <div className='custome-checkbox'>
                                  {filters_meal_type?.map((mealType, index) => (
                                    <Fragment key={index}>
                                      <div className='custom_flex'>
                                        <input
                                          className='form-check-input me-2'
                                          type='checkbox'
                                          name={`meal-type-checkbox-${index}`}
                                          id={`exampleMealTypeCheckbox${index}`}
                                          value={mealType}
                                          checked={selectedMealTypes.includes(
                                            mealType
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(
                                              mealType,
                                              "mealTypes"
                                            )
                                          }
                                        />
                                        <label
                                          className='form-check-label'
                                          htmlFor={`exampleMealTypeCheckbox${index}`}>
                                          <span>{mealType}</span>
                                        </label>
                                      </div>
                                    </Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Menu cards here */}
            <div className='col-xl-9 main-content'>
              {/* Search area */}
              <div className='row mb-5 row-gap-3 row-gap-lg-0 top_bar_box shadow'>
                <div className='col-md-4'>
                  <button
                    className='filter_toggle_btn'
                    type='button'
                    data-bs-toggle='offcanvas'
                    data-bs-target='#offcanvasRight'
                    aria-controls='offcanvasRight'>
                    <IoFilter />
                  </button>

                  <span className='m-hide'></span>
                </div>

                <div className='col-md-8'>
                  <div
                    className='search_area_section'
                    dir={`${locale === "ar" ? "rtl" : ""}`}>
                    {/* Search filed to find the meal data  */}
                    <form className='form-inline d-flex align-items-center'>
                      <input
                        className='form-control'
                        type='search'
                        placeholder={t("placeholder")}
                        aria-label='Search'
                        value={searchKeyword}
                        onChange={handleSearchInputChange}
                      />
                    </form>
                  </div>
                </div>
              </div>
              {filteredMainAllMealData &&
                filteredMainAllMealData.length > 0 &&
                filteredMainAllMealData.map((mainMenuData, i) => (
                  <div className='row' key={i}>
                    <div className='weakly_box_heading mb-4'>
                      <h3>{mainMenuData?.type_of_meal}</h3>
                    </div>
                    <MainMenuPriceCard cardData={mainMenuData} />
                  </div>
                ))}

              {/* Display message if no meals found */}
              {filteredMainAllMealData?.length === 0 && (
                <div className='d-flex flex-column align-items-center justify-content-center w-100'>
                  <blockquote className='blockquote text-center'>
                    <h3 className='mb-0'>{t("notFound")}</h3>
                  </blockquote>

                  <Link href='/our-plans'>
                    <button
                      type='button'
                      class='common-btn-l-e mb-2 mb-md-0 text-center'>
                      {t("goToOurPlanBtn")}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
