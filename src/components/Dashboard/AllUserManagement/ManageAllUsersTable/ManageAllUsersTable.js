"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useDisableOrEnableUserByIdMutation,
  useGetAllUsersQuery,
} from "../../../../../redux/features/queries/USER_API";
import "./ManageAllUsersTable.css";

import { useTranslations } from "next-intl";

const ManageAllUsersTable = () => {
  const t = useTranslations("Dashboard");
  const { locale } = useParams();

  const [showPerPage, setShowPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [words, setWords] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [disableOrEnableUser, setDisableOrEnableUser] = useState(false);

  // Fetching data via RTK query
  const {
    data: userData,
    error,
    isLoading,
  } = useGetAllUsersQuery({
    showPerPage,
    pageNo: currentPage,
    searchKeyword: words,
  });

  //mutation for User Disable Or Enable
  const [disableOrEnableUserById, { data: disableOrEnableUserData }] =
    useDisableOrEnableUserByIdMutation();

  // Function to handle changes in "Show per page" dropdown
  const handleShowPerPageChange = (e) => {
    setShowPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing show per page
  };

  // Function to handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWords(searchKeyword);
  };

  // Reset search when searchKeyword is empty
  useEffect(() => {
    if (searchKeyword === "") {
      setWords("");
    }
  }, [searchKeyword]);

  const handleChangeDisableUser = (userId) => {
    Swal.fire({
      title: `${t("ManageAllUser.actionAlerts.disableUser.title")}`,
      text: `${t("ManageAllUser.actionAlerts.disableUser.text")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: `${t(
        "ManageAllUser.actionAlerts.disableUser.confirmButtonText"
      )}`,
      cancelButtonText: `${t(
        "ManageAllUser.actionAlerts.disableUser.cancelButtonText"
      )}`,
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: `${t("ManageAllUser.actionAlerts.disableUser.result")}`,
        text: disableOrEnableUserData?.message[locale],
        icon: "success",
      });

      // Call your delete running weekly meal function here
      disableOrEnableUserById(userId);
    });
  };

  const handleChangeEnableUser = (userId) => {
    Swal.fire({
      title: `${t("ManageAllUser.actionAlerts.enableUser.title")}`,
      text: `${t("ManageAllUser.actionAlerts.enableUser.text")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: `${t(
        "ManageAllUser.actionAlerts.enableUser.confirmButtonText"
      )}`,
      cancelButtonText: `${t(
        "ManageAllUser.actionAlerts.enableUser.cancelButtonText"
      )}`,
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: `${t("ManageAllUser.actionAlerts.enableUser.result")}`,
        text: disableOrEnableUserData?.message[locale],
        icon: "success",
      });

      // Call your delete running weekly meal function here
      disableOrEnableUserById(userId);
    });
  };

  return (
    !isLoading && (
      <div className='pt-4'>
        <div className='d-flex flex-wrap align-content-center justify-content-between mb-4'>
          {/* Show per page */}
          <div className='show_per_page_section'>
            <p className='m-1'>
              <span>{t("ManageAllUser.showPerPage")} :</span>
            </p>
            {/* Select for how many data per page */}
            <select
              className='form-select'
              aria-label='Default select example'
              value={showPerPage}
              onChange={handleShowPerPageChange}>
              <option value={20}>
                {t("ManageAllUser.showPerPageOptions.perPageOne")}
              </option>
              <option value={30}>
                {t("ManageAllUser.showPerPageOptions.perPageTwo")}
              </option>
              <option value={50}>
                {t("ManageAllUser.showPerPageOptions.perPageThree")}
              </option>
              <option value={100}>
                {t("ManageAllUser.showPerPageOptions.perPageFour")}
              </option>
            </select>
          </div>

          {/* Global search */}
          <div className='search_area_section'>
            <p className='m-1'>{t("ManageAllUser.search.title")}: </p>
            {/* Search filed to find the user data  */}
            <form
              className='form-inline d-flex align-items-center'
              onSubmit={handleSubmit}>
              <input
                className='form-control'
                type='search'
                placeholder={t("ManageAllUser.search.placeholder")}
                aria-label='Search'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <div className='me-2'>
                <button className='search_btn' type='submit'>
                  <b>{t("ManageAllUser.search.title")}</b>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* table */}
        <div className='table-responsive'>
          <table className='table table-hover table-bordered'>
            {/* table head data */}
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>{t("ManageAllUser.tableHead.one")}</th>
                <th scope='col'>{t("ManageAllUser.tableHead.two")}</th>
                <th scope='col'>{t("ManageAllUser.tableHead.three")}</th>
                <th scope='col'>{t("ManageAllUser.tableHead.four")}</th>
                <th scope='col'>{t("ManageAllUser.tableHead.five")}</th>
                <th scope='col'>{t("ManageAllUser.tableHead.six")}</th>
                <th scope='col'>{t("ManageAllUser.tableHead.seven")}</th>
                <th scope='col'>{t("ManageAllUser.tableHead.eight")}</th>
                <th scope='col'>{t("ManageAllUser.tableHead.nine")}</th>
              </tr>
            </thead>
            {/* table body data */}
            <tbody>
              {userData?.data?.map((user, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{user?.name || "N/A"}</td>
                  <td>{user?.role} </td>
                  <td>{user?.gender || "N/A"}</td>
                  <td>{user?.phone || "N/A"}</td>
                  <td>{user?.email || "N/A"}</td>
                  <td>{user?.province || "N/A"}</td>
                  <td>{user?.district || "N/A"}</td>
                  <td>{user?.verified ? "True" : "False"}</td>
                  <td>
                    <div className='form-check form-switch pt-2'>
                      {user?.role !== "admin" && (
                        <input
                          className='form-check-input'
                          type='checkbox'
                          id='flexSwitchCheckChecked'
                          checked={user?.disabled_by_admin}
                          name='visible'
                          onChange={() =>
                            user?.disabled_by_admin === false
                              ? handleChangeDisableUser(user?._id)
                              : handleChangeEnableUser(user?._id)
                          }
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Loader */}
        {isLoading && (
          <div className='d-flex align-items-center justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        )}

        {/* showing data count and pagination */}
        {!isLoading && userData?.data?.length > 0 && (
          <div className='my-5 w-100 d-flex flex-column flex-md-row row-gap-2 row-gap-md-0  align-content-center justify-content-between'>
            {/* Showing 0 - 0 out of 0 items */}
            <div>
              {locale === "ar" ? (
                // Arabic
                <figcaption className='blockquote-footer m-0'>
                  <b>{userData?.showingArabic}</b>
                </figcaption>
              ) : (
                // English
                <figcaption className='blockquote-footer m-0'>
                  {userData?.showingEnglish}
                </figcaption>
              )}
            </div>

            {/* pagination */}
            <div>
              <nav aria-label='Page navigation example'>
                <ul className='pagination'>
                  {/* Previous page button */}
                  <li
                    className={`page-item prev_btn ${
                      currentPage === 1 ? "disabled" : ""
                    }`}>
                    <a
                      className='page-link'
                      href='#'
                      onClick={() => handlePageChange(currentPage - 1)}
                      tabIndex='-1'
                      aria-disabled='true'>
                      {t("ManageAllUser.pagination.prev")}
                    </a>
                  </li>
                  {userData?.totalPages?.map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}>
                      <a
                        className='page-link'
                        href='#'
                        onClick={() => handlePageChange(page)}>
                        {page}
                      </a>
                    </li>
                  ))}

                  {/* Next page button */}
                  <li
                    className={`page-item next_btn ${
                      currentPage === userData?.totalPages?.length
                        ? "disabled"
                        : ""
                    }`}>
                    <a
                      className='page-link'
                      href='#'
                      onClick={() => handlePageChange(currentPage + 1)}>
                      {t("ManageAllUser.pagination.next")}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default dynamic(() => Promise.resolve(ManageAllUsersTable), {
  ssr: false,
});
