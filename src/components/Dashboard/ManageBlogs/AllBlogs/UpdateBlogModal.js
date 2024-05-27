"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import { useUpdateBlogMutation } from "../../../../../redux/features/queries/BLOG_API";
import Tiptap from "../../ManagePrivacyPolicy/Tiptap";
import "./UpdateBlogForm.css";

export default function UpdateBlogModal({ blogData, onFormSubmit }) {
  const { locale } = useParams();
  const t = useTranslations("Dashboard");
  const [updateBlog] = useUpdateBlogMutation();
  // state to manage the blog image
  const [updateBlogImage, setUpdateBlogImage] = useState(null);

  console.log(blogData);

  // state to manage the updated blog title, description & tag selection
  const [updatedBlogTitle, setUpdatedBlogTitle] = useState("");
  const [updatedBlogDescription, setUpdatedBlogDescription] = useState("");
  const [updatedTagsSelected, setUpdatedTagsSelected] = useState([]);
  const [content, setContent] = useState("");

  // set the blog data in default value
  useEffect(() => {
    setUpdateBlogImage(blogData?.blog_image);
    setContent(blogData?.blog_description);
    setUpdatedBlogTitle(blogData?.blog_title);
    setUpdatedTagsSelected(blogData?.tags || []);
  }, [blogData]);

  // Function to handle changes in the Tiptap editor content
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  // Handle image drop for blog image
  const onUpdateBlogImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setUpdateBlogImage(acceptedFiles[0]);
    } else {
      alert("Please select only one image for blog image");
    }
  };

  // Configure dropzone for blog image
  const {
    getRootProps: getUpdateBlogImageRootProps,
    getInputProps: getUpdateBlogImageInputProps,
    isDragActive: isUpdateBlogImageDragActive,
  } = useDropzone({
    onDrop: onUpdateBlogImageDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  // Remove the updated blog image
  const removeUpdateBlogImage = () => {
    setUpdateBlogImage(null);
  };

  // Function to handle changes in the blog title input field
  const handleUpdatedBlogTitleChange = (e) => {
    setUpdatedBlogTitle(e.target.value);
  };

  // Function to handle changes in the blog description textarea field
  const handleUpdatedBlogDescriptionChange = (e) => {
    setUpdatedBlogDescription(e.target.value);
  };

  // Async function to handle the form submission
  async function handleUpdatedBlogFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("lang", blogData?.lang);
    formData.append("blog_image", updateBlogImage);
    formData.append("blog_title", updatedBlogTitle);
    formData.append("blog_description", content);
    updatedTagsSelected?.forEach((tag) => {
      formData.append("tags", tag);
    });

    const { data } = await updateBlog({
      id: blogData?._id,
      data: formData,
    });

    if (data?.status) {
      onFormSubmit();
      Swal.fire({
        icon: "success",
        title: data?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: data?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }

  return (
    <div
      className="modal editBlogModal h-100 fade"
      id="staticBackdrop09"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog d-flex align-items-center bg-transparent">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title" id="staticBackdropLabel">
              <div className="edit_coach_title ">
                <h2>{t("ManageBlogs.updateBlog.title")}</h2>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="py-3">
              <form action="#" onSubmit={handleUpdatedBlogFormSubmit}>
                <div className="row g-3 pt-4">
                  {/* blog img fields */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="update_blog_img_field  mb-2">
                      <label htmlFor="update_blog_image">
                        {t("ManageBlogs.addBlog.inputs.blogImage.label")}
                      </label>

                      <div
                        {...getUpdateBlogImageRootProps()}
                        className="dropzone p-5 image_drop_zone form-control"
                        role="button"
                      >
                        <input
                          id="update_blog_image"
                          {...getUpdateBlogImageInputProps()}
                        />
                        {isUpdateBlogImageDragActive ? (
                          <p className="text-center">
                            {t(
                              "ManageBlogs.addBlog.inputs.blogImage.dropPlaceholder"
                            )}
                            .
                          </p>
                        ) : (
                          <p className="text-center">
                            {t(
                              "ManageBlogs.addBlog.inputs.blogImage.dragPlaceHolder"
                            )}
                          </p>
                        )}
                      </div>

                      {updateBlogImage && (
                        <>
                          <p className="mt-3 mb-2">
                            {t(
                              "ManageBlogs.addBlog.inputs.blogImage.previewImage"
                            )}
                          </p>
                          <div className="d-flex align-items-center">
                            <div className="position-relative">
                              <IoIosClose
                                className="position-absolute top-0 end-0 bg-danger text-white rounded fs-3"
                                data-toggle="tooltip"
                                data-placement="top"
                                role="button"
                                onClick={removeUpdateBlogImage}
                                title="Remove the image"
                              />
                              <Image
                                width={250}
                                height={150}
                                src={
                                  updateBlogImage instanceof File
                                    ? URL.createObjectURL(updateBlogImage)
                                    : `http://localhost:8000${updateBlogImage}`
                                }
                                alt={`Update Blog Image Preview`}
                                className="preview-image rounded"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* blog title field */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-2 update_blog_title_fields">
                      <label htmlFor="update_blog_title">
                        {t("ManageBlogs.addBlog.inputs.blogTitle.label")}
                      </label>
                      <input
                        type="text"
                        name="updatedBlogTitle"
                        id="update_blog_title"
                        className="rounded form-control"
                        required
                        value={updatedBlogTitle}
                        onChange={handleUpdatedBlogTitleChange}
                        placeholder={t(
                          "ManageBlogs.addBlog.inputs.blogTitle.placeHolder"
                        )}
                      />
                    </div>
                  </div>

                  {/* blog description field */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-2 update_blog_description_field">
                      <label htmlFor="update_blog_description">
                        {t("ManageBlogs.addBlog.inputs.blogDescription.label")}
                      </label>

                      <div>
                        {/* <textarea
                          type='text'
                          className='form-control '
                          name='updatedBlogDescription'
                          id='update_blog_description'
                          placeholder={t(
                            "ManageBlogs.addBlog.inputs.blogDescription.placeHolder"
                          )}
                          value={updatedBlogDescription}
                          onChange={handleUpdatedBlogDescriptionChange}
                        /> */}
                        <div>
                          <Tiptap
                            content={content}
                            onChange={(newContent) =>
                              handleContentChange(newContent)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* blog tag field */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="mb-2 update_blog_tags_field">
                      <label htmlFor="update_blog_tags">
                        {t("ManageBlogs.addBlog.inputs.blogTags.label")}
                      </label>

                      <div className="d-flex align-items-center update_tag_fields_area rounded">
                        <TagsInput
                          value={updatedTagsSelected}
                          onChange={setUpdatedTagsSelected}
                          name="tags"
                          id="update_blog_tags"
                          className="form-control border-0 w-100"
                          required
                          placeHolder={t(
                            "ManageBlogs.addBlog.inputs.blogTags.placeHolder"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="col-12 update_blog_btn py-3 d-flex align-items-center w-100 justify-content-center">
                    <input
                      type="submit"
                      className="p-2 w-25"
                      value={t("ManageBlogs.updateBlog.btnText")}
                      data-bs-dismiss="modal"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
