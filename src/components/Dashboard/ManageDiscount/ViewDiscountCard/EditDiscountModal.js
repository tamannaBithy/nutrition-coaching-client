"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUpdateDiscountForOrderByIdMutation } from "../../../../../redux/features/queries/DISCOUNT_API";

export default function EditDiscountModal({ discountId, rangeData }) {
  const t = useTranslations("Dashboard");
  const [updateDiscountForOrderById, { isSuccess }] =
    useUpdateDiscountForOrderByIdMutation();
  const { locale } = useParams();
  // State variables for form inputs
  const [discountStatus, setDiscountStatus] = useState(""); // Discount Active Status
  const [maxPrice, setMaxPrice] = useState(""); // Max Price
  const [minPrice, setMinPrice] = useState(""); // Min Price
  const [discountPercentage, setDiscountPercentage] = useState(""); // Discount Percentage

  useEffect(() => {
    setDiscountStatus(rangeData?.isActive);
    setMaxPrice(rangeData?.max);
    setMinPrice(rangeData?.min);
    setDiscountPercentage(rangeData?.percentage);
  }, [rangeData]);

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
      min: parsedMinPrice,
      max: parsedMaxPrice,
      percentage: parsedDiscountPercentage,
      isActive: discountStatus === "true",
    };

    const { data } = await updateDiscountForOrderById({
      discountId,
      rangeId: rangeData?._id,
      data: formData,
    });

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
  };
  return (
    <div
      className='modal editPreferenceMeal fade'
      id='staticBackdrop8'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'>
      <div className='modal-dialog d-flex h-100 align-items-center '>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='staticBackdropLabel'>
              {t("ManageDiscounts.modal.title")}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <div className='py-3'>
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
                        aria-label='.form-select-lg example'>
                        <option value='true'>
                          {" "}
                          {t("ManageDiscounts.inputs.discountStatus.active")}
                        </option>
                        <option value='false'>
                          {" "}
                          {t("ManageDiscounts.inputs.discountStatus.inactive")}
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
                        {t("ManageDiscounts.inputs.maxPrice.label")}
                        <sup className='text-danger'>*</sup>
                      </label>
                      <input
                        type='number'
                        placeholder={t(
                          "ManageDiscounts.inputs.maxPrice.placeholder"
                        )}
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
                        placeholder={t(
                          "ManageDiscounts.inputs.minPrice.placeholder"
                        )}
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
                      placeholder={t(
                        "ManageDiscounts.inputs.percentage.placeholder"
                      )}
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
                  <input
                    type='submit'
                    value={t("ManageDiscounts.buttonUpdateText")}
                    data-bs-dismiss='modal'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
