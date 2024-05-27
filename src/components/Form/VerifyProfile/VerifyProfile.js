"use client";

import Stepper from "@keyvaluesystems/react-stepper";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import "./VerifyProfile.css";

export default function VerifyProfile() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(59);
  const [selectedOption, setSelectedOption] = useState("");
  const [otp, setOtp] = useState("");
  const [otpEntered, setOtpEntered] = useState(false);
  const [stepsCompletion, setStepsCompletion] = useState([
    false, // Step 1
    false, // Step 2
  ]);
  const [isUnder576px, setIsUnder576px] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsUnder576px(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // console.log(option);
  };

  const handleOTPChange = (newOTP) => {
    // console.log("New OTP:", newOTP);
    setOtp(newOTP);
    // console.log("Updated OTP:", otp);
    setOtpEntered(newOTP.length === 6);
  };

  const updateCompletionStatus = (stepIndex) => {
    const newStepsCompletion = [...stepsCompletion];
    newStepsCompletion[stepIndex] = true;
    setStepsCompletion(newStepsCompletion);
  };

  const handleStepChange = async (newStepIndex) => {
    if (newStepIndex > currentStepIndex) {
      switch (currentStepIndex) {
        case 0:
          // Logic to validate phone
          /* if (phoneIsValid(phone)) {
            updateCompletionStatus(currentStepIndex);
          } */
          updateCompletionStatus(currentStepIndex);

          break;
        case 1:
          // Logic to choose get otp method
          updateCompletionStatus(currentStepIndex);
          break;
      }
    }
    setCurrentStepIndex(newStepIndex);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    switch (currentStepIndex) {
      case 0:
        handleStepChange(currentStepIndex + 1);
        break;
      case 1:
        handleStepChange(currentStepIndex + 1);

        Swal.fire({
          title: "Success!",
          text: "Your Profile Is Verified!",
          icon: "success",
        }).then(() => {
          // Optionally redirect or perform other actions after the alert
          router.push("/dashboard/profile");
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
    if (currentStepIndex === 1) {
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

  return (
    <div className='pt-2 d-flex flex-sm-column flex-row justify-content-center align-items-center'>
      {!isUnder576px && (
        <Stepper
          steps={[
            {
              stepLabel: "Step 1",
              stepDescription: !isUnder576px && "Choose To Get OTP",
              completed: stepsCompletion[0],
            },
            {
              stepLabel: "Step 2",
              stepDescription: "Verify The OTP",
              completed: !isUnder576px && stepsCompletion[1],
            },
          ]}
          orientation={"horizontal"}
          styles={styles}
          currentStepIndex={currentStepIndex}
        />
      )}

      {currentStepIndex === 0 && (
        <form className='py-3'>
          <p className='choose_otp_txt'>Choose Your OTP Method</p>
          <div className='mb-2'>
            <div className='form-check d-flex justify-content-start align-items-center mb-2'>
              <input
                className='form-check-input'
                type='radio'
                name='otpMethod'
                id='WhatsApp'
                checked={selectedOption === "WhatsApp"}
                onChange={() => handleOptionChange("WhatsApp")}
              />
              <label className='form-check-label pt-1 ps-3' htmlFor='WhatsApp'>
                WhatsApp
              </label>
            </div>
            <div className='form-check d-flex justify-content-start align-items-center mb-2'>
              <input
                className='form-check-input'
                type='radio'
                name='otpMethod'
                id='Phone'
                checked={selectedOption === "Phone"}
                onChange={() => handleOptionChange("Phone")}
              />
              <label className='form-check-label pt-1 ps-3' htmlFor='Phone'>
                Phone
              </label>
            </div>
          </div>

          <div className='d-flex justify-content-center align-items-center gap-2 mt-4'>
            <button
              type='button'
              className='prev-btn form-control py-2 mx-auto rounded-5'
              onClick={() => handleStepChange(currentStepIndex - 1)}>
              Back Page
            </button>
            <button
              type='button'
              className='next_btn form-control py-2 mx-auto rounded-5'
              onClick={() => handleStepChange(currentStepIndex + 1)}>
              Send
            </button>
          </div>
        </form>
      )}

      {currentStepIndex === 1 && (
        <form className='py-3' onSubmit={handleFormSubmit}>
          <p className='reset_txt'>Enter OTP To Verify</p>
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
                Time Remaining:{" "}
                <span style={{ fontWeight: 600 }}>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </p>
            ) : (
              // Display if countdown timer reaches 0
              <p>Did not receive code?</p>
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
              Resend OTP
            </button>
          </div>

          {otpEntered && (
            <div className='d-flex justify-content-center align-items-center gap-2 mt-4'>
              <button
                type='button'
                className='prev-btn form-control py-2 mx-auto rounded-5'
                onClick={() => handleStepChange(currentStepIndex - 1)}>
                Back Page
              </button>

              <button
                type='submit'
                className='next_btn form-control py-2 mx-auto rounded-5'>
                Verify
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
