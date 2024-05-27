"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { useCreateAdminCalcInputMutation } from "../../../../redux/features/queries/CALCULATORS_API";
import "./AddCalculatorForm.css";

//Input Fields Data
const inputFieldsData = [
  "ALF1",
  "ALF2",
  "ALF3",
  "ALF4",
  "ALF5",
  "ALF6",
  "cam",
  "pm",
  "cm",
  "fm",
  "cal",
  "pl",
  "cl",
  "fl",
  "cage",
  "cagm",
  "caga",
  "came",
  "camm",
  "cama",
  "cale",
  "calm",
  "cala",
  "pge",
  "pgm",
  "pga",
  "pme",
  "pmm",
  "pma",
  "ple",
  "plm",
  "pla",
  "cge",
  "cgm",
  "cga",
  "cme",
  "cmm",
  "cma",
  "cle",
  "clm",
  "cla",
  "fge",
  "fgm",
  "fga",
  "fme",
  "fmm",
  "fma",
  "fle",
  "flm",
  "fla",
];

export default function AddCalculatorForm() {
  const { locale } = useParams();

  const [createAdminCalcInput, { isLoading, isError, isSuccess, data }] =
    useCreateAdminCalcInputMutation();

  const [fieldValues, setFieldValues] = useState({});

  //Handle input fields
  const handleInputChange = (fieldName, value) => {
    // Convert the input value to a number using parseInt or parseFloat
    const numericValue = parseFloat(value);

    // Check if the numericValue is NaN (Not a Number)
    // If it's NaN, set the field value to 0
    const fieldValue = isNaN(numericValue) ? 0 : numericValue;
    setFieldValues((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  //Submit Form Handler
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // TODO: Send Field values in server
    const { data } = await createAdminCalcInput(fieldValues);
    // showing success message
    if (data?.status) {
      // clear input fields
      setFieldValues({});
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
  };

  return (
    <div className='calculator-form-main'>
      <div className='container'>
        <div className='title d-flex justify-content-between align-items-center'>
          <h2>Add Calculator Data</h2>
          <h2>Existing Calculator Data</h2>
        </div>

        {/* begin: form */}
        <form onSubmit={handleSubmitForm}>
          <div className='row mt-4'>
            {inputFieldsData.map((fieldName) => (
              <div key={fieldName} className='col-lg-4 col-md-12 col-sm-12'>
                <div className='mb-3 blog_title_fields'>
                  <label htmlFor={fieldName}>
                    {fieldName}
                    <sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='number'
                    name={fieldName}
                    id={fieldName}
                    className='rounded form-control'
                    required
                    placeholder={`Enter ${fieldName}`}
                    value={fieldValues[fieldName] || ""}
                    onChange={(e) =>
                      handleInputChange(fieldName, e.target.value)
                    }
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
              </div>
            ))}
            {/* You can access the state of all input fields using the fieldValues object */}
          </div>

          {/* Submit button */}
          <div className='col-12 add_blog_btn py-3 d-flex align-items-center w-100 justify-content-center'>
            <input type='submit' className='p-2 w-25' value='Submit' />
          </div>
        </form>
        {/* end: form */}
      </div>
    </div>
  );
}
