"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  useDeleteBlogMutation,
  useGetAllBlogsForAdminQuery,
} from "../../../../../redux/features/queries/BLOG_API";
import "./AllBlogs.css";
import UpdateBlogModal from "./UpdateBlogModal";

function AllBlogs() {
  const { locale } = useParams();
  const t = useTranslations("Dashboard");
  const [selectedBlog, setSelectedBlog] = useState("");
  const [showPerPage, setShowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [langPref, setLangPref] = useState("en");
  // State variable to hold the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);
  // Fetching data via RTK query
  const {
    data: blogs,
    error,
    isLoading,
    refetch,
  } = useGetAllBlogsForAdminQuery({
    pageNo: currentPage,
    showPerPage,
    langCode: langPref,
    searchKeyword: searchWord,
  });

  // Delete Blog API
  const [deleteBlog] = useDeleteBlogMutation();

  // Callback function to trigger UI update
  const updateUI = () => {
    setUpdateTrigger((prevState) => !prevState);
  };

  // Function to handle successful form submission in child component
  const handleFormSubmit = () => {
    updateUI(); // Trigger UI update
    refetch(); // Refetch data to ensure it's up to date
  };

  // State variables for image loading
  const [imageLoading, setImageLoading] = useState(true);

  // Function to handle changes in "Show per page" dropdown
  const handleShowPerPageChange = (e) => {
    setShowPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing show per page
  };
  // Event handler for language preference select
  const handleLanguageChange = (e) => {
    setLangPref(e.target.value);
  };

  // Function to handle page changes
  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  // Function to handle changes in the search input
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchWord(searchQuery);
  };

  // Reset search when searchKeyword is empty
  useEffect(() => {
    if (searchQuery === "") {
      setSearchWord("");
    }
  }, [searchQuery]);

  // Delete coach handler
  const handleDeleteBlog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! But you can re-add it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      // Call your delete main meal function here
      const { data } = await deleteBlog(id);
      if (data?.status) {
        Swal.fire({
          title: "Removed!",
          text: data?.message?.en,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Opps! Error delete coach",
          text: data?.message?.en,
          icon: "error",
        });
      }
    });
  };

  //Function for edit blog
  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <>
      {/* list of all blogs title */}
      <div className="list_all_blogs_title">
        <h2>{t("ManageBlogs.allBlogs.pageTitle")}</h2>
      </div>
      {/* main content */}
      <div className="py-3">
        <div className="pt-4">
          <div className="d-flex flex-wrap align-content-center justify-content-between mb-4">
            {/* Show per page */}
            <div className="show_per_page_section">
              <p className="m-1">
                {t("ManageBlogs.allBlogs.showPerPage.title")}
              </p>
              {/* Select for how many data per page */}
              <select
                className="form-select"
                aria-label="Default select example"
                value={showPerPage}
                onChange={handleShowPerPageChange}
              >
                <option value={20}>
                  {" "}
                  {t("ManageBlogs.allBlogs.showPerPage.options.perPageOne")}
                </option>
                <option value={30}>
                  {" "}
                  {t("ManageBlogs.allBlogs.showPerPage.options.perPageTwo")}
                </option>
                <option value={50}>
                  {" "}
                  {t("ManageBlogs.allBlogs.showPerPage.options.perPageThree")}
                </option>
                <option value={100}>
                  {" "}
                  {t("ManageBlogs.allBlogs.showPerPage.options.perPageFour")}
                </option>
              </select>
            </div>

            {/* Language Preference */}
            <div className="show_per_page_section">
              <p className="m-1">
                {t("ManageBlogs.allBlogs.languagePreference")}
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
              <p className="m-1 ">{t("ManageBlogs.allBlogs.search.title")}</p>
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
                  placeholder={t("ManageBlogs.allBlogs.search.title")}
                  aria-label="Search"
                />
                <div className="me-2">
                  <button className="search_btn" type="submit">
                    <b> {t("ManageBlogs.allBlogs.search.title")} </b>
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
                    {t("ManageBlogs.allBlogs.tableHead.labelOne")}
                  </th>
                  <th scope="col">
                    {t("ManageBlogs.allBlogs.tableHead.labelTwo")}
                  </th>
                  {/* <th scope='col'>
                    {t("ManageBlogs.allBlogs.tableHead.labelThree")}
                  </th> */}
                  <th scope="col">
                    {t("ManageBlogs.allBlogs.tableHead.labelFour")}
                  </th>
                  <th scope="col">
                    {t("ManageBlogs.allBlogs.tableHead.labelFive")}
                  </th>
                </tr>
              </thead>

              {blogs?.data?.length > 0 ? (
                <tbody>
                  {blogs?.data?.map((blog, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td className="table_image">
                        <Image
                          src={`http://localhost:8000${blog?.blog_image}`}
                          alt="Blog Image"
                          fill="true"
                          sizes="(min-width: 808px) 50vw, 100vw"
                          onLoad={() => setImageLoading(false)}
                          onError={() => setImageLoading(false)}
                        />
                      </td>
                      <td>
                        <button
                          className="blog_tooltip "
                          data-toggle="tooltip"
                          data-placement="top"
                          title={blog?.blog_title}
                        >
                          {blog?.blog_title?.slice(0, 30) || "N/A"}...
                        </button>
                      </td>
                      {/* <td>
                        <button
                          className='blog_tooltip '
                          data-toggle='tooltip'
                          data-placement='top'
                          title={blog?.blog_description}>
                          {blog?.blog_description?.slice(0, 40) || "N/A"}...
                        </button>
                      </td> */}
                      <td>{blog?.tags?.join(", ") || "N/A"}</td>
                      <td>
                        <div className="d-flex gap-1 align-items-center">
                          <div>
                            <Link target="_blank" href={`/blogs/${blog?._id}`}>
                              <button
                                type="button"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="View"
                                className="view_btn"
                              >
                                <GrView style={{ color: "#fff" }} />
                              </button>
                            </Link>
                          </div>

                          <div>
                            <button
                              data-toggle="tooltip"
                              type="button"
                              data-placement="left"
                              title="Edit"
                              className="edit_btn"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop09"
                              onClick={() => handleEditBlog(blog)}
                            >
                              <FiEdit style={{ color: "#fff" }} />
                            </button>
                          </div>

                          <div>
                            <button
                              type="button"
                              data-toggle="tooltip"
                              data-placement="right"
                              title="Delete"
                              className="delete_btn"
                              onClick={() => handleDeleteBlog(blog?._id)}
                            >
                              <RiDeleteBin6Line style={{ color: "#fff" }} />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* update blog */}
                  <UpdateBlogModal
                    blogData={selectedBlog}
                    onFormSubmit={handleFormSubmit}
                  />
                </tbody>
              ) : (
                <div className="text-center mt-4">
                  <h4 className="fw-bold">
                    {t("ManageBlogs.allBlogs.notFound")}
                  </h4>
                </div>
              )}
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
          {!isLoading && blogs?.data?.length > 0 && (
            <div className="my-5 w-100 d-flex  align-content-center justify-content-between">
              {/* Showing 0 - 0 out of 0 items */}
              <div>
                {locale === "ar" ? (
                  // Arabic
                  <figcaption className="blockquote-footer m-0">
                    <b>{blogs?.showingArabic}</b>
                  </figcaption>
                ) : (
                  // English
                  <figcaption className="blockquote-footer m-0">
                    {blogs?.showingEnglish}
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
                        {t("ManageBlogs.allBlogs.pagination.prev")}
                      </a>
                    </li>
                    {blogs?.totalPages?.map((page) => (
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
                        currentPage === blogs?.totalPages?.length
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        {t("ManageBlogs.allBlogs.pagination.next")}
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
}

export default dynamic(() => Promise.resolve(AllBlogs), {
  ssr: false,
});
