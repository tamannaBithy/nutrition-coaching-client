"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  useDeleteCustomizedMealMutation,
  useGetAdminCustomizedMealsQuery,
} from "../../../../../redux/features/queries/CUSTOMIZED_MEAL_API";

const AllCustomizedMealsTable = () => {
  const t = useTranslations("Dashboard");

  const { locale: lang } = useParams();

  const [
    deleteCustomizedMeal,
    { data: deleteCustomizedMealData, isSuccess, isError },
  ] = useDeleteCustomizedMealMutation();

  const [showPerPage, setShowPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLang, setSelectedLang] = useState(lang);
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search query
  const { data, isLoading, refetch } = useGetAdminCustomizedMealsQuery({
    showPerPage,
    pageNo: currentPage,
    lang: selectedLang,
    searchKeyword: searchQuery,
  });

  //handle delete customized meal
  const handleDelete = (id) => {
    Swal.fire({
      title: t(
        "ManageCustomizedMeals.AllCustomizedMeals.inputs.deleteAlertMsg.title"
      ),
      text: t(
        "ManageCustomizedMeals.AllCustomizedMeals.inputs.deleteAlertMsg.text"
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: t(
        "ManageCustomizedMeals.AllCustomizedMeals.inputs.deleteAlertMsg.confirmButtonText"
      ),
      cancelButtonText: t(
        "ManageCustomizedMeals.AllCustomizedMeals.inputs.deleteAlertMsg.cancelButtonText"
      ),
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Removed!",
        text: deleteCustomizedMealData.message[lang],
        icon: "success",
      });

      // Call your delete customized meal function here
      deleteCustomizedMeal(id);
    });
  };

  //handle language preference select change
  const handleSelectedLang = (e) => {
    setSelectedLang(e.target.value);
  };

  // Event handlers
  const handleShowPerPageChange = (e) => {
    setShowPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Event handler for search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="customized-meal-form-main">
      <div className="title d-flex justify-content-between align-items-center">
        <h2>{t("ManageCustomizedMeals.AllCustomizedMeals.pageTitle")}</h2>
      </div>
      <div className="d-flex flex-wrap flex-column flex-sm-row row-gap-2 row-gap-md-0 align-content-center justify-content-between mb-4">
        {/* Show per page */}
        <div className="show_per_page_section">
          <p className="m-1">
            <span>
              {t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.showPerPage.title"
              )}{" "}
              :
            </span>
          </p>
          {/* Select for how many data per page */}
          <select
            onChange={handleShowPerPageChange}
            className="form-select"
            aria-label="Default select example"
          >
            <option value={20}>
              {t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.showPerPage.options.perPageOne"
              )}
            </option>
            <option value={30}>
              {t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.showPerPage.options.perPageTwo"
              )}
            </option>
            <option value={50}>
              {t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.showPerPage.options.perPageThree"
              )}
            </option>
            <option value={100}>
              {t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.showPerPage.options.perPageFour"
              )}
            </option>
          </select>
        </div>

        <div className="show_per_page_section">
          <p className="m-1">
            {t(
              "ManageCustomizedMeals.AllCustomizedMeals.inputs.languagePreference"
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
            {t("ManageCustomizedMeals.AllCustomizedMeals.inputs.search.title")}{" "}
            :
          </p>
          {/* Search filed to find the user data  */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="form-inline d-flex align-items-center"
          >
            <input
              className="form-control"
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder={t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.search.placeholder"
              )}
              aria-label="Search"
            />
            <div className="ms-2">
              <button className="search_btn" type="submit">
                <b>
                  {" "}
                  {t(
                    "ManageCustomizedMeals.AllCustomizedMeals.inputs.search.title"
                  )}{" "}
                </b>
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
                  "ManageCustomizedMeals.AllCustomizedMeals.inputs.table.tableHead.labelOne"
                )}
              </th>
              <th scope="col">
                {t(
                  "ManageCustomizedMeals.AllCustomizedMeals.inputs.table.tableHead.labelTwo"
                )}
              </th>
              <th scope="col">
                {t(
                  "ManageCustomizedMeals.AllCustomizedMeals.inputs.table.tableHead.labelThree"
                )}
              </th>
              <th scope="col">
                {t(
                  "ManageCustomizedMeals.AllCustomizedMeals.inputs.table.tableHead.labelFour"
                )}
              </th>
            </tr>
          </thead>

          <>
            {data?.data?.length > 0 ? (
              <tbody>
                {data?.data?.map((meal, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
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
                    <th scope="row">{meal?.meal_name}</th>
                    <td scope="row">{meal?.select_diet}</td>
                    <th scope="row">
                      <div className="text-start">
                        <button
                          onClick={() => handleDelete(meal._id)}
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
                  {t("ManageCustomizedMeals.AllCustomizedMeals.notFound")}
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
            {lang === "ar" ? (
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
                    {t(
                      "ManageCustomizedMeals.AllCustomizedMeals.inputs.pagination.prev"
                    )}
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
                    {t(
                      "ManageCustomizedMeals.AllCustomizedMeals.inputs.pagination.next"
                    )}
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

export default dynamic(() => Promise.resolve(AllCustomizedMealsTable), {
  ssr: false,
});
