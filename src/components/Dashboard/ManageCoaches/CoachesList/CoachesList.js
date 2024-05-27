"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  useDeleteInstructorMutation,
  useGetAllInstructorsForAdminQuery,
} from "../../../../../redux/features/queries/INSTRUCTOR_API";
import "./CoachesList.css";
import UpdateCoachModal from "./UpdateCoachModal";

const CoachesList = () => {
  const t = useTranslations("Dashboard");
  const { locale } = useParams();

  // State to store the fetched language
  const [updateTrigger, setUpdateTrigger] = useState(false);
  // State variables for image loading
  const [imageLoading, setImageLoading] = useState(true);
  const [showPerPage, setShowPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  // State variable to hold the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [langPref, setLangPref] = useState("en");
  const [selectedCoach, setSelectedCoach] = useState("");

  const [deleteInstructor] = useDeleteInstructorMutation();

  // Fetching data via RTK query
  const {
    data: coachesData,
    error,
    isLoading,
    refetch,
  } = useGetAllInstructorsForAdminQuery({
    showPerPage,
    pageNo,
    lang: locale,
    searchKeyword: searchWord,
  });

  // Callback function to trigger UI update
  const updateUI = () => {
    setUpdateTrigger((prevState) => !prevState);
  };

  // Function to handle successful form submission in child component
  const handleFormSubmit = () => {
    updateUI(); // Trigger UI update
    refetch(); // Refetch data to ensure it's up to date
  };
  // Function to handle changes in the search input
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // Function to handle changes in "Show per page" dropdown
  const handleShowPerPageChange = (e) => {
    setShowPerPage(Number(e.target.value));
    setPageNo(1); // Reset to the first page when changing show per page
  };

  // Event handler for language preference select
  const handleLanguageChange = (e) => {
    setLangPref(e.target.value);
  };
  // Function to handle page changes
  const handlePageChange = (page) => {
    setPageNo(page);
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

  // Delete coach handler
  const handleDeleteCoach = (id) => {
    Swal.fire({
      title: t("ManageDiscounts.swal.title"),
      text: t("ManageDiscounts.swal.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: t("ManageDiscounts.swal.confirmButtonText"),
      cancelButtonText: t("ManageDiscounts.swal.cancelButtonText"),
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      // Call your delete main meal function here
      const { data } = await deleteInstructor(id);
      if (data?.status) {
        Swal.fire({
          title: "Removed!",
          text: data?.message[locale],
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Opps! Error delete coach",
          text: data?.message[locale],
          icon: "error",
        });
      }
    });
  };

  //Edit coach handler
  const handlerEditCoach = (coachData) => {
    setSelectedCoach(coachData);
  };

  return (
    <>
      {/* Page Title */}
      <div className="all_coach_title ">
        <h2>{t("ManageCoach.listCoach.pageTitle")}</h2>
      </div>

      <div className="py-3">
        <div className="pt-4">
          <div className="d-flex flex-wrap align-content-center justify-content-between mb-4">
            {/* Show per page */}
            <div className="show_per_page_section">
              <p className="m-1">
                {t("ManageCoach.listCoach.showPerPage.title")}
              </p>
              {/* Select for how many data per page */}
              <select
                className="form-select"
                aria-label="Default select example"
                value={showPerPage}
                onChange={handleShowPerPageChange}
              >
                <option value={20}>
                  {t("ManageCoach.listCoach.showPerPage.options.perPageOne")}
                </option>
                <option value={30}>
                  {t("ManageCoach.listCoach.showPerPage.options.perPageTwo")}
                </option>
                <option value={50}>
                  {t("ManageCoach.listCoach.showPerPage.options.perPageThree")}
                </option>
                <option value={100}>
                  {t("ManageCoach.listCoach.showPerPage.options.perPageFour")}
                </option>
              </select>
            </div>

            {/* Language Preference */}
            <div className="show_per_page_section">
              <p className="m-1">
                {t("ManageCoach.listCoach.languagePreference")}
              </p>
              {/* Select for how many data per page */}
              <select
                className="form-select"
                aria-label="Default select example"
                value={langPref}
                onChange={handleLanguageChange}
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Global search */}
            <div className="search_area_section">
              <p className="m-1 ">{t("ManageCoach.listCoach.search.title")}</p>
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
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="me-2">
                  <button className="search_btn" type="submit">
                    <b> {t("ManageCoach.listCoach.search.title")} </b>
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
                    {t("ManageCoach.listCoach.tableHead.labelOne")}
                  </th>
                  <th scope="col">
                    {t("ManageCoach.listCoach.tableHead.labelTwo")}
                  </th>
                  <th scope="col">
                    {t("ManageCoach.listCoach.tableHead.labelThree")}
                  </th>
                  <th scope="col">
                    {t("ManageCoach.listCoach.tableHead.labelFour")}
                  </th>
                  <th scope="col">
                    {t("ManageCoach.listCoach.tableHead.labelFive")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {coachesData?.data?.length > 0 ? (
                  <>
                    {coachesData?.data?.map((coachData, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td className="table_image">
                          <Image
                            src={`http://localhost:8000${coachData?.image}`}
                            alt="instructor image"
                            fill="true"
                            sizes="(min-width: 808px) 50vw, 100vw"
                            onLoad={() => setImageLoading(false)}
                            onError={() => setImageLoading(false)}
                          />
                        </td>
                        <td>{coachData?.instructor_name}</td>
                        <td>{coachData?.instructor_qualification}</td>
                        <td>
                          <button
                            className="coach_tooltip "
                            data-toggle="tooltip"
                            data-placement="top"
                            title={coachData?.instructor_details}
                          >
                            {coachData?.instructor_details.slice(0, 45)}...
                          </button>{" "}
                        </td>

                        <td>
                          <div className="d-flex gap-1 align-items-center">
                            <div>
                              <button
                                onClick={() => handlerEditCoach(coachData)}
                                data-toggle="tooltip"
                                type="button"
                                data-placement="left"
                                title="Edit"
                                className="edit_btn"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop6"
                              >
                                <FiEdit style={{ color: "#fff" }} />
                              </button>
                            </div>

                            <div>
                              <button
                                onClick={() =>
                                  handleDeleteCoach(coachData?._id)
                                }
                                type="button"
                                data-toggle="tooltip"
                                data-placement="right"
                                title="Delete"
                                className="delete_btn"
                              >
                                <RiDeleteBin6Line style={{ color: "#fff" }} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <div className="mt-5 fw-bolder">
                    {t("ManageCoach.listCoach.notFound")}
                  </div>
                )}

                {/* Edit coach modal */}
                <UpdateCoachModal
                  coachData={selectedCoach}
                  onFormSubmit={handleFormSubmit}
                />
              </tbody>
            </table>
          </div>

          {/* Loader */}
          {isLoading && (
            <div className="my-5 d-flex align-items-center justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* showing data count and pagination */}
          {!isLoading && coachesData?.data?.length > 0 && (
            <div className="my-5 w-100 d-flex  align-content-center justify-content-between">
              {/* Showing 0 - 0 out of 0 items */}
              <div>
                {locale === "ar" ? (
                  // Arabic
                  <figcaption className="blockquote-footer m-0">
                    <b>{coachesData?.showingArabic}</b>
                  </figcaption>
                ) : (
                  // English
                  <figcaption className="blockquote-footer m-0">
                    {coachesData?.showingEnglish}
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
                        pageNo === 1 ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => handlePageChange(pageNo - 1)}
                        tabIndex="-1"
                        aria-disabled="true"
                      >
                        {t("ManageCoach.listCoach.pagination.prev")}
                      </a>
                    </li>
                    {coachesData?.totalPages?.map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          pageNo === page ? "active" : ""
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
                        pageNo === coachesData?.totalPages?.length
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => handlePageChange(pageNo + 1)}
                      >
                        {t("ManageCoach.listCoach.pagination.next")}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(CoachesList), {
  ssr: false,
});
