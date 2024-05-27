"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiShareForwardLine } from "react-icons/ri";
import { useGetAllBlogsQuery } from "../../../../redux/features/queries/BLOG_API";
import "./BlogsCard.css";

export default function BlogsCard() {
  const t = useTranslations("Blogs");

  // State variables for image loading and selected preferences/meals per week
  const [imageLoading, setImageLoading] = useState(true);
  const { locale: langCode } = useParams();

  const [words, setWords] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // State for managing the current page number
  const [page, setPage] = useState(1);
  const showPerPage = 15; // Number of blogs to fetch per page

  // Fetching blogs data using the generated query hook
  const {
    data: blogsDetails,
    error,
    isLoading,
  } = useGetAllBlogsQuery({ page, showPerPage, langCode, searchKeyword }); // Fetch blogs based on current page and limit

  console.log(blogsDetails);

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Reset search when searchKeyword is empty
  useEffect(() => {
    if (searchKeyword === "") {
      setWords("");
    }
  }, [searchKeyword]);
  const handleBlogSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset page to 1 when initiating a new search
    setWords(searchKeyword);
  };

  return (
    <div className="container py-5">
      {/* Search filed to find the offered meal data data  */}
      <div className="search_area_blogs my-5 ">
        <form
          onSubmit={handleBlogSearch}
          className="form-inline d-flex justify-content-between align-items-center"
        >
          <div className="custom_input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg_icon bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
            <input
              className="input"
              type="text"
              name="searchInput"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder={t("blogsCard.placeholder")}
            />
          </div>
          <button
            className={`submit_btn ${langCode === "ar" ? "radius_lang" : ""}`}
          >
            {t("blogsCard.btnText")}
          </button>
        </form>
      </div>

      <div className="row ">
        {langCode === "ar" ? (
          <figcaption className="blockquote-footer">
            <b>{blogsDetails?.showingArabic}</b>
          </figcaption>
        ) : (
          <figcaption className="blockquote-footer">
            <b>{blogsDetails?.showingEnglish}</b>
          </figcaption>
        )}
        {/* Loading spinner while fetching blog post data */}
        {isLoading && (
          <div className="d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!isLoading && blogsDetails?.data?.length > 0 ? (
          <>
            {/* Mapping through fetched blog data */}
            {blogsDetails?.data?.map((blogData) => (
              <div
                key={blogData?._id}
                className="col-lg-4 col-md-6 col-sm-12 my-5"
              >
                {/* Linking to individual blog pages */}
                <Link
                  href={`/${langCode}/blogs/${blogData?._id}`}
                  className="text-decoration-none"
                >
                  <div className="blog_card_section">
                    {/* Displaying blog image */}
                    <div className="blogCard_image">
                      <Image
                        src={
                          blogData?.blog_image
                            ? `http://localhost:8000${blogData?.blog_image}`
                            : ""
                        }
                        // src={`/assets/meals.jpg`}
                        fill="true"
                        sizes="(min-width: 808px) 50vw, 100vw"
                        style={{
                          objectFit: "cover",
                          overflow: "hidden",
                        }}
                        alt="Blog_image"
                      />

                      {/* Overlay for sharing icon */}
                      <div className="overlay">
                        <span
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "#092635",
                          }}
                        >
                          {/* Sharing icon */}
                          <RiShareForwardLine
                            style={{
                              fontSize: "24px",
                              fill: "#ffffff",
                            }}
                          />
                        </span>
                      </div>
                    </div>

                    {/* Displaying blog creation date */}
                    <div className="pt-3 pb-1 blogs_create_date">
                      <p>
                        <b>
                          {new Date(blogData?.createdAt).toLocaleDateString(
                            { langCode },
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </b>
                      </p>
                    </div>

                    {/* Displaying blog title */}
                    <div className="blog_title ">
                      <h6>{blogData?.blog_title}</h6>
                    </div>

                    {/* Displaying truncated blog description */}
                    <div
                      className="blog_details blog_details_card text-black"
                      dangerouslySetInnerHTML={{
                        __html: blogData?.blog_description.slice(0, 100),
                      }}
                    >
                      {/* <p>{blogData?.blog_description.slice(0, 112)}...</p> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center">
            <h4>{t("blogsCard.notFound")}</h4>
          </div>
        )}
        {/* Pagination */}
        {!isLoading && (
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              {/* Previous page button */}
              <li
                className={`page-item prev_btn ${page === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  {t("blogsCard.prevTxt")}
                </button>
              </li>

              {/* Page number buttons */}
              {blogsDetails?.totalPages?.map((pageNum) => (
                <li
                  key={pageNum}
                  className={`page-item ${pageNum === page ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                </li>
              ))}

              {/* Next page button */}
              <li
                className={`page-item next_btn ${
                  page === blogsDetails?.totalPages?.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === blogsDetails?.totalPages?.length}
                >
                  {t("blogsCard.nextTxt")}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
