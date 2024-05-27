"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetAllWeeklyMealMenusQuery } from "../../../redux/features/queries/WEEKLY_MEAL_MENU_API";
import TabContent from "./TabContent";

/**
 * @component WeeklyMenuItems
 * @description Renders a weekly menu with tabs and corresponding meal content.
 * @returns {JSX.Element} The JSX representation of the WeeklyMenuItems component.
 */
export default function WeeklyMenuItems() {
  const { locale } = useParams();

  // State to manage the active tab
  const [toggle, setToggle] = useState(1);

  /**
   * @function handleTabToggle
   * @description Handles the click event on a tab and sets the active tab.
   * @param {number} id - The identifier of the clicked tab.
   */
  function handleToggle(id) {
    setToggle(id);
  }

  // Fetch weekly menu data using a query
  const {
    data: weeklyMealMenuData,
    error,
    isLoading,
  } = useGetAllWeeklyMealMenusQuery({ lang: locale });

  return (
    <>
      {/* Loader */}
      {isLoading && (
        <div className='d-flex align-items-center justify-content-center my-5'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}

      {/* Tabbed content */}
      <div className='tab_all_content'>
        {/* Tabs */}
        <div className='menu_tab'>
          <ul className='tablist'>
            {weeklyMealMenuData?.data?.map((weekData, index) => (
              <li
                key={index}
                className={`${toggle === index + 1 ? "tab_active" : ""} px-4`}
                onClick={() => handleToggle(index + 1)}>
                <h5>
                  {weekData?.week?.slice(0, 3)}
                  <br />
                  {weekData?.week?.slice(3)}
                </h5>
              </li>
            ))}
          </ul>
        </div>
        {/* Display content for the active tab */}
        {weeklyMealMenuData?.data?.map(
          (mealMenuContent, index) =>
            toggle === index + 1 && (
              <TabContent
                key={index}
                mealMenuContent={mealMenuContent?.meals_with_category}
              />
            )
        )}
      </div>
    </>
  );
}
