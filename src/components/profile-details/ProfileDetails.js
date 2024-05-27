"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useChangeOldPasswordMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../../redux/features/queries/USER_API";
import "./ProfileDetails.css";

const ProfileDetails = () => {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();

  // Fetching user profile details and managing loading and error states
  const {
    data: profileDetails,
    isError,
    isLoading,
    isSuccess,
  } = useGetUserProfileQuery();

  // Mutation for updating user profile
  const [
    updateUserProfile,
    { isSuccess: updateProfileSuccess, data: updateProfileMessage },
  ] = useUpdateUserProfileMutation();
  // Mutation for updating reset password
  const [
    changeOldPassword,
    { isSuccess: resetPassSuccess, data: resetPassData },
  ] = useChangeOldPasswordMutation();

  // State for controlling update mode
  const [updateData, setUpdateData] = useState(true);
  const [resetPassUpdateData, setResetPassUpdateData] = useState(true);

  // State for storing updated user data
  const [updatedUserData, setUpdatedUserData] = useState(profileDetails);

  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // State for storing user input data
  const [userDataInputs, setUserDataInputs] = useState({});
  const [matchPassMsg, setMatchPassMsg] = useState("");
  const [profileUpdateError, setProfileUpdateError] = useState({
    district: "",
    province: "",
    date_of_birth: "",
    name: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: true,
    newPassword: true,
    confirmPassword: true,
  });

  //state for reset password field
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  //reset password input change handler
  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordFields({ ...passwordFields, [name]: value });
    // Set confirmPasswordTouched to true when user types in the confirm password field
    if (name === "confirmNewPassword") {
      setConfirmPasswordTouched(true);
    }
  };

  // Effect to display password match message only when confirm password field is touched
  useEffect(() => {
    if (confirmPasswordTouched) {
      const { newPassword, confirmNewPassword } = passwordFields;
      if (newPassword !== confirmNewPassword) {
        setMatchPassMsg(
          <small className='text-danger fw-bold'>
            {t("Profile.resetPassword.waringMsgs.one")}
          </small>
        );
      } else {
        setMatchPassMsg(
          <small className='text-success fw-bold'>
            {t("Profile.resetPassword.waringMsgs.two")}
          </small>
        );
      }
    }
  }, [passwordFields.confirmNewPassword, confirmPasswordTouched]);

  // reset password submit handler
  const handleResetPasswordSubmit = (e) => {
    const { newPassword, oldPassword } = passwordFields;

    changeOldPassword({ newPassword, oldPassword });
    setPasswordFields({});
    setResetPassUpdateData(!resetPassUpdateData);
    setMatchPassMsg("");
  };

  // Effect to display success message when reset pass is updated
  useEffect(() => {
    if (resetPassSuccess && resetPassData?.status) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: resetPassData?.message?.[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }, [resetPassSuccess]);

  useEffect(() => {
    if (resetPassSuccess && resetPassData?.status === false) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Oops...",
        text: resetPassData?.message?.[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }, [resetPassSuccess]);

  // toggle reset password handler
  const togglePasswordVisibility = (name) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  // Function to toggle update mode
  const updateHandler = () => {
    setUpdateData(!updateData);
  };
  // Function to toggle reset pass update mode
  const resetPassUpdateHandler = () => {
    setResetPassUpdateData(!resetPassUpdateData);
  };

  // Handling input change events
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      data: {
        ...updatedUserData.data,
        [name]: value,
      },
    });
    setUserDataInputs({
      ...userDataInputs,
      [name]: value,
    });
  };

  // Effect to display success message when profile is updated
  useEffect(() => {
    console.log(updateProfileMessage);

    if (updateProfileMessage && updateProfileMessage?.status) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: updateProfileMessage?.message?.[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }, [updateProfileMessage]);

  // Function to handle profile update submission
  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const userInputDataObj = {
      userInfos: {
        phone: userDataInputs?.phone,
        email: userDataInputs?.email,
      },
      profileInfos: {
        name: userDataInputs?.name,
        gender: userDataInputs?.gender,
        father_name: userDataInputs?.father_name,
        grandfather_name: userDataInputs?.grandfather_name,
        date_of_birth: userDataInputs?.date_of_birth,
        province: userDataInputs?.province,
        district: userDataInputs?.district,
        locality: userDataInputs?.locality,
        neighborhood: userDataInputs?.neighborhood,
        alley: userDataInputs?.alley,
        house_number: userDataInputs?.house_number,
      },
    };
    // Copy current errors
    let updatedErrors = { ...profileUpdateError }; // Copy current errors

    // Check each field individually for validity

    if (userDataInputs?.district === "") {
      updatedErrors.district = `${t("Profile.updatedErrors.district")}`;
    } else {
      updatedErrors.district = ""; // Clear error if valid
    }
    if (userDataInputs?.name === "") {
      updatedErrors.name = `${t("Profile.updatedErrors.name")}`;
    } else {
      updatedErrors.name = ""; // Clear error if valid
    }
    if (userDataInputs?.gender === "") {
      updatedErrors.gender = `${t("Profile.updatedErrors.gender")}`;
    } else {
      updatedErrors.gender = ""; // Clear error if valid
    }
    if (userDataInputs?.date_of_birth === "") {
      updatedErrors.date_of_birth = `${t(
        "Profile.updatedErrors.date_of_birth"
      )}`;
    } else {
      updatedErrors.date_of_birth = ""; // Clear error if valid
    }
    if (userDataInputs?.province === "") {
      updatedErrors.province = `${t("Profile.updatedErrors.province")}`;
    } else {
      updatedErrors.province = ""; // Clear error if valid
    }

    // Update the state with the new error object
    setProfileUpdateError(updatedErrors);

    // If any field is invalid, return without updating profile
    if (Object.values(updatedErrors).some((error) => error !== "")) {
      return;
    }

    updateUserProfile(userInputDataObj);
    setProfileUpdateError("");
    setUpdateData(!updateData);
  };
  // Effect to initialize updatedUserData when profileDetails is available
  useEffect(() => {
    if (profileDetails) {
      setUpdatedUserData(profileDetails);
    }
  }, [profileDetails]);

  // Effect to populate userDataInputs with profileDetails when available
  useEffect(() => {
    if (profileDetails && !Object.keys(userDataInputs).length) {
      setUserDataInputs(profileDetails.data);
    }
  }, [profileDetails, userDataInputs]);

  return (
    <div className='profile-details-main'>
      <div className='container'>
        <div className='title d-flex justify-content-between flex-column flex-md-row align-items-center'>
          <h2>{t("Profile.title")}</h2>

          <button className='update-btn' onClick={updateHandler}>
            {t("Profile.updateBtnText")}
          </button>
        </div>
        {/* Display loading indicator while fetching profile details */}
        {isLoading && (
          <>
            <div className='vh-100 d-flex align-items-center justify-content-center'>
              <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          </>
        )}

        {/* Profile Information form area */}
        {!isLoading && isSuccess && (
          <div>
            <div className='row g-3 pt-4'>
              <div className='col-12 col-md-6 col-lg-6'>
                <div className='contact-details'>
                  <h3 className='text-secondary'>
                    {t("Profile.contactDetails.title")}
                  </h3>
                </div>
                {/* Number field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='number'>
                      {t("Profile.contactDetails.inputs.number.label")}

                      <sup className='text-danger'>*</sup>
                    </label>
                    {updatedUserData?.data?.phone === "" ? (
                      <input
                        disabled={updateData}
                        type='text'
                        name='number'
                        value={updatedUserData?.data?.phone}
                        onChange={handleInputChange}
                        id='number'
                        className='rounded form-control'
                        placeholder={t(
                          "Profile.contactDetails.inputs.number.placeHolder"
                        )}
                      />
                    ) : (
                      <>
                        <input
                          disabled
                          type='text'
                          name='number'
                          value={updatedUserData?.data?.phone}
                          id='number'
                          className='rounded form-control'
                          placeholder={t(
                            "Profile.contactDetails.inputs.number.placeHolder"
                          )}
                        />
                        <small>{t("Profile.contactDetails.inputText")}</small>
                      </>
                    )}
                  </div>
                </div>

                {/* Email field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='email'>
                      {t("Profile.contactDetails.inputs.email.label")}
                      <sup className='text-danger'>*</sup>
                    </label>
                    <input
                      disabled={updateData}
                      type='email'
                      name='email'
                      value={updatedUserData?.data?.email}
                      onChange={handleInputChange}
                      id='email'
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.contactDetails.inputs.email.placeHolder"
                      )}
                    />
                  </div>
                </div>

                {/* Verification status */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-2 blog_title_fields'>
                    <label htmlFor='email'>
                      {t("Profile.contactDetails.verificationStatus")}
                      <sup className='text-danger'>*</sup> :{"  "}
                      <strong>
                        {updatedUserData?.data?.verified === true
                          ? t("Profile.verificationStatus.one")
                          : t("Profile.verificationStatus.two")}
                      </strong>
                      <br />
                      <Link href='/profile-verify'>
                        <button className='verify-btn'>
                          {t("Profile.contactDetails.verifyBtnText")}
                        </button>
                      </Link>
                    </label>
                  </div>
                </div>

                {/* Reset Password */}
                <div className='contact-details mt-5'>
                  <div className='title mb-3 md:mb-0 d-flex justify-content-between flex-column flex-md-row align-items-center'>
                    <h2>{t("Profile.resetPassword.title")}</h2>

                    <button
                      className='update-btn'
                      onClick={resetPassUpdateHandler}>
                      {t("Profile.resetPassword.updateBtn")}
                    </button>
                  </div>

                  {/* Old Password */}
                  <div className='col-lg-12 col-md-12 col-sm-12'>
                    <div className='mb-3 blog_title_fields position-relative'>
                      <label htmlFor='oldPassword'>
                        {t("Profile.resetPassword.inputs.one.label")}
                        <sup className='text-danger'>*</sup>
                      </label>
                      <input
                        disabled={resetPassUpdateData}
                        type={showPassword.oldPassword ? "text" : "password"}
                        name='oldPassword'
                        value={passwordFields.oldPassword}
                        onChange={handlePasswordInputChange}
                        id='oldPassword'
                        className='rounded form-control'
                        placeholder={t(
                          "Profile.resetPassword.inputs.one.placeholder"
                        )}
                        required
                      />
                      <span
                        className='open_eye_icon'
                        onClick={() => togglePasswordVisibility("oldPassword")}>
                        {!resetPassUpdateData && showPassword.oldPassword ? (
                          <FaEyeSlash />
                        ) : (
                          !resetPassUpdateData && <FaEye />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className='col-lg-12 col-md-12 col-sm-12'>
                    <div className='mb-3 blog_title_fields position-relative'>
                      <label htmlFor='newPassword'>
                        {t("Profile.resetPassword.inputs.two.label")}
                        <sup className='text-danger'>*</sup>
                      </label>
                      <input
                        disabled={resetPassUpdateData}
                        type={showPassword.newPassword ? "text" : "password"}
                        name='newPassword'
                        value={passwordFields.newPassword}
                        onChange={handlePasswordInputChange}
                        id='newPassword'
                        className='rounded form-control'
                        placeholder={t(
                          "Profile.resetPassword.inputs.two.placeholder"
                        )}
                        required
                      />
                      <span
                        className='open_eye_icon'
                        onClick={() => togglePasswordVisibility("newPassword")}>
                        {!resetPassUpdateData && showPassword.newPassword ? (
                          <FaEyeSlash />
                        ) : (
                          !resetPassUpdateData && <FaEye />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className='col-lg-12 col-md-12 col-sm-12'>
                    <div className='mb-3 blog_title_fields position-relative'>
                      <label htmlFor='confirmNewPassword'>
                        {t("Profile.resetPassword.inputs.three.label")}
                        <sup className='text-danger'>*</sup>
                      </label>
                      <input
                        disabled={resetPassUpdateData}
                        type={
                          showPassword.confirmPassword ? "text" : "password"
                        }
                        name='confirmNewPassword'
                        value={passwordFields.confirmNewPassword}
                        onChange={handlePasswordInputChange}
                        id='confirmNewPassword'
                        className='rounded form-control'
                        placeholder={t(
                          "Profile.resetPassword.inputs.three.placeholder"
                        )}
                        required
                      />
                      <span
                        className='open_eye_icon'
                        style={{ bottom: "34% !important" }}
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }>
                        {!resetPassUpdateData &&
                        showPassword.confirmPassword ? (
                          <FaEyeSlash />
                        ) : (
                          !resetPassUpdateData && <FaEye />
                        )}
                      </span>

                      {matchPassMsg}
                    </div>
                  </div>

                  {!resetPassUpdateData &&
                    passwordFields?.oldPassword !== "" &&
                    passwordFields?.newPassword !== "" &&
                    passwordFields?.confirmPassword !== "" && (
                      <div className='col-12 add_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'>
                        <button
                          onClick={handleResetPasswordSubmit}
                          className='p-2 w-25 update-btn'>
                          {t("Profile.resetPassword.resetBtn")}
                        </button>
                      </div>
                    )}
                </div>
              </div>

              <div className='col-12 col-md-6 col-lg-6'>
                <div className='contact-details'>
                  <h3 className='text-secondary'>
                    {t("Profile.personalDetails.title")}
                  </h3>
                </div>
                {/* Name field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='name'>
                      {t("Profile.personalDetails.inputs.name.label")}
                      <sup className='text-danger'>*</sup>
                    </label>
                    <input
                      disabled={updateData}
                      type='text'
                      name='name'
                      onChange={handleInputChange}
                      id='name'
                      value={updatedUserData?.data?.name}
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.personalDetails.inputs.name.placeHolder"
                      )}
                    />
                    {profileUpdateError.name && (
                      <small className='text-danger fw-bold'>
                        {profileUpdateError.name}
                      </small>
                    )}
                  </div>
                </div>

                {/* father_name field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='father_name'>
                      {t("Profile.personalDetails.inputs.fatherName.label")}
                    </label>
                    <input
                      disabled={updateData}
                      type='text'
                      name='father_name'
                      onChange={handleInputChange}
                      value={updatedUserData?.data?.father_name}
                      id='father_name'
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.personalDetails.inputs.fatherName.placeHolder"
                      )}
                    />
                  </div>
                </div>

                {/* grandfather_name field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='grandfather_name'>
                      {t(
                        "Profile.personalDetails.inputs.grandfatherName.label"
                      )}{" "}
                    </label>
                    <input
                      disabled={updateData}
                      type='text'
                      name='grandfather_name'
                      onChange={handleInputChange}
                      id='grandfather_name'
                      value={updatedUserData?.data?.grandfather_name}
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.personalDetails.inputs.grandfatherName.placeHolder"
                      )}
                    />
                  </div>
                </div>

                {/* date_of_birth field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='date_of_birth'>
                      {t("Profile.personalDetails.inputs.dateOfBirth.label")}
                      <sup className='text-danger'>*</sup>
                    </label>
                    <input
                      disabled={updateData}
                      type='date'
                      name='date_of_birth'
                      id='date_of_birth'
                      onChange={handleInputChange}
                      value={updatedUserData?.data?.date_of_birth?.slice(0, 10)}
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.personalDetails.inputs.dateOfBirth.placeHolder"
                      )}
                    />
                    {profileUpdateError.date_of_birth && (
                      <small className='text-danger fw-bold'>
                        {profileUpdateError.date_of_birth}
                      </small>
                    )}
                  </div>
                </div>

                {/* gender field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='date_of_birth'>
                      {t("Profile.personalDetails.inputs.gender.label")}
                      <sup className='text-danger'>*</sup>
                    </label>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        disabled={updateData}
                        type='radio'
                        name='gender'
                        value='male'
                        id='male'
                        onChange={handleInputChange}
                        checked={updatedUserData?.data?.gender === "male"}
                      />
                      <label className='form-check-label' htmlFor='male'>
                        {t("Profile.personalDetails.inputs.gender.label1")}
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        disabled={updateData}
                        className='form-check-input'
                        onChange={handleInputChange}
                        checked={updatedUserData?.data?.gender === "female"}
                        type='radio'
                        name='gender'
                        value='female'
                        id='female'
                      />
                      <label className='form-check-label' htmlFor='female'>
                        {t("Profile.personalDetails.inputs.gender.label2")}
                      </label>
                    </div>
                  </div>
                  {profileUpdateError.gender && (
                    <small className='text-danger fw-bold'>
                      {profileUpdateError.gender}
                    </small>
                  )}
                </div>

                {/* province field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='province'>
                      {t("Profile.personalDetails.inputs.province.label")}
                      <sup className='text-danger'>*</sup>
                    </label>
                    <input
                      disabled={updateData}
                      type='text'
                      name='province'
                      onChange={handleInputChange}
                      value={updatedUserData?.data?.province}
                      id='province'
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.personalDetails.inputs.province.placeHolder"
                      )}
                    />
                    {profileUpdateError.province && (
                      <small className='text-danger fw-bold'>
                        {profileUpdateError.province}
                      </small>
                    )}
                  </div>
                </div>

                {/* district field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='district'>
                      {t("Profile.personalDetails.inputs.district.label")}
                      <sup className='text-danger'>*</sup>
                    </label>
                    <input
                      disabled={updateData}
                      type='text'
                      name='district'
                      onChange={handleInputChange}
                      value={updatedUserData?.data?.district}
                      id='district'
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.personalDetails.inputs.district.placeHolder"
                      )}
                    />
                    {profileUpdateError.district && (
                      <small className='text-danger fw-bold'>
                        {profileUpdateError.district}
                      </small>
                    )}
                  </div>
                </div>

                {/* locality field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='locality'>
                      {t("Profile.personalDetails.inputs.locality.label")}
                    </label>
                    <input
                      disabled={updateData}
                      type='text'
                      name='locality'
                      onChange={handleInputChange}
                      value={updatedUserData?.data?.locality}
                      id='locality'
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.personalDetails.inputs.locality.placeHolder"
                      )}
                    />
                  </div>
                </div>

                {/* neighborhood field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='neighborhood'>
                      {t("Profile.personalDetails.inputs.neighborhood.label")}
                    </label>
                    <input
                      disabled={updateData}
                      type='text'
                      name='neighborhood'
                      onChange={handleInputChange}
                      value={updatedUserData?.data?.neighborhood}
                      id='neighborhood'
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.personalDetails.inputs.neighborhood.placeHolder"
                      )}
                    />
                  </div>
                </div>

                {/* alley field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='alley'>
                      {t("Profile.personalDetails.inputs.alley.label")}
                    </label>
                    <input
                      disabled={updateData}
                      type='text'
                      onChange={handleInputChange}
                      value={updatedUserData?.data?.alley}
                      name='alley'
                      id='alley'
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.personalDetails.inputs.alley.placeHolder"
                      )}
                    />
                  </div>
                </div>

                {/* house_number field */}
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div className='mb-3 blog_title_fields'>
                    <label htmlFor='house_number'>
                      {t("Profile.personalDetails.inputs.houseNumber.label")}
                    </label>
                    <input
                      disabled={updateData}
                      type='text'
                      name='house_number'
                      onChange={handleInputChange}
                      value={updatedUserData?.data?.house_number}
                      id='house_number'
                      className='rounded form-control'
                      placeholder={t(
                        "Profile.personalDetails.inputs.houseNumber.placeHolder"
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              {!updateData && (
                <div className='col-12 add_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'>
                  <button
                    onClick={handleUpdateProfile}
                    className='p-2 w-25 update-btn'>
                    {t("Profile.updateBtnText")}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ProfileDetails), { ssr: false });
