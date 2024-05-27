"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  useDeleteWeeklyMealMenuMutation,
  useGetUpcomingWeeklyMealMenusQuery,
} from "../../../../../redux/features/queries/WEEKLY_MEAL_MENU_API";

const UpcomingWeeklyMealsTable = () => {
  const t = useTranslations("Dashboard");

  // Get the language parameter from the route
  const { locale } = useParams();

  // State variables
  const [showPerPage, setShowPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableFrom, setAvailableFrom] = useState("");
  const [unavailableFrom, setUnavailableFrom] = useState("");
  const [selectedLang, setSelectedLang] = useState(locale);
  // State variable to hold the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [searchWord, setSearchWord] = useState("");

  // API query using React Query
  const { data, isLoading } = useGetUpcomingWeeklyMealMenusQuery({
    showPerPage,
    pageNo: currentPage,
    available_from: availableFrom,
    unavailable_from: unavailableFrom,
    lang: selectedLang,
    searchKeyword: searchWord,
  });

  const [deleteWeeklyMealMenu, { data: deleteWeeklyMealMenuData }] =
    useDeleteWeeklyMealMenuMutation();

  // Get today's date
  const today = new Date();

  // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDayOfWeek = today.getDay();

  // Calculate the number of days until next Monday (assuming Monday is 1)
  let daysUntilNextMonday = 1 - currentDayOfWeek;
  if (daysUntilNextMonday <= 0) {
    daysUntilNextMonday += 7; // Add 7 days to get to the next Monday
  }

  // Create a new Date object for next Monday by adding the days until next Monday
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilNextMonday);

  // Convert dates to a readable format (e.g., YYYY-MM-DD)
  const formattedNextMonday = nextMonday.toISOString().split("T")[0];

  // Set initial values for date filters on component mount
  useEffect(() => {
    setAvailableFrom(formattedNextMonday);
    setUnavailableFrom(formattedNextMonday);
  }, []);

  // Event handlers

  /* Show per page handler */
  const handleShowPerPageChange = (e) => {
    setShowPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  /* Page change handler */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /* Available From Data handler */
  const handleAvailableFrom = (e) => {
    if (e.target.value && e.target.value < formattedNextMonday) {
      Swal.fire({
        icon: "error",
        title: `${t(
          "ManageWeeklyMeals.UpcomingWeeklyMeals.actionAlerts.AvailableFrom.title"
        )}`,
        text: `${t(
          "ManageWeeklyMeals.UpcomingWeeklyMeals.actionAlerts.AvailableFrom.text"
        )}`,
      });
      return;
    }
    setAvailableFrom(e.target.value);
  };

  /* Select lang handler */
  const handleSelectedLang = (e) => {
    setSelectedLang(e.target.value);
  };

  /* Unavailable From Data handler */
  const handleUnavailableFrom = (e) => {
    if (e.target.value && e.target.value < formattedNextMonday) {
      Swal.fire({
        icon: "error",
        title: `${t(
          "ManageWeeklyMeals.UpcomingWeeklyMeals.actionAlerts.UnavailableFrom.title"
        )}`,
        text: `${t(
          "ManageWeeklyMeals.UpcomingWeeklyMeals.actionAlerts.UnavailableFrom.text"
        )}`,
      });
      return;
    }
    setUnavailableFrom(e.target.value);
  };

  /* Delete meal handler */
  const handleDeleteUpcomingMeal = (id) => {
    Swal.fire({
      title: `${t(
        "ManageWeeklyMeals.UpcomingWeeklyMeals.actionAlerts.DeleteUpcomingMeal.title"
      )}`,
      text: `${t(
        "ManageWeeklyMeals.UpcomingWeeklyMeals.actionAlerts.DeleteUpcomingMeal.text"
      )}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: `${t(
        "ManageWeeklyMeals.UpcomingWeeklyMeals.actionAlerts.DeleteUpcomingMeal.confirmButtonText"
      )}`,
      cancelButtonText: `${t(
        "ManageWeeklyMeals.UpcomingWeeklyMeals.actionAlerts.DeleteUpcomingMeal.cancelButtonText"
      )}`,
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: `${t(
          "ManageWeeklyMeals.UpcomingWeeklyMeals.actionAlerts.DeleteUpcomingMeal.result"
        )}`,
        text: deleteWeeklyMealMenuData?.message[locale],
        icon: "success",
      });

      // Call your delete running weekly meal function here
      deleteWeeklyMealMenu(id);
    });
  };

  // Function to handle changes in the search input
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Reset search when searchKeyword is empty
  useEffect(() => {
    if (searchQuery === "") {
      setSearchWord("");
    }
  }, [searchQuery]);

  /* Search meal handler : Only by meal name */
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchWord(searchQuery);
  };

  return (
    <div>
      <div className="d-flex flex-wrap align-content-center justify-content-between mb-4">
        {/* Show per page */}
        <div className="show_per_page_section">
          <p className="m-1">
            <span>
              {t("ManageWeeklyMeals.UpcomingWeeklyMeals.showPerPage.title")} :
            </span>
          </p>
          {/* Select for how many data per page */}
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleShowPerPageChange}
          >
            <option value={20}>
              {t(
                "ManageWeeklyMeals.UpcomingWeeklyMeals.showPerPage.options.perPageOne"
              )}
            </option>
            <option value={30}>
              {t(
                "ManageWeeklyMeals.UpcomingWeeklyMeals.showPerPage.options.perPageTwo"
              )}
            </option>
            <option value={50}>
              {t(
                "ManageWeeklyMeals.UpcomingWeeklyMeals.showPerPage.options.perPageThree"
              )}
            </option>
            <option value={100}>
              {t(
                "ManageWeeklyMeals.UpcomingWeeklyMeals.showPerPage.options.perPageFour"
              )}
            </option>
          </select>
        </div>

        {/* Language Preference */}

        <div className="show_per_page_section">
          <p className="m-1">
            {t(
              "ManageWeeklyMeals.UpcomingWeeklyMeals.inputs.languagePreference"
            )}{" "}
            :
          </p>
          {/* Select for how many data per page */}
          <select
            onChange={handleSelectedLang}
            className="form-select"
            aria-label="Default select example"
          >
            <option selected={selectedLang === "ar"} value="ar">
              العربية
            </option>
            <option selected={selectedLang === "en"} value="en">
              English
            </option>
          </select>
        </div>

        {/* Order date form */}
        <div className="show_per_page_section">
          <p className="m-1">
            <span>
              {t(
                "ManageWeeklyMeals.UpcomingWeeklyMeals.inputs.datesFilter.available.title"
              )}{" "}
              :
            </span>
          </p>
          <input
            type="date"
            value={availableFrom}
            onChange={handleAvailableFrom}
            className="form-control"
          />
        </div>

        {/* Order date end */}
        <div className="show_per_page_section">
          <p className="m-1">
            <span>
              {t(
                "ManageWeeklyMeals.UpcomingWeeklyMeals.inputs.datesFilter.unavailable.title"
              )}{" "}
              :
            </span>
          </p>
          <input
            type="date"
            value={unavailableFrom}
            onChange={handleUnavailableFrom}
            className="form-control"
          />
        </div>
        {/* Global search */}
        <div className="search_area_section">
          <p className="m-1">
            {t("ManageWeeklyMeals.UpcomingWeeklyMeals.search.title")} :
          </p>
          {/* Search filed to find the user data  */}
          <form
            onSubmit={handleSearch}
            className="form-inline form d-flex align-items-center"
          >
            <input
              className="form-control"
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder={t(
                "ManageWeeklyMeals.UpcomingWeeklyMeals.search.placeholder"
              )}
              aria-label="Search"
            />
            <div className="me-2">
              <button className="search_btn" type="submit">
                <b>{t("ManageWeeklyMeals.UpcomingWeeklyMeals.search.title")}</b>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* table */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          {/* table head data */}
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                {t("ManageWeeklyMeals.UpcomingWeeklyMeals.tableHead.labelOne")}
              </th>

              <th scope="col">
                {t("ManageWeeklyMeals.UpcomingWeeklyMeals.tableHead.labelTwo")}
              </th>

              <th scope="col">
                {t(
                  "ManageWeeklyMeals.UpcomingWeeklyMeals.tableHead.labelThree"
                )}
              </th>

              <th scope="col">
                {t("ManageWeeklyMeals.UpcomingWeeklyMeals.tableHead.labelFour")}
              </th>

              <th scope="col">
                {t("ManageWeeklyMeals.UpcomingWeeklyMeals.tableHead.labelFive")}
              </th>

              <th scope="col">
                {t("ManageWeeklyMeals.UpcomingWeeklyMeals.tableHead.labelSix")}
              </th>
            </tr>
          </thead>
          {/* table body data */}
          <>
            {data?.data?.length > 0 ? (
              <tbody>
                {data?.data?.map((meal, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <th scope="row" className="table_image">
                      <Image
                        src={`http://localhost:8000${meal?.image}`}
                        fill="true"
                        sizes="(min-width: 808px) 50vw, 100vw"
                        style={{
                          objectFit: "cover", // cover, contain, none
                        }}
                        alt="Meals Image"
                      />
                    </th>
                    <th scope="row" style={{ width: "300px" }}>
                      {meal?.meal_name}
                    </th>
                    <th scope="row">{meal?.category}</th>
                    <th scope="row">{meal?.available_from.slice(0, 10)}</th>
                    <th scope="row">{meal?.unavailable_from.slice(0, 10)}</th>
                    <th scope="row">
                      <div className="text-center">
                        <button
                          onClick={() => handleDeleteUpcomingMeal(meal?._id)}
                          type="button"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Delete"
                          className="delete_btn"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div
                className={`text-center  my-5 ${
                  locale === "ar" ? "notFound_meals_arabic " : "notFound_meals"
                }`}
              >
                <h4 className="text-dark ">
                  {t("ManageWeeklyMeals.UpcomingWeeklyMeals.notFound")}
                </h4>
              </div>
            )}
          </>
        </table>
      </div>

      {/* showing data count and pagination */}
      {!isLoading && data?.data?.length > 0 && (
        <div className="my-5 w-100 d-flex  align-content-center justify-content-between">
          {/* Showing 0 - 0 out of 0 items */}
          <div>
            {locale === "ar" ? (
              // Arabic
              <figcaption className="blockquote-footer m-0">
                <b>{data?.showingArabic}</b>
              </figcaption>
            ) : (
              // English
              <figcaption className="blockquote-footer m-0">
                {data?.showingEnglish}
              </figcaption>
            )}
          </div>

          {/* pagination */}
          <div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {/* Previous page button */}
                <li
                  className={`page-item prev_btn ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    {t("ManageWeeklyMeals.UpcomingWeeklyMeals.pagination.prev")}
                  </a>
                </li>
                {data?.totalPages?.map((page) => (
                  <li
                    key={page}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </a>
                  </li>
                ))}

                {/* Next page button */}
                <li
                  className={`page-item next_btn ${
                    currentPage === data?.totalPages?.length ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    {t("ManageWeeklyMeals.UpcomingWeeklyMeals.pagination.next")}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(UpcomingWeeklyMealsTable), {
  ssr: false,
});
