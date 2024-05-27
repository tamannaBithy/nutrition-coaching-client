"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetSingleBlogQuery } from "../../../../redux/features/queries/BLOG_API";
import BlogHero from "../BlogHero/BlogHero";
import "./BlogComponent.css";

/**
 * BlogComponent displays details of a single blog post.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.id - ID of the blog post to display.
 * @returns {JSX.Element} React component.
 */
export default function BlogComponent({ id }) {
  const { locale } = useParams();

  // State variables for image loading and selected blogs
  const [imageLoading, setImageLoading] = useState(true);
  const {
    data: singleBlogDetails,
    error,
    isLoading,
  } = useGetSingleBlogQuery(id);

  const singleBlogData = singleBlogDetails?.data;

  return (
    <>
      {/* Display the hero section of the blog details page */}
      <BlogHero />
      <div className="container my-5 py-5">
        {/* Loading spinner while fetching blog post data */}
        {isLoading && (
          <div className="d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Display blog post details if data is available */}
        {singleBlogData && (
          <div className="row gap-4 mx-auto">
            <div className="col-lg-5 col-md-12 col-sm-12  ">
              {/* Blog Image Section */}
              <div className=" blog_img">
                <Image
                  // src={`http://localhost:8000/${singleBlogData?.blog_image}`}
                  src="/assets/meals.jpg"
                  alt="blog_image"
                  width={450}
                  height={216}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />
              </div>

              {/* Blog Information Section */}
              <div className="blog_info">
                {/* Format and display publication date */}

                <p>
                  <b>
                    {new Date(singleBlogData?.createdAt).toLocaleDateString(
                      { locale },
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </b>
                </p>

                {/* Display blog title */}
                <h5>{singleBlogData?.blog_title}</h5>
              </div>

              {/* Display blog tags as buttons */}
              <div className="tag_buttons_group my-4">
                {singleBlogData?.tags?.map((tag, index) => (
                  <button key={index}>
                    <b>{tag}</b>
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Text Section */}
            <div className="col-lg-6 col-md-12 col-sm-12 blog_text ">
              {/* <p>{singleBlogData?.blog_description}</p> */}
              <div
                className="blog_details text-black"
                dangerouslySetInnerHTML={{
                  __html: singleBlogData?.blog_description,
                }}
              >
                {/* <p>{blogData?.blog_description.slice(0, 112)}...</p> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
