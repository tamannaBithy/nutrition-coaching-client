"use client";

import DashboardLoading from "@/app/[locale]/(Admin-Pages)/admin/dashboard/loading";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";
import {
  useDeleteDiscountForOrderByIdMutation,
  useGetAllDiscountsForOrderQuery,
} from "../../../../../redux/features/queries/DISCOUNT_API";
import EditDiscountModal from "./EditDiscountModal";
import "./ViewDiscountCard.css";

/**
 * Component for displaying and managing discounts.
 * @component
 * @returns {JSX.Element} The rendered ViewDiscountCard component.
 */
export default function ViewDiscountCard() {
  const t = useTranslations("Dashboard");
  const { locale } = useParams();
  const [category, setCategory] = useState("mainMenu"); // Discount category
  const [selectedDiscountId, setSelectedDiscountId] = useState(null); // State variable for selected discount id
  const [selectedRangeData, setSelectedRangeData] = useState(null); // State variable for selected range data
  const {
    data: discountData,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllDiscountsForOrderQuery(category);

  const [deleteDiscountForOrderById] = useDeleteDiscountForOrderByIdMutation();

  // Function to handle the "Edit" button click for a discount
  const handleDiscountEdit = (discountId, rangeData) => {
    setSelectedDiscountId(discountId);
    setSelectedRangeData(rangeData);
  };

  // Function to handle the "Delete" button click for a discount
  const handleDiscountDelete = async (discountId, rangeId) => {
    Swal.fire({
      title: t("ManageDiscounts.swal.title"),
      text: t("ManageDiscounts.swal.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: t("ManageDiscounts.swal.confirmButtonText"),
      cancelButtonText: t("ManageDiscounts.swal.cancelButtonText"),
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      // Call your delete running weekly meal function here
      const { data } = await deleteDiscountForOrderById({
        discountId,
        rangeId,
      });

      if (data?.status) {
        Swal.fire({
          title: "Removed!",
          text: data?.message[locale],
          icon: "success",
        });
      } else {
        Swal.fire({
          title: t("ManageDiscounts.swal.removed"),
          text: data?.message[locale],
          icon: "success",
        });
      }
    });
  };

  // Fetch data for mainMenu category when component mounts
  useEffect(() => {
    refetch({ category: "mainMenu" });
  }, []);

  // decide what to render
  let content = null;
  if (isLoading)
    content = (
      <>
        <DashboardLoading />
      </>
    );

  if (!isLoading && isSuccess) {
    content = (
      <>
        {discountData?.data?.map((discountItem, i) => {
          return (
            <Fragment key={i}>
              {discountItem?.ranges?.map((range, j) => (
                <div key={j} className='col-lg-6 col-md-6 col-sm-12'>
                  <div className='discount_card my-md-3 my-sm-3 my-2 d-flex justify-content-center align-items-center flex-column'>
                    {/* Display the discount percentage */}
                    <div className='discount_percentage_number'>
                      <h6>
                        {t("ManageDiscounts.card.percentageAmount")}:{" "}
                        {range.percentage}%
                      </h6>
                    </div>
                    {/* Display the minimum Price */}
                    <div className='discount_minimum_price'>
                      <h6>
                        {t("ManageDiscounts.card.minimumPrice")}: {range.min}
                      </h6>
                    </div>
                    <div className='discount_minimum_price'>
                      <h6>
                        {" "}
                        {t("ManageDiscounts.card.maximumPrice")}: {range.max}
                      </h6>
                    </div>
                    <div className='discount_minimum_price'>
                      <h6>
                        {" "}
                        {t("ManageDiscounts.card.activeStatus")}:{" "}
                        {range.isActive == true ? "Active" : "Inactive"}
                      </h6>
                    </div>
                    {/* Dropdown menu for the discount settings */}
                    <div className='discount_settings dropstart'>
                      <button
                        className='dropdown-toggle'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'>
                        <BsThreeDots />
                      </button>
                      {/* Dropdown menu items for editing and deleting the discount */}
                      <ul className='dropdown-menu'>
                        <li className='px-2'>
                          <button
                            type='button'
                            className='discount_edit_btn'
                            data-bs-toggle='modal'
                            data-bs-target='#staticBackdrop8'
                            onClick={() =>
                              handleDiscountEdit(discountItem?._id, range)
                            }>
                            {t("ManageDiscounts.card.buttonsGroup.editButton")}
                          </button>
                        </li>
                        <li className='px-2'>
                          <button
                            className='discount_delete_btn'
                            onClick={() =>
                              handleDiscountDelete(
                                discountItem?._id,
                                range?._id
                              )
                            }>
                            {t(
                              "ManageDiscounts.card.buttonsGroup.deleteButton"
                            )}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </Fragment>
          );
        })}
      </>
    );
  }

  return (
    // Row containing individual columns for each discount card
    <div className='row'>
      {/* Select category*/}
      <div className='col-md-12'>
        <div className='mb-4 discount_percentage'>
          <label className='mb-1' htmlFor='percentage'>
            {t("ManageDiscounts.inputs.selectCategory.label")}
            <sup className='text-danger'>*</sup>{" "}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='form-select form-select-lg mb-3'
            aria-label='.form-select-lg example'>
            <option value='mainMenu'>
              {" "}
              {t("ManageDiscounts.inputs.discountCategory.options.one")}
            </option>
            <option value='customizeOrder'>
              {" "}
              {t("ManageDiscounts.inputs.discountCategory.options.two")}
            </option>
            <option value='offers'>
              {" "}
              {t("ManageDiscounts.inputs.discountCategory.options.three")}
            </option>
            <option value='totalOrder'>
              {" "}
              {t("ManageDiscounts.inputs.discountCategory.options.four")}
            </option>
          </select>
        </div>
      </div>
      {/* Individual columns for each discount card */}
      {content}
      <EditDiscountModal
        discountId={selectedDiscountId}
        rangeData={selectedRangeData}
      />
    </div>
  );
}
