/* eslint-disable react/jsx-no-duplicate-props */
"use client";

import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import { TagsInput } from "react-tag-input-component";

export default function UpdateBlogForm({ id }) {
  // state to manage the blog image
  const [updateBlogImage, setUpdateBlogImage] = useState(null);

  // state to manage the updated blog title, description & tag selection
  const [updatedBlogTitle, setUpdatedBlogTitle] = useState("");
  const [updatedBlogDescription, setUpdatedBlogDescription] = useState("");
  const [updatedTagsSelected, setUpdatedTagsSelected] = useState([]);

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

    // Reset the form after submission
    resetForm();
  }

  // Function to reset the form fields
  const resetForm = () => {
    setUpdateBlogImage(null);

    setUpdatedTagsSelected([]);
  };

  return (
    <>
      <form action='#' onSubmit={handleUpdatedBlogFormSubmit}>
        <div className='row g-3 pt-4'>
          {/* blog img fields */}
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='update_blog_img_field  mb-2'>
              <label htmlFor='update_blog_image'>Blog image </label>

              <div
                {...getUpdateBlogImageRootProps()}
                className='dropzone p-5 image_drop_zone form-control'
                role='button'>
                <input
                  id='update_blog_image'
                  {...getUpdateBlogImageInputProps()}
                />
                {isUpdateBlogImageDragActive ? (
                  <p className='text-center'>Drop the image here ...</p>
                ) : (
                  <p className='text-center'>
                    Drag & drop an image here, or click to select an image
                  </p>
                )}
              </div>

              {updateBlogImage && (
                <>
                  <p className='mt-3 mb-2'>Preview image</p>
                  <div className='d-flex align-items-center'>
                    <div className='position-relative'>
                      <IoIosClose
                        className='position-absolute top-0 end-0 bg-danger text-white rounded fs-3'
                        data-toggle='tooltip'
                        data-placement='top'
                        role='button'
                        onClick={removeUpdateBlogImage}
                        title='Remove the image'
                      />
                      <Image
                        width={250}
                        height={150}
                        alt='update_blog_image'
                        src={URL?.createObjectURL(updateBlogImage)}
                        alt={`Update Blog Image Preview`}
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
            <div className='mb-2 update_blog_title_fields'>
              <label htmlFor='update_blog_title'>
                Blog title<sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                name='updatedBlogTitle'
                id='update_blog_title'
                className='rounded form-control'
                required
                value={updatedBlogTitle}
                onChange={handleUpdatedBlogTitleChange}
                placeholder='Enter Blog Title'
              />
            </div>
          </div>

          {/* blog description field */}
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='mb-2 update_blog_description_field'>
              <label htmlFor='update_blog_description'>
                Blog description<sup className='text-danger'>*</sup>
              </label>

              <div className='d-flex align-items-center input_fields_area rounded'>
                <textarea
                  type='text'
                  className='form-control '
                  name='updatedBlogDescription'
                  id='update_blog_description'
                  placeholder='Enter Blog Description'
                  value={updatedBlogDescription}
                  onChange={handleUpdatedBlogDescriptionChange}
                />
              </div>
            </div>
          </div>

          {/* blog tag field */}
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='mb-2 update_blog_tags_field'>
              <label htmlFor='update_blog_tags'>
                Blog tags<sup className='text-danger'>*</sup>
              </label>

              <div className='d-flex align-items-center update_tag_fields_area rounded'>
                <TagsInput
                  value={updatedTagsSelected}
                  onChange={setUpdatedTagsSelected}
                  name='tags'
                  id='update_blog_tags'
                  className='form-control border-0 w-100'
                  required
                  placeHolder='Enter Blog Tags'
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className='col-12 update_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'>
            <input type='submit' className='p-2 w-25' value='Update The Blog' />
          </div>
        </div>
      </form>
    </>
  );
}
