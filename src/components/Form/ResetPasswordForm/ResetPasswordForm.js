"use client";

import TextInput from "@/components/Common/TextInput";
import Stepper from "@keyvaluesystems/react-stepper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import { useForgetPasswordOtpMutation } from "../../../../redux/features/queries/USER_API";
import "./ResetPasswordForm.css";

export default function ResetPasswordForm({}) {
  const [forgetPasswordOtp] = useForgetPasswordOtpMutation();
  const t = useTranslations("ResetPassword");

  const router = useRouter();
  // State variables to manage  minutes, and seconds
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(59);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [phone, setPhone] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [otp, setOtp] = useState("");
  const [otpEntered, setOtpEntered] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [confirmPasswordEntered, setConfirmPasswordEntered] = useState(false);
  const [stepsCompletion, setStepsCompletion] = useState([
    false, // Step 1
    false, // Step 2
    false, // Step 3
    false, // Step 4
  ]);

  const [isUnder576px, setIsUnder576px] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsUnder576px(window.innerWidth < 320);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    console.log(option);
  };

  const handleOTPChange = (newOTP) => {
    console.log("New OTP:", newOTP);
    setOtp(newOTP);
    console.log("Updated OTP:", otp);
    setOtpEntered(newOTP.length === 6);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordEntered(true);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordEntered(true);
  };

  const updateCompletionStatus = (stepIndex) => {
    const newStepsCompletion = [...stepsCompletion];
    newStepsCompletion[stepIndex] = true;
    setStepsCompletion(newStepsCompletion);
  };

  const phoneIsValid = (phoneNumber) => {
    console.log(phoneNumber);
  };

  const handleStepChange = async (newStepIndex) => {
    if (newStepIndex > currentStepIndex) {
      switch (currentStepIndex) {
        case 0:
          // Logic to validate phone
          if (phoneIsValid(phone)) {
            updateCompletionStatus(currentStepIndex);
          }
          updateCompletionStatus(currentStepIndex);

          break;
        case 1:
          // Logic to choose get otp method
          updateCompletionStatus(currentStepIndex);
          break;
        case 2:
          // Logic to validate OTP
          /* if (otpIsValid(otp)) {
            updateCompletionStatus(currentStepIndex);
          } */
          updateCompletionStatus(currentStepIndex);

          break;
        case 3:
          // Logic to validate Password
          /* if (passwordIsValid(password, confirmPassword)) {
            updateCompletionStatus(currentStepIndex);
          } */
          updateCompletionStatus(currentStepIndex);
          break;
      }
    }
    setCurrentStepIndex(newStepIndex);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("call");

    switch (currentStepIndex) {
      case 0:
        handleStepChange(currentStepIndex + 1);
        break;
      case 1:
        try {
          // Extract form data for step 1
          const requestData = {
            phone,
            smsViaMethod: selectedOption,
          };
          // Call the API with form data
          const response = await forgetPasswordOtp(requestData);

          if (response?.data?.status) {
            handleStepChange(currentStepIndex + 1); // Move to the next step
          } else {
            // Handle error response from the server
            console.error("Error:", response.data.error);
          }
        } catch (error) {
          console.log(error);
        }
        break;
      case 2:
        handleStepChange(currentStepIndex + 1);
        break;
      case 3:
        handleStepChange(currentStepIndex + 1);

        Swal.fire({
          title: "Success!",
          text: "Password reset successful!",
          icon: "success",
        }).then(() => {
          // Optionally redirect or perform other actions after the alert
          router.push("/login");
        });
        break;
    }
  };

  const styles = {
    LabelTitle: () => ({
      color: "#2a5631",
    }),
    ActiveLabelDescription: () => ({
      color: "#2a5631",
    }),
    LineSeparator: () => ({
      backgroundColor: "#8dc143",
    }),
    ActiveNode: () => ({
      backgroundColor: "#8dc143",
    }),
    CompletedNode: () => ({
      backgroundColor: "#8dc143",
    }),
  };

  // Start Timer Function
  const startTimer = () => {
    return setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          return 59;
        } else {
          clearInterval(intervalRef.current);
          return 0;
        }
      });
    }, 1000);
  };

  // Maintain a reference to the interval to be able to clear it later
  const intervalRef = useRef(null);

  useEffect(() => {
    // Start the timer when currentStepIndex is 2
    if (currentStepIndex === 2) {
      intervalRef.current = startTimer();
    } else {
      // Clear the interval when the step changes
      clearInterval(intervalRef.current);
    }

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentStepIndex, startTimer]); // Re-run this effect whenever 'currentStepIndex' changes

  // Function to resend OTP
  const resendOTP = () => {
    setMinutes(2);
    setSeconds(59);
  };

  // //   {
  // // "phone":xxxxxxxxxxxxxxxx,
  // //  "smsViaMethod": "smsToPhone"
  // "smsToPhone", "whatsapp";
  // // }
  return (
    <div className='pt-2 d-flex flex-sm-column flex-row justify-content-center align-items-center res_flex'>
      {!isUnder576px && (
        <Stepper
          steps={[
            {
              stepLabel: `${t("steps.one.title")}`,
              stepDescription: !isUnder576px && `${t("steps.one.description")}`,
              completed: stepsCompletion[0],
            },
            {
              stepLabel: `${t("steps.two.title")}`,
              stepDescription: `${t("steps.two.description")}`,
              completed: !isUnder576px && stepsCompletion[1],
            },
            {
              stepLabel: `${t("steps.three.title")}`,
              stepDescription: `${t("steps.three.description")}`,
              completed: !isUnder576px && stepsCompletion[2],
            },
            {
              stepLabel: `${t("steps.four.title")}`,
              stepDescription: `${t("steps.four.description")}`,
              completed: !isUnder576px && stepsCompletion[3],
            },
          ]}
          orientation={"horizontal"}
          styles={styles}
          currentStepIndex={currentStepIndex}
        />
      )}

      {currentStepIndex === 0 && (
        <form className='py-3' onSubmit={handleFormSubmit}>
          <p className='reset_txt'>{t("formSteps.one.title")}</p>
          <div className='mb-2'>
            <TextInput
              type='number'
              className='form-control mx-auto'
              placeholder={t("formSteps.one.inputPlaceholder")}
              required
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <button
            type='submit'
            className='reset_pwd_btn form-control py-2 mt-3 mx-auto rounded-5'>
            Send
          </button>
        </form>
      )}
      {currentStepIndex === 1 && (
        <form className='py-3' onSubmit={handleFormSubmit}>
          <p className='reset_txt'>{t("formSteps.two.title")}</p>
          <div className='mb-2'>
            <div className='form-check d-flex justify-content-start align-items-center mb-2'>
              <input
                className='form-check-input'
                type='radio'
                name='otpMethod'
                id='WhatsApp'
                checked={selectedOption === "whatsapp"}
                onChange={() => handleOptionChange("whatsapp")}
              />
              <label className='form-check-label pt-1 ps-3' htmlFor='WhatsApp'>
                {t("formSteps.two.inputs.two")}
              </label>
            </div>
            <div className='form-check d-flex justify-content-start align-items-center mb-2'>
              <input
                className='form-check-input'
                type='radio'
                name='otpMethod'
                id='Phone'
                checked={selectedOption === "smsToPhone"}
                onChange={() => handleOptionChange("smsToPhone")}
              />
              <label className='form-check-label pt-1 ps-3' htmlFor='Phone'>
                {t("formSteps.two.inputs.one")}
              </label>
            </div>
          </div>

          <div className='d-flex justify-content-center align-items-center gap-2 mt-4'>
            <button
              type='button'
              className='prev-btn form-control py-2 mx-auto rounded-5'
              onClick={() => handleStepChange(currentStepIndex - 1)}>
              {t("formSteps.backBtn")}
            </button>
            <button
              type='submit'
              className='next_btn form-control py-2 mx-auto rounded-5'>
              {t("formSteps.sendBtn")}
            </button>
          </div>
        </form>
      )}
      {currentStepIndex === 2 && (
        <form className='py-3' onSubmit={handleFormSubmit}>
          <p className='reset_txt'>{t("formSteps.three.title")}</p>
          <div className='mb-2 '>
            <OTPInput
              value={otp}
              onChange={handleOTPChange}
              inputStyle='inputStyle'
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <div className='countdown-text'>
            {/* Display countdown timer if seconds or minutes are greater than 0 */}

            {seconds > 0 || minutes > 0 ? (
              <p>
                {t("formSteps.three.timerTitle")}:{" "}
                <span style={{ fontWeight: 600 }}>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </p>
            ) : (
              // Display if countdown timer reaches 0
              <p>{t("formSteps.three.resend.title")}</p>
            )}

            {/* Button to resend OTP */}
            <button
              disabled={seconds > 0 || minutes > 0}
              style={{
                color: seconds > 0 || minutes > 0 ? "#092635" : "#FFFFFF",
                backgroundColor:
                  seconds > 0 || minutes > 0 ? "#acdaa7" : "#2a5631",
                padding: "5px 20px",
                borderRadius: "5px",
                border:
                  seconds > 0 || minutes > 0 ? "1px solid #8dc143" : "none",
                fontWeight: 600,
              }}
              onClick={resendOTP}>
              {t("formSteps.resendOtp")}
            </button>
          </div>

          {otpEntered && (
            <div className='d-flex justify-content-center align-items-center gap-2 mt-4'>
              <button
                type='button'
                className='prev-btn form-control py-2 mx-auto rounded-5'
                onClick={() => handleStepChange(currentStepIndex - 1)}>
                {t("formSteps.backBtn")}
              </button>
              <button
                type='submit'
                className='next_btn form-control py-2 mx-auto rounded-5'
                onClick={() => handleStepChange(currentStepIndex + 1)}>
                {t("formSteps.sendBtn")}
              </button>
            </div>
          )}
        </form>
      )}
      {currentStepIndex === 3 && (
        <form className='py-3' onSubmit={handleFormSubmit}>
          <p className='reset_txt'>{t("formSteps.four.title")}</p>
          <div className='mb-2'>
            <TextInput
              type='password'
              className='form-control mx-auto'
              placeholder={t("formSteps.four.inputPlaceholderOne")}
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className='mb-2'>
            <TextInput
              type='password'
              className='form-control mx-auto'
              placeholder={t("formSteps.four.inputPlaceholderTwo")}
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <button
            title='Send'
            type='submit'
            className='reset_pwd_btn form-control py-2 mt-3  mx-auto rounded-5'>
            {t("formSteps.sendBtn")}
          </button>
        </form>
      )}
    </div>
  );
}
