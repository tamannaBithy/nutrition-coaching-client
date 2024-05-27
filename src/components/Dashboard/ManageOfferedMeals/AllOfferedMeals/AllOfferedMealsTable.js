"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  useDeleteOfferedMealMutation,
  useGetAllOfferedMealsDashboardQuery,
} from "../../../../../redux/features/queries/OFFERED_MEALS_API";

const AllOfferedMealsTable = () => {
  const t = useTranslations("Dashboard");

  const { locale: lang } = useParams();
  const [showPerPage, setShowPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLang, setSelectedLang] = useState(lang);
  // State variable to hold the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const { data: offeredMealData, isLoading } =
    useGetAllOfferedMealsDashboardQuery({
      showPerPage,
      pageNo: currentPage,
      lang: selectedLang,
      searchKeyword: searchWord,
    });

  const [deleteOfferedMeal, { data: deleteOfferedMealData }] =
    useDeleteOfferedMealMutation();
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchWord(searchQuery);
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

  const handleDeleteOfferedMeal = (offeredMealId) => {
    Swal.fire({
      title: `${t("ManageOfferedMeals.AllOfferedMeals.deleteAlertMsg.title")}`,
      text: `${t("ManageOfferedMeals.AllOfferedMeals.deleteAlertMsg.text")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: `${t(
        "ManageOfferedMeals.AllOfferedMeals.deleteAlertMsg.confirmButtonText"
      )}`,
      cancelButtonText: `${t(
        "ManageOfferedMeals.AllOfferedMeals.deleteAlertMsg.cancelButtonText"
      )}`,
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: `${t(
          "ManageOfferedMeals.AllOfferedMeals.deleteAlertMsg.result"
        )}`,
        text: deleteOfferedMealData?.message[locale],
        icon: "success",
      });

      // Call your delete  meal function here
      deleteOfferedMeal({
        mealId: offeredMealId,
      });
    });
  };

  return (
    <div>
      <div className="d-flex flex-wrap align-content-center justify-content-between mb-4">
        {/* Show per page */}
        <div className="show_per_page_section">
          <p className="m-1">
            <span>
              {t("ManageOfferedMeals.AllOfferedMeals.showPerPage.title")} :
            </span>
          </p>
          {/* Select for how many data per page */}
          <select
            className="form-select"
            onChange={handleShowPerPageChange}
            value={showPerPage}
            aria-label="Default select example"
          >
            <option value={20}>
              {t(
                "ManageOfferedMeals.AllOfferedMeals.showPerPage.options.perPageOne"
              )}
            </option>
            <option value={30}>
              {t(
                "ManageOfferedMeals.AllOfferedMeals.showPerPage.options.perPageTwo"
              )}
            </option>
            <option value={50}>
              {t(
                "ManageOfferedMeals.AllOfferedMeals.showPerPage.options.perPageThree"
              )}
            </option>
            <option value={100}>
              {t(
                "ManageOfferedMeals.AllOfferedMeals.showPerPage.options.perPageFour"
              )}
            </option>
          </select>
        </div>

        {/* Language Preference */}

        <div className="show_per_page_section">
          <p className="m-1">
            {t("ManageOfferedMeals.AllOfferedMeals.languagePreference")} :
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
            {t("ManageOfferedMeals.AllOfferedMeals.search.title")} :{" "}
          </p>
          {/* Search filed to find the user data  */}
          <form
            onSubmit={handleSearch}
            className="form-inline d-flex align-items-center"
          >
            <input
              className="form-control search_input"
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder={t(
                "ManageOfferedMeals.AllOfferedMeals.search.placeholder"
              )}
              aria-label="Search"
            />
            <div className="me-2">
              <button className="search_btn" type="submit">
                <b> {t("ManageOfferedMeals.AllOfferedMeals.search.title")} </b>
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
                {t(
                  "ManageOfferedMeals.AllOfferedMeals.table.tableHead.labelOne"
                )}
              </th>
              <th scope="col">
                {t(
                  "ManageOfferedMeals.AllOfferedMeals.table.tableHead.labelTwo"
                )}
              </th>
              <th scope="col">
                {t(
                  "ManageOfferedMeals.AllOfferedMeals.table.tableHead.labelThree"
                )}
              </th>
              <th scope="col">
                {" "}
                {t(
                  "ManageOfferedMeals.AllOfferedMeals.table.tableHead.labelFour"
                )}
              </th>
            </tr>
          </thead>
          {/* table body data */}
          <>
            {offeredMealData?.data?.length > 0 ? (
              <tbody>
                {offeredMealData?.data?.map((offeredMeal, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row" className="table_image">
                      <Image
                        src={
                          offeredMeal?.package_image
                            ? `http://localhost:8000${offeredMeal?.package_image}`
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
                    <th scope="row">{offeredMeal?.package_name}</th>
                    <th scope="row">{offeredMeal?.category}</th>
                    <th scope="row">
                      <div className="text-center">
                        <button
                          onClick={() =>
                            handleDeleteOfferedMeal(offeredMeal?._id)
                          }
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
                  {t("ManageOfferedMeals.AllOfferedMeals.notFound")}
                </h4>
              </div>
            )}
          </>
        </table>
      </div>

      {/* showing data count and pagination */}
      {!isLoading && offeredMealData?.data?.length > 0 && (
        <div className="my-5 w-100 d-flex  align-content-center justify-content-between">
          {/* Showing 0 - 0 out of 0 items */}
          <div>
            {lang === "ar" ? (
              // Arabic
              <figcaption className="blockquote-footer m-0">
                <b>{offeredMealData?.showingArabic}</b>
              </figcaption>
            ) : (
              // English
              <figcaption className="blockquote-footer m-0">
                {offeredMealData?.showingEnglish}
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
                    {t("ManageOfferedMeals.AllOfferedMeals.pagination.prev")}
                  </a>
                </li>
                {offeredMealData?.totalPages?.map((page) => (
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
                    currentPage === offeredMealData?.totalPages?.length
                      ? "disabled"
                      : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    {t("ManageOfferedMeals.AllOfferedMeals.pagination.next")}
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

export default dynamic(() => Promise.resolve(AllOfferedMealsTable), {
  ssr: false,
});
