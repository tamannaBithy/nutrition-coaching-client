import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import { useUpdateBannerMutation } from "../../../../../redux/features/queries/BANNER_API";

export default function EditBannerModal({ bannerInfo, onFormSubmit }) {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();
  // state to manage the banner image
  const [bannerImage, setBannerImage] = useState(null);
  const [langData, setLangData] = useState(locale);

  // state to manage the banner heading and paragraph
  const [bannerHeading, setBannerHeading] = useState("");
  const [bannerParagraph, setBannerParagraph] = useState("");

  // State to manage the visibility of the banner
  const [visibleBanner, setVisibleBanner] = useState(true);

  const [updateBanner, { isSuccess, isError, data }] =
    useUpdateBannerMutation();

  useEffect(() => {
    // Populate state variables with values from bannerInfo
    setBannerHeading(bannerInfo?.banner_heading);
    setBannerParagraph(bannerInfo?.banner_paragraph);
    setBannerImage(bannerInfo?.image); // Assuming bannerInfo.image is the image URL
    setVisibleBanner(bannerInfo?.visible);
    setLangData(bannerInfo?.lang);
  }, [bannerInfo]); // Run effect when bannerInfo changes

  // Handle image drop for banner image
  const onBannerImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setBannerImage(acceptedFiles[0]);
    } else {
      alert("Please select only one image for banner image");
    }
  };

  // Configure dropzone for banner image
  const {
    getRootProps: getBannerImageRootProps,
    getInputProps: getBannerImageInputProps,
    isDragActive: isBannerImageDragActive,
  } = useDropzone({
    onDrop: onBannerImageDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  // Function to handle changes in the banner heading input field
  const handleHeadingChange = (e) => {
    setBannerHeading(e.target.value);
  };

  // Function to handle changes in the banner paragraph input field
  const handleParagraphChange = (e) => {
    setBannerParagraph(e.target.value);
  };

  // Function to handle changes in the "Visible to user" checkbox
  const handleVisibilityChange = () => {
    setVisibleBanner(!visibleBanner);
  };

  // Function to handle language change
  const handleLangChange = (selectedLang) => {
    setLangData(selectedLang);
  };

  // Function to remove the banner image
  const removeBannerImage = () => {
    setBannerImage(null);
  };

  //show success message
  useEffect(() => {
    if (data?.status && isSuccess) {
      Swal.fire({
        text: data?.message[locale],
        icon: "success",
      });
    }
  }, [isSuccess, data?.status]);

  // Show error message
  useEffect(() => {
    if (isError) {
      Swal.fire({
        text: data?.message[locale],
        icon: "error",
      });
    }
  }, [isError]);

  //Function for handle update form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const formData = new FormData();

    formData.append("banner_heading", bannerHeading);
    formData.append("banner_paragraph", bannerParagraph);
    formData.append("image", bannerImage);
    formData.append("visible", visibleBanner);
    formData.append("lang", langData);

    updateBanner({
      id: bannerInfo?._id,
      data: formData,
    }).then(() => {
      onFormSubmit();
    });
  };

  return (
    <div
      className="modal editBannerModal fade"
      id="staticBackdrop2"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog d-flex align-items-center bg-transparent">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {t("ManageBanner.editBannerTitle")}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="py-3">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 pt-4">
                  {/* language preference */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="show_per_page_section mb-2">
                      <label htmlFor="lang_preference">
                        {t("ManageBanner.addBanner.inputs.languagePreference")}
                      </label>

                      {/* Select for how many data per page */}
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={langData}
                        onChange={(e) => handleLangChange(e.target.value)}
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>

                  {/* banner heading field */}
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="mb-2 banner_heading_fields">
                      <label htmlFor="banner_heading">
                        {t("ManageBanner.addBanner.inputs.heading.label")}
                      </label>
                      <input
                        type="text"
                        name="instructorName"
                        id="banner_heading"
                        className="rounded form-control"
                        value={bannerHeading}
                        onChange={handleHeadingChange}
                        placeholder={t(
                          "ManageBanner.addBanner.inputs.heading.placeholder"
                        )}
                      />
                    </div>
                  </div>

                  {/* banner paragraph field */}
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="mb-2 banner_paragraph_fields">
                      <label htmlFor="banner_paragraph">
                        {t("ManageBanner.addBanner.inputs.paragraph.label")}
                      </label>
                      <input
                        type="text"
                        name="instructorQualification"
                        id="banner_paragraph"
                        className="rounded form-control"
                        value={bannerParagraph}
                        onChange={handleParagraphChange}
                        placeholder={t(
                          "ManageBanner.addBanner.inputs.paragraph.placeholder"
                        )}
                      />
                    </div>
                  </div>

                  {/* image field */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="banner_img_field  mb-2">
                      <label htmlFor="banner_image">
                        {t("ManageBanner.addBanner.inputs.image.label")}
                      </label>

                      <div
                        {...getBannerImageRootProps()}
                        className="dropzone p-5 image_drop_zone form-control"
                        role="button"
                      >
                        <input
                          id="banner_image"
                          {...getBannerImageInputProps()}
                        />
                        {isBannerImageDragActive ? (
                          <p className="text-center">
                            {t(
                              "ManageBanner.addBanner.inputs.image.dropPlaceholder"
                            )}
                          </p>
                        ) : (
                          <p className="text-center">
                            {t(
                              "ManageBanner.addBanner.inputs.image.dropPlaceholder"
                            )}
                          </p>
                        )}
                      </div>

                      {bannerImage && (
                        <>
                          <p className="mt-3 mb-2">
                            {t(
                              "ManageBanner.addBanner.inputs.image.previewImage"
                            )}
                          </p>
                          <div className="d-flex align-items-center">
                            <div className="position-relative">
                              <IoIosClose
                                className="position-absolute top-0 end-0 bg-danger text-white rounded fs-3"
                                data-toggle="tooltip"
                                data-placement="top"
                                role="button"
                                onClick={removeBannerImage}
                                title="Remove the image"
                              />
                              {/* Image component here */}
                              <Image
                                width={300}
                                height={150}
                                src={
                                  bannerImage instanceof File
                                    ? URL.createObjectURL(bannerImage)
                                    : `http://localhost:8000${bannerImage}`
                                }
                                alt="Banner Image Preview"
                                className="preview-image rounded"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* visible field */}
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="form-check form-switch mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="banner_visible_checked"
                        checked={visibleBanner}
                        onChange={handleVisibilityChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="banner_visible_checked"
                      >
                        {t("ManageBanner.addBanner.inputs.visible.label")}
                        <sup className="text-danger">*</sup>
                      </label>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="col-12 add_banner_btn py-3 d-flex align-items-center w-100 justify-content-center">
                    <input
                      type="submit"
                      className="p-2 w-25"
                      value={t("ManageBanner.update")}
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
