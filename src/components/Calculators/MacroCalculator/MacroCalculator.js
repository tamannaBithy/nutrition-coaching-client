"use client";

import Stepper from "@keyvaluesystems/react-stepper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { useCreateUserMacroCalcMutation } from "../../../../redux/features/queries/CALCULATORS_API";

export default function MacroCalculator() {
  const t = useTranslations("Calculators");

  const [createUserKetoCalc, { isLoading, isError }] =
    useCreateUserMacroCalcMutation();

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
  const [percentageValue, setPercentageValue] = useState(5);

  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [ALF, setALF] = useState("");
  const [dietGoal, setDietGoal] = useState("");
  const [bodyType, setBodyType] = useState("");

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
          if (bodyType !== "") {
            updateCompletionStatus(currentStepIndex);
          } else {
            setErrorMessage(`${t("errorMsg.error5")}`);
            return;
          }
          break;
        case 5:
          if (percentageValue !== 0) {
            updateCompletionStatus(currentStepIndex);
          } else {
            setErrorMessage(`${t("errorMsg.error6")}`);
            return;
          }
          break;
        case 6:
          updateCompletionStatus(currentStepIndex);
          break;
        case 7:
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
      // Ensure the value does not go above 40
      const cappedValue = Math.min(numericValue, 40);
      // Check if the value is greater than or equal to 5
      if (cappedValue >= 5) {
        // Update the state with the capped value
        setPercentageValue(cappedValue);
      } else {
        // Set an error message if the value is below 5
        setErrorMessage(`${t("errorMsg.error6")}`);
      }
    } else {
      // Handle case where the entered value is not a valid number
      setErrorMessage(`${t("errorMsg.error6")}`);
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

  // handle diet Change
  const handleDietGoal = (e) => {
    setDietGoal(e.target.value);
  };
  // handle body type Change
  const handleBodyType = (e) => {
    setBodyType(e.target.value);
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
        bodyType !== "" &&
        percentageValue !== 0
      ) {
        const formData = {
          weight,
          height,
          age: ageRangeValue,
          gender,
          fat_percentage: percentageValue,
          body_type: bodyType,
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
    <div className='py-2 my-4 calculators calculators_macro shadow-lg d-flex flex-sm-column flex-row justify-content-center align-items-center'>
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
            {
              completed: !isUnder576px && stepsCompletion[6],
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
            <h4>{t("macroClc.inputs.gender.title")}:</h4>
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
                {t("macroClc.inputs.gender.label")}
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
                {t("macroClc.inputs.gender.label2")}
              </label>
            </div>
            {/* age input */}
            <div className='slider-input mt-4'>
              <div className='text-center'>
                <label htmlFor='age' className='form-label'>
                  {t("macroClc.inputs.gender.age")} :
                </label>{" "}
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
            <h4>{t("macroClc.inputs.weightHeight.title")} :</h4>
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
                {t("macroClc.inputs.weightHeight.label")}
              </label>
              <input
                type='number'
                name='weight'
                value={weight}
                onChange={handleWeightChange}
                placeholder={t("macroClc.inputs.weightHeight.placeholder1")}
              />
            </div>
            {/* height field */}
            <div className='stepper_fields mt-3'>
              <label htmlFor='weight mb-1'>
                {t("macroClc.inputs.weightHeight.label2")}
              </label>
              <input
                type='number'
                name='weight'
                value={height}
                onChange={handleHeightChange}
                placeholder={t("macroClc.inputs.weightHeight.placeholder2")}
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
      {/* My ALF */}
      {currentStepIndex === 2 && (
        <div className='py-3 step-form'>
          <div className='form_title'>
            <h4>{t("macroClc.inputs.alf.title")}:</h4>
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
                {t("macroClc.inputs.alf.label.title")}
                <small>{t("macroClc.inputs.alf.label.text")}</small>
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
                {t("macroClc.inputs.alf.label2.title")}
                <small>{t("macroClc.inputs.alf.label2.text")}</small>
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
                {t("macroClc.inputs.alf.label3.title")}
                <small>{t("macroClc.inputs.alf.label3.text")}</small>
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
              <label className='form-check-label' htmlFor='ALF4'>
                {t("macroClc.inputs.alf.label4.title")}

                <small>{t("macroClc.inputs.alf.label4.text")}</small>
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
                {t("macroClc.inputs.alf.label5.title")}

                <small>{t("macroClc.inputs.alf.label5.text")}</small>
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
                {t("macroClc.inputs.alf.label6.title")}

                <small>{t("macroClc.inputs.alf.label6.text")}</small>
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
      {/* Diet goal */}
      {currentStepIndex === 3 && (
        <div className='py-3 step-form'>
          <div className='form_title'>
            <h4>{t("macroClc.inputs.dietGoal.title")}:</h4>
          </div>

          <div className='mt-4'>
            {errorMessage && (
              <div>
                <div className='error_msg'>{errorMessage}</div>
              </div>
            )}
            {/* gain muscles input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='gain_muscles'
                required
                type='radio'
                value='gain muscles'
                name='diet_goal'
                onChange={handleDietGoal}
              />
              <label className='form-check-label' htmlFor='gain_muscles'>
                {t("macroClc.inputs.dietGoal.inputs.label1")}
              </label>
            </div>
            {/* maintain muscles input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='maintain_muscles'
                required
                type='radio'
                value='maintain muscles'
                name='diet_goal'
                onChange={handleDietGoal}
              />
              <label className='form-check-label' htmlFor='maintain_muscles'>
                {t("macroClc.inputs.dietGoal.inputs.label2")}
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
                {t("macroClc.inputs.dietGoal.inputs.label3")}
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
      {/* Body type */}
      {currentStepIndex === 4 && (
        <div className='py-3 step-form'>
          <div className='form_title'>
            <h4>{t("macroClc.inputs.bodyType.title")}:</h4>
          </div>

          <div className='mt-4'>
            {errorMessage && (
              <div>
                <div className='error_msg'>{errorMessage}</div>
              </div>
            )}
            {/* Ectomorph input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='ectomorph'
                required
                type='radio'
                value='ectomorph'
                name='body_type'
                onChange={handleBodyType}
              />
              <label className='form-check-label' htmlFor='ectomorph'>
                {t("macroClc.inputs.bodyType.inputs.label1")}
              </label>
            </div>
            {/* mesomorph input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='mesomorph'
                required
                type='radio'
                value='mesomorph'
                name='body_type'
                onChange={handleBodyType}
              />
              <label className='form-check-label' htmlFor='mesomorph'>
                {t("macroClc.inputs.bodyType.inputs.label2")}
              </label>
            </div>

            {/* andromorph input */}
            <div className='form-check'>
              <input
                className='form-check-input'
                id='andromorph'
                required
                type='radio'
                value='andromorph'
                name='body_type'
                onChange={handleBodyType}
              />
              <label className='form-check-label' htmlFor='andromorph'>
                {t("macroClc.inputs.bodyType.inputs.label3")}
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
      {/* Fat Percentage */}
      {currentStepIndex === 5 && (
        <form onSubmit={handleFormSubmit} className='py-3 step-form'>
          <div className='form_title'>
            <h4>{t("macroClc.inputs.fatPercentage.title")}:</h4>
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
                  {t("macroClc.inputs.fatPercentage.inputs.label1")}:
                </label>
                <input
                  type='number'
                  className='valueAge ml-3'
                  value={percentageValue}
                  onChange={handleTextPercentage}
                />
              </div>

              <div className='w-100 fat_input'>
                <RangeSlider
                  value={percentageValue}
                  onChange={handleFatPercentageChange}
                  step={1}
                  max={40}
                  tooltipPlacement='top'
                  tooltip='on'
                />

                <div className='fat_image'>
                  <Image
                    src={
                      percentageValue >= 5 && percentageValue <= 9
                        ? "/assets/macro-calc/image7.png"
                        : percentageValue >= 10 && percentageValue <= 14
                        ? "/assets/macro-calc/image6.png"
                        : percentageValue >= 15 && percentageValue <= 19
                        ? "/assets/macro-calc/image5.png"
                        : percentageValue >= 20 && percentageValue <= 24
                        ? "/assets/macro-calc/image4.png"
                        : percentageValue >= 25 && percentageValue <= 29
                        ? "/assets/macro-calc/image3.png"
                        : percentageValue >= 30 && percentageValue <= 34
                        ? "/assets/macro-calc/image2.png"
                        : percentageValue >= 35 && percentageValue <= 40
                        ? "/assets/macro-calc/image1.png"
                        : "/assets/macro-calc/image7.png" // Default image
                    }
                    width={100}
                    height={100}
                    alt='FAT IMAGE'
                  />
                </div>
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
      {currentStepIndex === 6 && (
        <div className='py-3 step-form'>
          <div className='form_title'>
            <h4> {t("result")}</h4>
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
