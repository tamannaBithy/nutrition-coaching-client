/* eslint-disable react/jsx-no-duplicate-props */
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import { useCreateBlogMutation } from "../../../../../redux/features/queries/BLOG_API";
import Tiptap from "../../ManagePrivacyPolicy/Tiptap";
import "./AddBlogForm.css";

export default function AddBlogForm() {
  const t = useTranslations("Dashboard");
  const [createBlog, { isSuccess }] = useCreateBlogMutation();
  // state to manage the blog image
  const [blogImage, setBlogImage] = useState(null);
  const [langFormData, setLangFormData] = useState("en");

  // state to manage the blog title, description & tag selection
  const [blogTitle, setBlogTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [tagsSelected, setTagsSelected] = useState([]);

  const { locale } = useParams();

  // Handle image drop for blog image
  const onBlogImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setBlogImage(acceptedFiles[0]);
    } else {
      alert("Please select only one image for blog image");
    }
  };

  // Configure dropzone for blog image
  const {
    getRootProps: getBlogImageRootProps,
    getInputProps: getBlogImageInputProps,
    isDragActive: isBlogImageDragActive,
  } = useDropzone({
    onDrop: onBlogImageDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  // Remove the blog image
  const removeBlogImage = () => {
    setBlogImage(null);
  };
  // Function to handle language change
  const handleLangChange = (selectedLang) => {
    setLangFormData(selectedLang);
  };
  // Function to handle changes in the blog title input field
  const handleBlogTitleChange = (e) => {
    setBlogTitle(e.target.value);
  };
  // Inside the render function
  const selectedTags = tagsSelected.length > 0 ? tagsSelected : [];

  // Function to handle changes in the blog description textarea field
  const handleBlogDescriptionChange = (e) => {
    setBlogDescription(e.target.value);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  // Async function to handle the form submission
  async function handleAddBlogFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lang", langFormData);
    formData.append("blog_image", blogImage);
    formData.append("blog_title", blogTitle);
    formData.append("blog_description", content);
    selectedTags.forEach((tag) => {
      formData.append("tags", tag);
    });

    const { data } = await createBlog(formData);
    console.log(data);
    if (data?.status) {
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
    // Reset the form after successful submission
    if (isSuccess) {
      resetForm();
    }
  }

  // Function to reset the form fields
  const resetForm = () => {
    setBlogImage(null);
    setBlogTitle("");
    setBlogDescription("");
    setTagsSelected([]);
  };

  return (
    <>
      {/* Page Title */}
      <div className='add_blog_title '>
        <h2>{t("ManageBlogs.addBlog.pageTitle")}</h2>
      </div>

      <div className=' py-3'>
        <form action='#' onSubmit={handleAddBlogFormSubmit}>
          <div className='row g-3 pt-4'>
            {/* language preference */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='show_per_page_section mb-2'>
                <label htmlFor='lang_preference'>
                  {" "}
                  {t("ManageBlogs.addBlog.languagePreference")}
                </label>

                {/* Select for how many data per page */}
                <select
                  className='form-select'
                  aria-label='Default select example'
                  value={langFormData}
                  onChange={(e) => handleLangChange(e.target.value)}>
                  <option value='ar'>العربية</option>
                  <option value='en'>English</option>
                </select>
              </div>
            </div>

            {/* blog img fields */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='blog_img_field  mb-2'>
                <label htmlFor='blog_image'>
                  {t("ManageBlogs.addBlog.inputs.blogImage.label")}
                </label>

                <div
                  {...getBlogImageRootProps()}
                  className='dropzone p-5 image_drop_zone form-control'
                  role='button'>
                  <input id='blog_image' {...getBlogImageInputProps()} />
                  {isBlogImageDragActive ? (
                    <p className='text-center'>
                      {t(
                        "ManageBlogs.addBlog.inputs.blogImage.dropPlaceholder"
                      )}
                    </p>
                  ) : (
                    <p className='text-center'>
                      {t(
                        "ManageBlogs.addBlog.inputs.blogImage.dragPlaceHolder"
                      )}
                    </p>
                  )}
                </div>

                {blogImage && (
                  <>
                    <p className='mt-3 mb-2'>
                      {t("ManageBlogs.addBlog.inputs.blogImage.previewImage")}
                    </p>
                    <div className='d-flex align-items-center'>
                      <div className='position-relative'>
                        <IoIosClose
                          className='position-absolute top-0 end-0 bg-danger text-white rounded fs-3'
                          data-toggle='tooltip'
                          data-placement='top'
                          role='button'
                          onClick={removeBlogImage}
                          title='Remove the image'
                        />
                        <Image
                          width={250}
                          height={150}
                          alt='blog_image'
                          src={URL?.createObjectURL(blogImage)}
                          alt='Blog Image Preview'
                          className='preview-image rounded'
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* blog title field */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='mb-2 blog_title_fields'>
                <label htmlFor='blog_title'>
                  {t("ManageBlogs.addBlog.inputs.blogTitle.label")}
                  <sup className='text-danger'>*</sup>
                </label>
                <input
                  type='text'
                  name='blogTitle'
                  id='blog_title'
                  className='rounded form-control'
                  required
                  value={blogTitle}
                  onChange={handleBlogTitleChange}
                  placeholder={t(
                    "ManageBlogs.addBlog.inputs.blogTitle.placeHolder"
                  )}
                />
              </div>
            </div>

            {/* blog description field */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='mb-2 blog_description_field'>
                <label htmlFor='blog_description'>
                  {t("ManageBlogs.addBlog.inputs.blogDescription.label")}
                  <sup className='text-danger'>*</sup>
                </label>

                <div>
                  <Tiptap
                    content={content}
                    onChange={(newContent) => handleContentChange(newContent)}
                  />
                </div>
              </div>
            </div>

            {/* blog tag field */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='mb-2 blog_tags_field'>
                <label htmlFor='blog_tags'>
                  {t("ManageBlogs.addBlog.inputs.blogTags.label")}
                  <sup className='text-danger'>*</sup>
                </label>

                <div className='d-flex align-items-center tag_fields_area rounded'>
                  <TagsInput
                    value={tagsSelected}
                    onChange={setTagsSelected}
                    name='tags'
                    id='blog_tags'
                    className='form-control border-0 w-100'
                    required
                    placeHolder={t(
                      "ManageBlogs.addBlog.inputs.blogTags.placeHolder"
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className=' add_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'>
              <input
                type='submit'
                className='p-2 w-25'
                value={t("ManageBlogs.addBlog.inputs.buttonText")}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
