"use client";

import Stepper from "@keyvaluesystems/react-stepper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { useCreateUserKetoCalcMutation } from "../../../../redux/features/queries/CALCULATORS_API";

// import "./VerifyProfile.css";

export default function KetoCalculator() {
  const t = useTranslations("Calculators");

  const [createUserKetoCalc, { isLoading, isError }] =
    useCreateUserKetoCalcMutation();

  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState("");
  const [stepsCompletion, setStepsCompletion] = useState([
    false, // Step 1
    false, // Step 2
  ]);
  const [isUnder576px, setIsUnder576px] = useState(false);

  // handle form state
  const [ageRangeValue, setAgeRangeValue] = useState(0);
  const [percentageValue, setPercentageValue] = useState(0);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState();
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [ALF, setALF] = useState("");
  const [dietGoal, setDietGoal] = useState("");

  // error state
  const [errorMessage, setErrorMessage] = useState("");

  const [ketoData, setKetoData] = useState({});

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

  const updateCompletionStatus = (stepIndex) => {
    const newStepsCompletion = [...stepsCompletion];
    newStepsCompletion[stepIndex] = true;
    setStepsCompletion(newStepsCompletion);
  };

  //step change handler
  const handleStepChange = async (newStepIndex) => {
    if (newStepIndex > currentStepIndex) {
      switch (currentStepIndex) {
        case 0:
          if (gender && ageRangeValue !== 0) {
            updateCompletionStatus(currentStepIndex);
          } else {
            setErrorMessage(`${t("errorMsg.error1")}`);
            return;
          }
          break;
        case 1:
          if (weight !== 0 && height !== 0 && weight !== "" && height !== "") {
            updateCompletionStatus(currentStepIndex);
          } else {
            setErrorMessage(`${t("errorMsg.error2")}`);
            return;
          }
          break;
        case 2:
          if (ALF !== "") {
            updateCompletionStatus(currentStepIndex);
          } else {
            setErrorMessage(`${t("errorMsg.error3")}`);
            return;
          }
          break;
        case 3:
          if (dietGoal !== "") {
            updateCompletionStatus(currentStepIndex);
          } else {
            setErrorMessage(`${t("errorMsg.error4")}`);
            return;
          }
          break;
        case 4:
          if (percentageValue !== 0) {
            updateCompletionStatus(currentStepIndex);
          } else {
            setErrorMessage(`${t("errorMsg.error5")}`);
            return;
          }
          break;
        case 5:
          updateCompletionStatus(currentStepIndex);
          break;
      }
      setErrorMessage(""); // Clear error message when all conditions are met
    }
    setCurrentStepIndex(newStepIndex);
  };

  // Event handler to update the state when the range input changes
  const handleAgeRangeChange = (event) => {
    setAgeRangeValue(parseFloat(event.target.value));
  };

  // handle Age Text State
  const handleAgeTextChange = (event) => {
    // Ensure the entered value is a valid number
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setAgeRangeValue(newValue);
    } else {
      // Handle case where the entered value is not a valid number
      setAgeRangeValue(""); // Set an empty string or another default value if needed
    }
  };

  // handle Gender Change
  const handleGenderChange = (value) => {
    setGender(value);
  };

  // handle ALF State
  const handleALFChange = (e) => {
    const numericValue = parseFloat(e.target.value);
    // Check if the parsed value is a valid number
    if (!isNaN(numericValue)) {
      // Update the state with the numeric value
      setALF(numericValue);
    }
  };

  // handle Percentage Change
  const handleFatPercentageChange = (e) => {
    const numericValue = parseFloat(e.target.value);
    // Check if the parsed value is a valid number
    if (!isNaN(numericValue)) {
      // Update the state with the numeric value
      setPercentageValue(numericValue);
    }
  };
  // handle Percentage Change
  const handleTextPercentage = (event) => {
    // Ensure the entered value is a valid number
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue) && newValue >= 5) {
      setPercentageValue(newValue);
    } else {
      // Handle case where the entered value is not a valid number
      setPercentageValue(""); // Set an empty string or another default value if needed

      setErrorMessage(`${t("errorMsg.error6")}`);
    }
  };

  // handle Weight Change
  const handleWeightChange = (e) => {
    // Ensure the entered value is a valid number
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setWeight(newValue);
    } else {
      // Handle case where the entered value is not a valid number
      setWeight(""); // Set an empty string or another default value if needed
    }
  };

  const handleHeightChange = (e) => {
    // Ensure the entered value is a valid number
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setHeight(newValue);
    } else {
      // Handle case where the entered value is not a valid number
      setHeight(""); // Set an empty string or another default value if needed
    }
  };

  // handle ALF Change
  const handleDietGoal = (e) => {
    setDietGoal(e.target.value);
  };

  // submit form handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if all required inputs are provided before submitting the form
      if (
        weight !== 0 &&
        height !== 0 &&
        gender &&
        ageRangeValue !== 0 &&
        ALF !== "" &&
        dietGoal !== "" &&
        percentageValue !== 0
      ) {
        const formData = {
          weight,
          height,
          age: ageRangeValue,
          gender,
          fat_percentage: percentageValue,
          ALF,
          diet_goal: dietGoal,
        };

        const { data } = await createUserKetoCalc(formData);
        setKetoData(data.data);
        handleStepChange(currentStepIndex + 1);
      } else {
        // Handle case where not all required inputs are provided
        alert("Please complete all steps before submitting.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='py-2 my-4 calculators shadow-lg d-flex flex-sm-column flex-row justify-content-center align-items-center'>
      {/* stepper */}
      {!isUnder576px && (
        <Stepper
          steps={[
            {
              completed: stepsCompletion[0],
            },
            {
              completed: !isUnder576px && stepsCompletion[1],
            },
            {
              completed: !isUnder576px && stepsCompletion[2],
            },
            {
              completed: !isUnder576px && stepsCompletion[3],
            },
            {
              completed: !isUnder576px && stepsCompletion[4],
            },
            {
              completed: !isUnder576px && stepsCompletion[5],
            },
          ]}
          orientation={"horizontal"}
          styles={styles}
          currentStepIndex={currentStepIndex}
        />
      )}
      {/* Age and gender field */}
      {currentStepIndex === 0 && (
        <div className='py-3 step-form'>
          <div className='form_title'>
            <h4>{t("ketoMacroClc.inputs.gender.title")}:</h4>
          </div>

          <div className='mt-4'>
            {errorMessage && (
              <div>
                <div className='error_msg'>{errorMessage}</div>
              </div>
            )}
            {/* gender input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='man'
                type='radio'
                value='man'
                name='gender'
                onChange={() => handleGenderChange("man")}
                required
              />
              <label className='form-check-label' htmlFor='man'>
                {t("ketoMacroClc.inputs.gender.label")}
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                id='woman'
                required
                type='radio'
                value='woman'
                name='gender'
                onChange={() => handleGenderChange("woman")}
              />
              <label className='form-check-label' htmlFor='woman'>
                {t("ketoMacroClc.inputs.gender.label2")}
              </label>
            </div>
            {/* age input */}
            <div className='slider-input mt-4'>
              <div className='text-center'>
                <label htmlFor='age' className='form-label'>
                  {t("ketoMacroClc.inputs.gender.age")} :
                </label>
                <input
                  type='number'
                  className='valueAge ml-3'
                  value={ageRangeValue}
                  onChange={handleAgeTextChange}
                />
              </div>

              <input
                type='range'
                className='form-range mt-2'
                min='0'
                max='100'
                step='1'
                id='age'
                name='age'
                value={ageRangeValue}
                onChange={handleAgeRangeChange}
              />
            </div>
          </div>
          <div className='btns d-flex align-items-center justify-content-center'>
            <button
              className='stepper_btn my-3'
              onClick={() => handleStepChange(currentStepIndex + 1)}>
              {t("next")}
            </button>
          </div>
        </div>
      )}

      {/* height and weight field */}
      {currentStepIndex === 1 && (
        <div className='py-3 step-form'>
          <div className='form_title'>
            <h4>{t("ketoMacroClc.inputs.weightHeight.title")}:</h4>
          </div>

          <div className='mt-4'>
            {errorMessage && (
              <div>
                <div className='error_msg'>{errorMessage}</div>
              </div>
            )}
            {/* weight field */}
            <div className='stepper_fields'>
              <label htmlFor='weight mb-1'>
                {t("ketoMacroClc.inputs.weightHeight.label")}
              </label>
              <input
                type='number'
                name='weight'
                value={weight}
                onChange={handleWeightChange}
                placeholder={t("ketoMacroClc.inputs.weightHeight.placeholder1")}
              />
            </div>
            {/* height field */}
            <div className='stepper_fields mt-3'>
              <label htmlFor='weight mb-1'>
                {t("ketoMacroClc.inputs.weightHeight.label2")}
              </label>
              <input
                type='number'
                name='weight'
                value={height}
                onChange={handleHeightChange}
                placeholder={t("ketoMacroClc.inputs.weightHeight.placeholder2")}
              />
            </div>
          </div>

          <div className='btns d-flex align-items-center justify-content-center'>
            <button
              className='stepper_btn btn-next  my-3 mx-1'
              onClick={() => handleStepChange(currentStepIndex - 1)}>
              {t("back")}
            </button>

            <button
              className='stepper_btn  my-3 mx-1'
              onClick={() => handleStepChange(currentStepIndex + 1)}>
              {t("next")}
            </button>
          </div>
        </div>
      )}

      {/* selecting alf fields */}
      {currentStepIndex === 2 && (
        <div className='py-3 step-form'>
          <div className='form_title'>
            <h4>{t("ketoMacroClc.inputs.alf.title")}:</h4>
          </div>

          <div className='mt-4'>
            {errorMessage && (
              <div>
                <div className='error_msg'>{errorMessage}</div>
              </div>
            )}
            {/* ALF1 input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='ALF1'
                required
                type='radio'
                value='1'
                name='ALF'
                onChange={handleALFChange}
              />
              <label className='form-check-label' htmlFor='ALF1'>
                {t("ketoMacroClc.inputs.alf.label.title")}

                <small>{t("ketoMacroClc.inputs.alf.label.text")}</small>
              </label>
            </div>

            {/* ALF2 input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='ALF2'
                required
                type='radio'
                value='2'
                name='ALF'
                onChange={handleALFChange}
              />
              <label className='form-check-label' htmlFor='ALF2'>
                {t("ketoMacroClc.inputs.alf.label2.title")}
                <small>{t("ketoMacroClc.inputs.alf.label2.text")}</small>
              </label>
            </div>

            {/* ALF3 input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='ALF3'
                required
                type='radio'
                value='3'
                name='ALF'
                onChange={handleALFChange}
              />
              <label className='form-check-label' htmlFor='ALF3'>
                {t("ketoMacroClc.inputs.alf.label3.title")}

                <small>{t("ketoMacroClc.inputs.alf.label3.text")}</small>
              </label>
            </div>

            {/* ALF4 input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='ALF4'
                required
                type='radio'
                value='4'
                name='ALF'
                onChange={handleALFChange}
              />
              <label className='form-check-label' htmlFor='ALF3'>
                {t("ketoMacroClc.inputs.alf.label4.title")}
                <small>{t("ketoMacroClc.inputs.alf.label4.text")}</small>
              </label>
            </div>

            {/* ALF5 input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='ALF5'
                required
                type='radio'
                value='5'
                name='ALF'
                onChange={handleALFChange}
              />
              <label className='form-check-label' htmlFor='ALF5'>
                {t("ketoMacroClc.inputs.alf.label5.title")}

                <small>{t("ketoMacroClc.inputs.alf.label5.text")}</small>
              </label>
            </div>

            {/* ALF6 input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='ALF6'
                required
                type='radio'
                value='6'
                name='ALF'
                onChange={handleALFChange}
              />
              <label className='form-check-label' htmlFor='ALF6'>
                {t("ketoMacroClc.inputs.alf.label6.title")}

                <small>{t("ketoMacroClc.inputs.alf.label6.text")}</small>
              </label>
            </div>
          </div>

          <div className='btns d-flex align-items-center justify-content-center'>
            <button
              className='stepper_btn btn-next  my-3 mx-1'
              onClick={() => handleStepChange(currentStepIndex - 1)}>
              {t("back")}
            </button>

            <button
              className='stepper_btn  my-3 mx-1'
              onClick={() => handleStepChange(currentStepIndex + 1)}>
              {t("back")}
            </button>
          </div>
        </div>
      )}

      {/* my diet goal */}
      {currentStepIndex === 3 && (
        <div className='py-3 step-form'>
          <div className='form_title'>
            <h4>{t("ketoMacroClc.inputs.dietGoal.title")}:</h4>
          </div>

          <div className='mt-4'>
            {errorMessage && (
              <div>
                <div className='error_msg'>{errorMessage}</div>
              </div>
            )}
            {/* maintain weight & muscles input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='maintain_weight'
                required
                type='radio'
                value='maintain weight & muscles'
                name='diet_goal'
                onChange={handleDietGoal}
              />
              <label className='form-check-label' htmlFor='maintain_weight'>
                {t("ketoMacroClc.inputs.dietGoal.inputs.label1")}
              </label>
            </div>

            {/* loss fat input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='loss_fat'
                required
                type='radio'
                value='loss fat'
                name='diet_goal'
                onChange={handleDietGoal}
              />
              <label className='form-check-label' htmlFor='loss_fat'>
                {t("ketoMacroClc.inputs.dietGoal.inputs.label2")}
              </label>
            </div>
          </div>

          <div className='btns d-flex align-items-center justify-content-center'>
            <button
              className='stepper_btn btn-next  my-3 mx-1'
              onClick={() => handleStepChange(currentStepIndex - 1)}>
              {t("back")}
            </button>

            <button
              className='stepper_btn  my-3 mx-1'
              onClick={() => handleStepChange(currentStepIndex + 1)}>
              {t("next")}
            </button>
          </div>
        </div>
      )}

      {/* my fat percentage */}
      {currentStepIndex === 4 && (
        <form onSubmit={handleFormSubmit} className='py-3 step-form'>
          <div className='form_title'>
            <h4>{t("ketoMacroClc.inputs.fatPercentage.title")}:</h4>
          </div>

          <div className='mt-4'>
            {errorMessage && (
              <div>
                <div className='error_msg'>{errorMessage}</div>
              </div>
            )}
            {/* fat_percentage input */}
            <div className='slider-input mt-4'>
              <div className='text-center'>
                <label htmlFor='age' className='form-label'>
                  {t("ketoMacroClc.inputs.fatPercentage.inputs.label1")}:
                </label>{" "}
                <input
                  type='number'
                  className='valueAge ml-3'
                  value={percentageValue}
                  onChange={handleTextPercentage}
                />
              </div>

              <div className='w-100 fat_input fat_input_keto'>
                <RangeSlider
                  value={percentageValue}
                  onChange={handleFatPercentageChange}
                  step={10}
                  // tooltip='false'
                />
              </div>
            </div>
          </div>

          <div className='btns d-flex align-items-center justify-content-center'>
            <button
              className='stepper_btn btn-next  my-3 mx-1'
              onClick={() => handleStepChange(currentStepIndex - 1)}>
              {t("back")}
            </button>

            <button className='stepper_btn my-3' disabled={isLoading}>
              {t("submit")}
            </button>
          </div>
        </form>
      )}

      {/* result */}
      {currentStepIndex === 5 && (
        <div className='py-3 step-form'>
          <div className='form_title'>
            <h4>{t("result")}</h4>
          </div>

          <div className='mt-4'>
            <div className='result row gap-3 my-3 justify-content-center'>
              <div
                className='mb-2 single_box col-lg-4'
                style={{ backgroundColor: "#e6ceef" }}>
                <label>BMR </label>
                <span>{ketoData?.BMR?.toFixed(2)}</span>
              </div>
              <div
                className='mb-2 single_box col-lg-4'
                style={{ backgroundColor: "#d0ede8" }}>
                <label>TDEE </label>
                <span>{ketoData?.TDEE?.toFixed(2)}</span>
              </div>
              <div
                className='mb-2 single_box col-lg-4'
                style={{ backgroundColor: "#e6ceef" }}>
                <label>Calories </label>
                <span>{ketoData?.calories?.toFixed(2)}</span>
              </div>
              <div
                className='mb-2 single_box col-lg-4'
                style={{ backgroundColor: "#cee5ef" }}>
                <label>Carb </label>
                <span>{ketoData?.carb?.toFixed(2)}</span>
              </div>
              <div
                className='single_box col-lg-4'
                style={{ backgroundColor: "#feefd9" }}>
                <label>Protein </label>
                <span>{ketoData.protein?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className='btns d-flex align-items-center justify-content-center'>
            <button
              onClick={() => handleStepChange(currentStepIndex - 1)}
              className='stepper_btn my-3'
              type='submit'>
              {t("back")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
