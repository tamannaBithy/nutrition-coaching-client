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
  useGetRunningWeeklyMealMenusQuery,
} from "../../../../../redux/features/queries/WEEKLY_MEAL_MENU_API";

const RunningWeeklyMealsTable = () => {
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
  // State to store weekly meal category data
  const [weeklyMealCategoryData, setWeeklyMealCategoryData] = useState([]);
  const [weeklyMealCategoryLoading, setWeeklyMealCategoryLoading] =
    useState(true);
  // API query using React Query
  const { data, isLoading } = useGetRunningWeeklyMealMenusQuery({
    showPerPage,
    pageNo: currentPage,
    lang: selectedLang,
    searchKeyword: searchWord,
  });

  const [deleteWeeklyMealMenu, { data: deleteWeeklyMealMenuData }] =
    useDeleteWeeklyMealMenuMutation();

  // Event handlers
  const handleShowPerPageChange = (e) => {
    setShowPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectedLang = (e) => {
    setSelectedLang(e.target.value);
  };

  // Function to handle changes in the search input
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteRunningMeal = (id) => {
    Swal.fire({
      title: `${t("ManageWeeklyMeals.RunningWeeklyMeals.actionAlerts.title")}`,
      text: `${t("ManageWeeklyMeals.RunningWeeklyMeals.actionAlerts.text")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: `${t(
        "ManageWeeklyMeals.RunningWeeklyMeals.actionAlerts.confirmButtonText"
      )}`,
      cancelButtonText: `${t(
        "ManageWeeklyMeals.RunningWeeklyMeals.actionAlerts.cancelButtonText"
      )}`,
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: `${t(
          "ManageWeeklyMeals.RunningWeeklyMeals.actionAlerts.result"
        )}`,
        text: deleteWeeklyMealMenuData?.message[locale],
        icon: "success",
      });

      // Call your delete running weekly meal function here
      deleteWeeklyMealMenu(id);
    });
  };

  // Reset search when searchKeyword is empty
  useEffect(() => {
    if (searchQuery === "") {
      setSearchWord("");
    }
  }, [searchQuery]);

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
              {t("ManageWeeklyMeals.RunningWeeklyMeals.showPerPage.title")} :
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
                "ManageWeeklyMeals.RunningWeeklyMeals.showPerPage.options.perPageOne"
              )}
            </option>
            <option value={30}>
              {t(
                "ManageWeeklyMeals.RunningWeeklyMeals.showPerPage.options.perPageTwo"
              )}
            </option>
            <option value={50}>
              {t(
                "ManageWeeklyMeals.RunningWeeklyMeals.showPerPage.options.perPageThree"
              )}
            </option>
            <option value={100}>
              {t(
                "ManageWeeklyMeals.RunningWeeklyMeals.showPerPage.options.perPageFour"
              )}
            </option>
          </select>
        </div>

        {/* Language Preference */}

        <div className="show_per_page_section">
          <p className="m-1">
            {t(
              "ManageWeeklyMeals.RunningWeeklyMeals.inputs.languagePreference"
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

        {/* Global search */}
        <div className="search_area_section">
          <p className="m-1">
            {t("ManageWeeklyMeals.RunningWeeklyMeals.search.title")} :{" "}
          </p>
          {/* Search filed to find the user data  */}
          <form
            onSubmit={handleSearch}
            className="form-inline d-flex align-items-center form"
          >
            <input
              className="form-control search_input"
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder={t(
                "ManageWeeklyMeals.RunningWeeklyMeals.search.placeholder"
              )}
              aria-label="Search"
            />
            <div className="me-2">
              <button className="search_btn" type="submit">
                <b>{t("ManageWeeklyMeals.RunningWeeklyMeals.search.title")} </b>
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
                {t("ManageWeeklyMeals.RunningWeeklyMeals.tableHead.labelOne")}
              </th>
              <th scope="col">
                {t("ManageWeeklyMeals.RunningWeeklyMeals.tableHead.labelTwo")}
              </th>
              <th scope="col">
                {t("ManageWeeklyMeals.RunningWeeklyMeals.tableHead.labelThree")}
              </th>
              <th scope="col">
                {t("ManageWeeklyMeals.RunningWeeklyMeals.tableHead.labelFour")}
              </th>
              <th scope="col">
                {t("ManageWeeklyMeals.RunningWeeklyMeals.tableHead.labelFive")}
              </th>
              <th scope="col">
                {t("ManageWeeklyMeals.RunningWeeklyMeals.tableHead.labelSix")}
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
                        src={
                          meal?.image
                            ? `http://localhost:8000${meal?.image}`
                            : ""
                        }
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
                          onClick={() => handleDeleteRunningMeal(meal?._id)}
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
              <div className="text-center  my-5 notFound_meals">
                <h4 className="text-dark ">
                  {t("ManageWeeklyMeals.RunningWeeklyMeals.notFound")}
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
                    {t("ManageWeeklyMeals.RunningWeeklyMeals.pagination.prev")}
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
                    {t("ManageWeeklyMeals.RunningWeeklyMeals.pagination.next")}
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

export default dynamic(() => Promise.resolve(RunningWeeklyMealsTable), {
  ssr: false,
});
