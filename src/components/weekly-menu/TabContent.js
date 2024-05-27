"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import LoadMoreButton from "./LoadMoreButton";
import "./TabContent.css";
import WeeklyPopup from "./WeeklyPopup";

/**
 * @component TabContent
 * @description Renders the content for a tab, including weekly meal categories and associated meals.
 * @param {Object} props - The component props.
 * @param {Array} props.mealMenuContent - The array of meal content for the weekly menu.
 * @returns {JSX.Element} The JSX representation of the TabContent component.
 */
export default function TabContent({ mealMenuContent }) {
  const t = useTranslations("ExploreWeeklyMenu");

  const { locale } = useParams();
  // State to manage selected meal data for the modal
  const [selectedMealData, setSelectedMealData] = useState(null);
  // State to store the fetched language
  const [language, setLanguage] = useState(null);

  // State to manage the number of visible items and 'Show All' toggle
  const [visibleItems, setVisibleItems] = useState(3);
  const [showAll, setShowAll] = useState(false);

  // State to manage image loading status
  const [imageLoading, setImageLoading] = useState(true);

  /**
   * @function handleCardClick
   * @description Handles the click event on a meal card and sets the selected meal data for the modal.
   * @param {string} mealId - The identifier of the clicked meal.
   */
  const handleCardClick = (mealId) => {
    const selectedData = mealMenuContent
      .flatMap((mealContent) => mealContent.meals)
      .find((mealData) => mealData._id === mealId);

    if (selectedData) {
      setSelectedMealData(selectedData);
    }
  };

  /**
   * @function handleToggleShowMore
   * @description Handles the 'Show More' button click and toggles between displaying all items and a limited number.
   */
  const handleToggleShowMore = () => {
    setShowAll((prevShowAll) => !prevShowAll);
    // If showing less, reset visible items to initial state
    if (!showAll) {
      setVisibleItems(3);
    }
  };

  return (
    <>
      <div className="tab_all_content">
        <div className="container">
          <div className="menu_box_area">
            <div className="weakly_heading">
              <h2>{t("title")}</h2>
            </div>

            {/* Displayed when no meals are found */}
            {mealMenuContent.length === 0 && (
              <blockquote className="blockquote text-center">
                <h3 className="mb-0">{t("notFound")}</h3>
              </blockquote>
            )}

            {/* Iterating over weekly meal categories */}
            {mealMenuContent?.map((mealContent, i) => (
              <Fragment key={i}>
                <div className="weakly_box">
                  <div className="weakly_box_heading mb-4">
                    <h3>{mealContent.weekly_meal_category}</h3>
                  </div>
                  <div className="box_content">
                    {/* Iterating over meals within a category */}
                    <div className="row">
                      {mealContent?.meals
                        ?.slice(
                          0,
                          showAll ? mealContent.meals.length : visibleItems
                        )
                        ?.map((mealData, i) => {
                          const {
                            _id,
                            carbs,
                            fat,
                            protein,
                            meal_name,
                            main_badge_tag,
                            nutrition_facts: nutritionImage,
                            image,
                          } = mealData;

                          return (
                            <div
                              className="col-xl-4 custom_cursor"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              key={i}
                              onClick={() => handleCardClick(_id)}
                            >
                              {/* Meal Image */}
                              <div className="card mb-3">
                                <div className="weekly_meals_image">
                                  <Image
                                    src={`http://localhost:8000${image}`}
                                    fill="true"
                                    sizes="(min-width: 808px) 50vw, 100vw"
                                    style={{
                                      objectFit: "cover",
                                      overflow: "hidden",
                                    }}
                                    alt="MEALS IMAGE"
                                  />
                                </div>

                                {/* Badge Tag */}
                                {main_badge_tag !== "" && (
                                  <div className="image_overly_offers">
                                    <p className="bg_green_overly">
                                      {main_badge_tag}
                                    </p>
                                  </div>
                                )}

                                {/* Meal Nutrition Information */}
                                <div className="card-body">
                                  <div className="weekly_menu_item">
                                    <ul>
                                      <li>Protein : {protein}g </li>
                                      <li>Carbs : {carbs}g</li>
                                      <li>Fat : {fat}g</li>
                                    </ul>
                                  </div>
                                  <h5 className="weekly_menu_card_title">
                                    {meal_name}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    {/* 'Show More' Button */}
                    <div className="looding_button mb-5 mt-3">
                      <LoadMoreButton
                        onLoadMore={handleToggleShowMore}
                        showAll={showAll}
                        disabled={mealContent.meals.length <= 3}
                      />
                    </div>
                  </div>
                </div>

                {/* Weekly Popup Component */}
                <WeeklyPopup mealData={selectedMealData} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
