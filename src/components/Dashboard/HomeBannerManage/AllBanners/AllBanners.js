"use client";
// import Image from "next/image";
import { useEffect, useState } from "react";
// import { FiEdit } from "react-icons/fi";
// import { RiDeleteBin6Line } from "react-icons/ri";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  useDeleteBannerMutation,
  useGetAllBannersQuery,
} from "../../../../../redux/features/queries/BANNER_API";
import "./AllBanners.css";
import EditBannerModal from "./EditBannerModal";

export default function AllBanners() {
  const t = useTranslations("Dashboard");
  const { locale: lang } = useParams();

  // State to store the fetched language
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [language, setLanguage] = useState(null);
  const [selectedLang, setSelectedLang] = useState(lang);
  const [selectedBanner, setSelectedBanner] = useState("");

  // State variables for image loading
  const [imageLoading, setImageLoading] = useState(true);
  const [showPerPage, setShowPerPage] = useState(20);
  const [pageNo, setPageNo] = useState(1);
  const [words, setWords] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetching data via RTK query
  const {
    data: bannersData,
    error,
    isLoading,
    refetch,
  } = useGetAllBannersQuery({
    lang: selectedLang,
  });

  //Delete banner via RTK query
  const [deleteBanner] = useDeleteBannerMutation();

  // Function to handle changes in "Show per page" dropdown
  const handleShowPerPageChange = (e) => {
    setShowPerPage(Number(e.target.value));
    setPageNo(1); // Reset to the first page when changing show per page
  };

  // Function to handle page changes
  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handleSelectedLang = (e) => {
    setSelectedLang(e.target.value);
  };

  // Reset search when searchKeyword is empty
  useEffect(() => {
    if (searchKeyword === "") {
      setWords("");
    }
  }, [searchKeyword]);

  //Function Delete Banner
  const handleDeleteBanner = (id) => {
    Swal.fire({
      title: t("ManageBanner.swal.title"),
      text: t("ManageBanner.swal.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: t("ManageBanner.swal.confirmButtonText"),
      cancelButtonText: t("ManageBanner.swal.cancelButtonText"),
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: t("ManageBanner.swal.removed"),
        text: t("ManageBanner.swal.text2"),
        icon: "success",
      });

      // Call your delete  meal function here
      deleteBanner(id);
    });
  };

  //Function Edit Banner
  const handleEditBanner = (bannerData) => {
    setSelectedBanner(bannerData);
  };

  // Callback function to trigger UI update
  const updateUI = () => {
    setUpdateTrigger((prevState) => !prevState);
  };

  // Function to handle successful form submission in child component
  const handleFormSubmit = () => {
    updateUI(); // Trigger UI update
    refetch(); // Refetch data to ensure it's up to date
  };

  return (
    <div className="list_banner_container my-5">
      <div className="list_banner_title">
        <h2>{t("ManageBanner.listBanner.pageTitle")}</h2>
      </div>

      <div className="py-4">
        <div className="pt-4">
          <div className="d-flex flex-wrap align-content-center  mb-4">
            {/* Show per page */}
            <div className="show_per_page_section me-5">
              <p className="m-1">
                {t("ManageBanner.listBanner.showPerPage.title")}
              </p>
              {/* Select for how many data per page */}
              <select
                className="form-select"
                aria-label="Default select example"
                value={showPerPage}
                onChange={handleShowPerPageChange}
              >
                <option value={20}>
                  {t("ManageBanner.listBanner.showPerPage.options.perPageOne")}
                </option>
                <option value={30}>
                  {t("ManageBanner.listBanner.showPerPage.options.perPageTwo")}
                </option>
                <option value={50}>
                  {t(
                    "ManageBanner.listBanner.showPerPage.options.perPageThree"
                  )}
                </option>
                <option value={100}>
                  {t("ManageBanner.listBanner.showPerPage.options.perPageFour")}
                </option>
              </select>
            </div>

            {/* Language Preference */}
            <div className="show_per_page_section">
              <p className="m-1">
                {t("ManageBanner.listBanner.languagePreference")}
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
          </div>

          {/* table */}
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              {/* table head data */}
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    {t("ManageBanner.listBanner.tableHead.labelOne")}
                  </th>
                  <th scope="col">
                    {t("ManageBanner.listBanner.tableHead.labelTwo")}
                  </th>
                  <th scope="col">
                    {t("ManageBanner.listBanner.tableHead.labelThree")}
                  </th>
                </tr>
              </thead>

              {bannersData?.data?.length > 0 ? (
                <tbody>
                  {bannersData?.data?.map((banner, i) => {
                    return (
                      <tr key={i}>
                        <th style={{ width: "100px" }}>{i + 1}</th>
                        <td className="table_image">
                          <Image
                            src={`http://localhost:8000${banner?.image}`}
                            fill="true"
                            sizes="(min-width: 808px) 50vw, 100vw"
                            style={{
                              objectFit: "cover", // cover, contain, none
                            }}
                            alt="BANNER"
                          />
                        </td>
                        <td>{banner?.banner_heading}</td>
                        <td style={{ width: "150px" }}>
                          <div>
                            <button
                              type="button"
                              data-toggle="tooltip"
                              data-placement="right"
                              title="Delete"
                              className=" btn btn-danger me-3"
                              onClick={() => handleDeleteBanner(banner?._id)}
                            >
                              <RiDeleteBin6Line />
                            </button>
                            <button
                              type="button"
                              data-toggle="tooltip"
                              data-placement="right"
                              title="Delete"
                              className="edit_btn btn btn-success"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop2"
                              onClick={() => handleEditBanner(banner)}
                            >
                              <BiEdit />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {/* Edit Banner Modal  */}
                  <EditBannerModal
                    bannerInfo={selectedBanner}
                    onFormSubmit={handleFormSubmit}
                  />
                </tbody>
              ) : (
                <div className="w-100 text-center mt-4  fw-bold">
                  {t("ManageBanner.listBanner.notFound")}
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
        </div>
      </div>
    </div>
  );
}
