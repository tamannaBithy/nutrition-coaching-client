"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { useCreateDiscountForOrderMutation } from "../../../../../redux/features/queries/DISCOUNT_API";

/**
 * Component for adding new discounts.
 * @component
 * @returns {JSX.Element} The rendered AddDiscountForm component.
 */
export default function MainMenuDiscountForm() {
  const t = useTranslations("Dashboard");
  const { locale } = useParams();
  const [createDiscountForOrder, { isSuccess, data }] =
    useCreateDiscountForOrderMutation();

  // State variables for form inputs
  const [discountStatus, setDiscountStatus] = useState(""); // Discount Active Status
  const [category, setCategory] = useState(""); // Discount category
  const [maxPrice, setMaxPrice] = useState(""); // Max Price
  const [minPrice, setMinPrice] = useState(""); // Min Price
  const [discountPercentage, setDiscountPercentage] = useState(""); // Discount Percentage

  // Reset form function
  const resetForm = () => {
    setDiscountStatus("");
    setCategory("");
    setMaxPrice("");
    setMinPrice("");
    setDiscountPercentage("");
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse inputs to ensure they are treated as numbers
    const parsedMaxPrice = parseFloat(maxPrice);
    const parsedMinPrice = parseFloat(minPrice);
    const parsedDiscountPercentage = parseFloat(discountPercentage);

    // Validate inputs before submitting the form
    if (
      isNaN(parsedMaxPrice) ||
      isNaN(parsedMinPrice) ||
      isNaN(parsedDiscountPercentage) ||
      maxPrice < 0 ||
      minPrice < 0 ||
      discountPercentage < 0
    ) {
      // Display an error message or take appropriate action
      alert("Invalid input. Please provide valid positive values.");
      return;
    }

    // form data
    const formData = {
      ranges: [
        {
          min: parsedMinPrice,
          max: parsedMaxPrice,
          percentage: parsedDiscountPercentage,
          isActive: discountStatus === "true",
        },
      ],
      category,
    };

    // Call the API here
    const { data } = await createDiscountForOrder(formData);
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
  };

  return (
    <div className='pt-4'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          {/* Discount Active Status */}
          <div className='col-md-6'>
            <div className='mb-4 discount_percentage'>
              <label className='mb-1' htmlFor='percentage'>
                {t("ManageDiscounts.inputs.discountStatus.label")}
                <sup className='text-danger'>*</sup>{" "}
              </label>
              <select
                value={discountStatus}
                onChange={(e) => setDiscountStatus(e.target.value)}
                className='form-select form-select-lg mb-3'
                aria-label='.form-select-lg example'
                required>
                <option value='' selected disabled>
                  {t("ManageDiscounts.inputs.discountStatus.label2")}
                </option>
                <option value='true'>
                  {t("ManageDiscounts.inputs.discountStatus.active")}
                </option>
                <option value='false'>
                  {" "}
                  {t("ManageDiscounts.inputs.discountStatus.inactive")}
                </option>
              </select>
            </div>
          </div>
          {/* Discount category*/}
          <div className='col-md-6'>
            <div className='mb-4 discount_percentage'>
              <label className='mb-1' htmlFor='percentage'>
                {t("ManageDiscounts.inputs.discountCategory.label")}
                <sup className='text-danger'>*</sup>{" "}
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='form-select form-select-lg mb-3'
                aria-label='.form-select-lg example'>
                <option value='' selected disabled>
                  {t("ManageDiscounts.inputs.discountCategory.label2")}
                </option>
                <option value='mainMenu'>
                  {t("ManageDiscounts.inputs.discountCategory.options.one")}
                </option>
                <option value='customizeOrder'>
                  {t("ManageDiscounts.inputs.discountCategory.options.two")}
                </option>
                <option value='offers'>
                  {t("ManageDiscounts.inputs.discountCategory.options.three")}
                </option>
                <option value='totalOrder'>
                  {t("ManageDiscounts.inputs.discountCategory.options.four")}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* max and min price input */}
        <div className='row'>
          {/* Input field for entering the minimum price */}
          <div className='col-md-6'>
            <div className='mb-4 discount_minimum_price'>
              <label htmlFor='minPrice'>
                {/* {langData?.inputs?.maxPrice?.label} */}
                {t("ManageDiscounts.inputs.maxPrice.label")}
                <sup className='text-danger'>*</sup>
              </label>
              <input
                type='number'
                placeholder={t("ManageDiscounts.inputs.maxPrice.placeholder")}
                required
                className='rounded form-control'
                name='maxPrice'
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
          {/* Input field for entering the minimum price */}
          <div className='col-md-6'>
            <div className='mb-4 discount_minimum_price'>
              <label htmlFor='minPrice'>
                {t("ManageDiscounts.inputs.minPrice.label")}
                <sup className='text-danger'>*</sup>
              </label>
              <input
                type='number'
                placeholder={t("ManageDiscounts.inputs.minPrice.placeholder")}
                required
                className='rounded form-control'
                name='minPrice'
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Input field for entering the discount percentage */}
        <div className='col-12'>
          <div className='mb-4 discount_percentage'>
            <label htmlFor='percentage'>
              {t("ManageDiscounts.inputs.percentage.label")}
              <sup className='text-danger'>*</sup>{" "}
            </label>
            <input
              type='number'
              placeholder={t("ManageDiscounts.inputs.percentage.placeholder")}
              required
              className='rounded form-control'
              name='discountPercentage'
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
            />
          </div>
        </div>

        {/* Submit button for creating the new discount */}
        <div className='mb-4 create_discount_percentage d-flex justify-content-end'>
          <input type='submit' value={t("ManageDiscounts.inputs.buttonText")} />
        </div>
      </form>
    </div>
  );
}
