"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  useDeleteMainMealMenuMutation,
  useGetAllMainMealMenusForAdminQuery,
} from "../../../../../redux/features/queries/MAIN_MEAL_MENU_API";
import EditMainMealsModal from "./EditMainMealsModal";

const AllMainMealsTable = () => {
  const t = useTranslations("Dashboard");

  // Get the language parameter from the route
  const { locale } = useParams();

  // State variables
  const [showPerPage, setShowPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLang, setSelectedLang] = useState(locale);
  // State variable to hold the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [searchWord, setSearchWord] = useState("");
  // State variable to hold the selected meal data
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  // get main meals data for admin
  const { data, isLoading, isSuccess, refetch } =
    useGetAllMainMealMenusForAdminQuery({
      showPerPage,
      pageNo: currentPage,
      lang: selectedLang,
      searchKeyword: searchWord,
    });
  const [deleteMainMealMenu, { data: deleteMainMealData }] =
    useDeleteMainMealMenuMutation();

  // Callback function to trigger UI update
  const updateUI = () => {
    setUpdateTrigger((prevState) => !prevState);
  };

  // Function to handle successful form submission in child component
  const handleFormSubmit = () => {
    updateUI(); // Trigger UI update
    refetch(); // Refetch data to ensure it's up to date
  };
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
  // Function to handle deleting a main meal
  const handleDeleteMainMeal = (id) => {
    Swal.fire({
      title: t("ManageMainMeals.AllMainMeals.deleteMealAlert.title"),
      text: t("ManageMainMeals.AllMainMeals.deleteMealAlert.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: t(
        "ManageMainMeals.AllMainMeals.deleteMealAlert.confirmButtonText"
      ),
      cancelButtonText: t(
        "ManageMainMeals.AllMainMeals.deleteMealAlert.cancelButtonText"
      ),
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Removed!",
        text: deleteMainMealData?.message[locale],
        icon: "success",
      });

      // Call your delete main meal function here
      deleteMainMealMenu(id);
    });
  };

  // Function to handle editing a main meal
  const handleEditMainMeal = (meal) => {
    // Set the selected meal data
    setSelectedMeal(meal);
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
            <span>{t("ManageMainMeals.AllMainMeals.showPerPage.title")} :</span>
          </p>
          {/* Select for how many data per page */}
          <select className="form-select" aria-label="Default select example">
            <option value={20}>
              {t("ManageMainMeals.AllMainMeals.showPerPage.options.perPageOne")}
            </option>
            <option value={30}>
              {t("ManageMainMeals.AllMainMeals.showPerPage.options.perPageTwo")}
            </option>
            <option value={50}>
              {t(
                "ManageMainMeals.AllMainMeals.showPerPage.options.perPageThree"
              )}
            </option>
            <option value={100}>
              {t(
                "ManageMainMeals.AllMainMeals.showPerPage.options.perPageFour"
              )}
            </option>
          </select>
        </div>

        {/* Language Preference */}

        <div className="show_per_page_section">
          <p className="m-1">
            {t("ManageMainMeals.AllMainMeals.inputs.languagePreference")} :
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
            {t("ManageMainMeals.AllMainMeals.search.title")} :
          </p>
          {/* Search filed to find the user data  */}
          <form
            onSubmit={handleSearch}
            className="form-inline form d-flex align-items-center"
          >
            <input
              className="form-control search_input"
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder={t("ManageMainMeals.AllMainMeals.search.placeholder")}
              aria-label="Search"
            />
            <div className="me-2">
              <button className="search_btn" type="submit">
                <b>{t("ManageMainMeals.AllMainMeals.search.title")}</b>
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
                {t("ManageMainMeals.AllMainMeals.table.tableHead.labelOne")}
              </th>
              <th scope="col">
                {t("ManageMainMeals.AllMainMeals.table.tableHead.labelTwo")}
              </th>
              <th scope="col">
                {t("ManageMainMeals.AllMainMeals.table.tableHead.labelThree")}
              </th>
              <th scope="col">
                {t("ManageMainMeals.AllMainMeals.table.tableHead.labelFour")}
              </th>
              <th scope="col">
                {t("ManageMainMeals.AllMainMeals.table.tableHead.labelFive")}
              </th>
            </tr>
          </thead>
          {/* table body data */}
          <>
            {data?.data?.length > 0 ? (
              <tbody>
                {data?.data?.map((meal, index) => (
                  <>
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <th scope="row" className="table_image">
                        <Image
                          src={
                            meal?.image
                              ? `http://localhost:8000${meal?.image}`
                              : "/assets/meals.jpg"
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
                      <th scope="row">{meal?.preference?.value}</th>
                      <th scope="row">{meal?.type_of_meal?.value}</th>
                      <th scope="row">
                        <div className="text-center">
                          <button
                            onClick={() => handleDeleteMainMeal(meal?._id)}
                            type="button"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Delete"
                            className=" btn btn-danger me-3"
                          >
                            <RiDeleteBin6Line />
                          </button>
                          <button
                            onClick={() => handleEditMainMeal(meal)}
                            type="button"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Delete"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            className="edit_btn btn btn-success "
                          >
                            <BiEdit />
                          </button>
                        </div>
                      </th>
                    </tr>
                  </>
                ))}
                {/* modal for edit main meals */}
                <EditMainMealsModal
                  mealData={selectedMeal}
                  onFormSubmit={handleFormSubmit}
                />
              </tbody>
            ) : (
              <div className="text-center my-5 notFound_meals">
                <h4 className="text-dark ">
                  {t("ManageMainMeals.AllMainMeals.notFound")}
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
                    {t("ManageMainMeals.AllMainMeals.pagination.prev")}
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
                    {t("ManageMainMeals.AllMainMeals.pagination.next")}
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

export default dynamic(() => Promise.resolve(AllMainMealsTable), {
  ssr: false,
});
