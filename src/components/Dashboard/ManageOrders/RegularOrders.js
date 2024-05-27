"use client";

import useSocket from "@/hooks/socket.io/UseSocket";
import moment from "moment";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import {
  useGetAllOrdersForAdminQuery,
  useUpdateDeliveryStatusByAdminMutation,
  useUpdateOrderStatusByAdminMutation,
  useUpdatePaymentStatusByAdminMutation,
} from "../../../../redux/features/queries/ORDER_API";
import ManageOrderModal from "./ManageOrderModal";

const RegularOrders = () => {
  const t = useTranslations("Dashboard");

  const { locale } = useParams();

  // Define the callback function to handle "orderPlacedAdmin" event
  const handleOrderPlacedAdmin = (data) => {
    console.log("Received data from server:", data);
    // Update the state or perform any other actions based on the received data
  };

  // Use the custom hook to listen for "orderPlacedAdmin" event
  useSocket("orderPlacedAdmin", handleOrderPlacedAdmin);

  // Get the current year
  const currentYear = new Date().getFullYear();
  // First day of the year
  const firstDayOfYear = new Date(currentYear, 0, 1);
  const firstDayString = firstDayOfYear.toISOString().split("T")[0];

  // Last day of the year
  const lastDayOfYear = new Date(currentYear, 11, 31);
  const lastDayString = lastDayOfYear.toISOString().split("T")[0];

  // State to store the fetched language
  const [language, setLanguage] = useState(null);
  const [showPerPage, setShowPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders_from, setOrdersForm] = useState(firstDayString);
  const [orders_end, setOrdersEnd] = useState(lastDayString);
  const [selectedOrderInvoiceData, setSelectedOrderInvoiceData] = useState("");
  // State variables to store editable values
  const [editableValues, setEdiPaymentDeliverOrderValues] = useState({});

  //get all orders API
  const {
    data: OrdersData,
    isLoading,
    isError,
    refetch,
  } = useGetAllOrdersForAdminQuery({
    showPerPage,
    pageNo: currentPage,
    orders_from,
    orders_end,
  });

  // Mutation to update order status by admin
  const [updateOrderStatusByAdmin] = useUpdateOrderStatusByAdminMutation();

  // Mutation to update delivery status by admin
  const [updateDeliveryStatusByAdmin] =
    useUpdateDeliveryStatusByAdminMutation();

  // Mutation to update payment status by admin
  const [updatePaymentStatusByAdmin] = useUpdatePaymentStatusByAdminMutation();

  // const langData = language?.adminDashboard?.manageOrders;

  // Function to handle start date change
  const handleStartDateChange = (event) => {
    setOrdersForm(event.target.value);
  };

  // Function to handle end date change
  const handleEndDateChange = (event) => {
    setOrdersEnd(event.target.value);
  };

  // Function to handle manual refetch
  const handleManualRefetch = () => {
    refetch();
  };

  // Function to handle changes in payment status
  const handlePaymentStatusChange = async (orderId, newValue) => {
    try {
      Swal.fire({
        title: t("ManageOrders.alertMsg.PaymentStatusChange.title"),
        text: t("ManageOrders.alertMsg.PaymentStatusChange.text"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8dc143",
        cancelButtonColor: "#d33",
        confirmButtonText: t(
          "ManageOrders.alertMsg.PaymentStatusChange.confirmButtonText"
        ),
        cancelButtonText: t(
          "ManageOrders.alertMsg.PaymentStatusChange.cancelButtonText"
        ),
      }).then(async (result) => {
        if (!result.isConfirmed) return;

        // TODO Call the API to update payment status
        const { data } = await updatePaymentStatusByAdmin({
          orderId,
          data: { newStatus: Boolean(newValue) },
        });

        // Show error message
        if (data?.status) {
          Swal.fire({
            title: t("ManageOrders.alertMsg.PaymentStatusChange.result.one"),
            text: data?.message[locale],
            icon: "success",
          });
        } else {
          Swal.fire({
            title: t("ManageOrders.alertMsg.PaymentStatusChange.result.two"),
            text: data?.message[locale],
            icon: "error",
          });
        }
      });

      // Update the local state to reflect the change immediately
      setEdiPaymentDeliverOrderValues((prevValues) => ({
        ...prevValues,
        [orderId]: {
          ...prevValues[orderId],
          newStatus: newValue,
        },
      }));
    } catch (error) {
      // Handle errors from API call
      console.error("Error updating payment status:", error);
    }
  };

  // Function to handle changes in order status
  const handleOrderStatusChange = async (orderId, newValue) => {
    // Store the current selected value temporarily
    const previousValue = editableValues[orderId]?.oderStatus || newValue;
    try {
      // Call the API to update order status
      const { data } = await updateOrderStatusByAdmin({
        orderId,
        data: { newStatus: newValue },
      });

      // Show error message
      if (data?.status) {
        Swal.fire({
          title: t(
            "ManageOrders.alertMsg.PaymentStatusChange.OrderStatusChange.title"
          ),
          text: data?.message[locale],
          icon: "success",
        });
      } else {
        throw new Error(data?.message[locale]); // Throw an error if the status is not successful
      }

      // Update the local state to reflect the change immediately
      setEdiPaymentDeliverOrderValues((prevValues) => ({
        ...prevValues,
        [orderId]: {
          ...prevValues[orderId],
          oderStatus: newValue,
        },
      }));
      // console.log(data);
    } catch (error) {
      // Handle errors from API call
      Swal.fire({
        title: "Oops!",
        text: error.message || "Failed to update order status",
        icon: "error",
      });

      // Revert the select field value to its original state only if the status is false
      setEdiPaymentDeliverOrderValues((prevValues) => ({
        ...prevValues,
        [orderId]: {
          ...prevValues[orderId],
          oderStatus: previousValue,
        },
      }));
    }
  };

  // Function to handle changes in delivery status
  const handleDeliveryStatusChange = async (orderId, newValue) => {
    // Store the current selected value temporarily
    const previousValue = editableValues[orderId]?.newStatus || newValue;

    try {
      // Call the API to update delivery status
      const { data } = await updateDeliveryStatusByAdmin({
        orderId,
        data: { newStatus: newValue },
      });

      // Show success or error message
      if (data?.status) {
        Swal.fire({
          title: t("ManageOrders.alertMsg.DeliveryStatusChange.titleOne"),

          text: data?.message[locale],
          icon: "success",
        });
      } else {
        throw new Error(data?.message[locale]); // Throw an error if the status is not successful
      }

      // Update the local state to reflect the change immediately
      setEdiPaymentDeliverOrderValues((prevValues) => ({
        ...prevValues,
        [orderId]: {
          ...prevValues[orderId],
          newStatus: newValue,
        },
      }));
    } catch (error) {
      // Handle errors from API call
      Swal.fire({
        title: t("ManageOrders.alertMsg.DeliveryStatusChange.titleTwo"),

        text: error.message || "Failed to update delivery status",
        icon: "error",
      });

      // Revert the select field value to its original state only if the status is false

      setEdiPaymentDeliverOrderValues((prevValues) => ({
        ...prevValues,
        [orderId]: {
          ...prevValues[orderId],
          newStatus: previousValue,
        },
      }));
    }
  };

  // Function to handle order invoice
  const handleManageOrderInvoice = (orderData) => {
    setSelectedOrderInvoiceData(orderData);
  };

  // Event handlers
  const handleShowPerPageChange = (e) => {
    setShowPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className='pt-4'>
        <div className='d-flex flex-wrap flex-column flex-sm-row row-gap-2 row-gap-md-0 align-content-center justify-content-between mb-4'>
          {/* Show per page */}
          <div className='show_per_page_section'>
            <p className='m-1'>
              <span>{t("ManageOrders.showPerPage.title")} :</span>
            </p>
            {/* Select for how many data per page */}
            <select
              className='form-select'
              onChange={handleShowPerPageChange}
              value={showPerPage}
              aria-label='Default select example'>
              <option value={20}>
                {t("ManageOrders.showPerPage.options.perPageOne")}
              </option>
              <option value={30}>
                {t("ManageOrders.showPerPage.options.perPageTwo")}
              </option>
              <option value={50}>
                {t("ManageOrders.showPerPage.options.perPageThree")}
              </option>
              <option value={100}>
                {t("ManageOrders.showPerPage.options.perPageFour")}
              </option>
            </select>
          </div>

          {/* Order date form */}
          <div className='show_per_page_section'>
            <p className='m-1'>
              <span>{t("ManageOrders.ordersDate.from.title")} :</span>
            </p>
            <input
              type='date'
              value={orders_from}
              onChange={handleStartDateChange}
              className='form-control'
            />
          </div>

          {/* Order date end */}
          <div className='show_per_page_section'>
            <p className='m-1'>
              <span>{t("ManageOrders.ordersDate.to.title")} :</span>
            </p>
            <input
              type='date'
              value={orders_end}
              onChange={handleEndDateChange}
              className='form-control'
            />
          </div>

          {/* Global search */}
          <div className='search_area_section'>
            <p className='m-1'>{t("ManageOrders.search.title")} :</p>
            {/* Search filed to find the user data  */}
            <form className='form-inline d-flex align-items-center'>
              <input
                className='form-control'
                type='search'
                placeholder={t("ManageOrders.search.placeholder")}
                aria-label='Search'
              />
              <div className='ms-2'>
                <button className='search_btn' type='submit'>
                  <b>{t("ManageOrders.search.title")}</b>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* table */}
        <div className='table-responsive'>
          {/* <div className='w-100 text-end my-2'>
            <button className='refetch_btn' onClick={handleManualRefetch}>
              Refresh
            </button>
          </div> */}
          <table className='table table-hover table-bordered'>
            {/* table head data */}
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>{t("ManageOrders.tableHead.labelOne")}</th>
                <th scope='col'>{t("ManageOrders.tableHead.labelTwo")}</th>
                <th scope='col'>{t("ManageOrders.tableHead.labelThree")}</th>
                <th scope='col'>{t("ManageOrders.tableHead.labelFour")}</th>
                <th scope='col'>{t("ManageOrders.tableHead.labelFive")}</th>
                <th scope='col'>{t("ManageOrders.tableHead.labelSix")}</th>
                <th scope='col'>{t("ManageOrders.tableHead.labelSeven")}</th>
                <th scope='col'>{t("ManageOrders.tableHead.labelEight")}</th>
                <th scope='col'>{t("ManageOrders.tableHead.labelNine")}</th>
              </tr>
            </thead>
            {/* table body data */}
            {OrdersData?.data?.length > 0 ? (
              <tbody>
                {OrdersData?.data?.map((orderData) => (
                  <Fragment key={orderData?._id}>
                    <tr>
                      <td scope='row'>1</td>
                      <td
                        onClick={() => handleManageOrderInvoice(orderData)}
                        scope='row'
                        role='button'
                        data-bs-toggle='modal'
                        data-bs-target='#staticBackdrop5'
                        className='text-primary table_id'>
                        {orderData?._id} <br />
                        <div>
                          {orderData?.order_details?.mainMealCart?.length >
                            0 && (
                            <span class='badge bg-danger'>Main Meals</span>
                          )}
                          {orderData?.order_details?.customizedMealCart
                            ?.length > 0 && (
                            <span class='badge bg-info text-dark mx-2'>
                              Customized Meals
                            </span>
                          )}
                          {orderData?.order_details?.offeredMealCart?.length >
                            0 && (
                            <span class='badge bg-primary'>Offered Meals</span>
                          )}
                        </div>
                      </td>
                      <td scope='row'>{orderData?.customer_details?.name}</td>
                      <td scope='row'>{orderData?.customer_details?.email}</td>
                      <td scope='row'>{orderData?.delivery_address}</td>

                      {/* Payment status */}
                      <td scope='row'>
                        <div class='form-check form-switch'>
                          <input
                            class='form-check-input'
                            type='checkbox'
                            id='flexSwitchCheckChecked'
                            checked={orderData?.paid_status}
                            onChange={(e) =>
                              handlePaymentStatusChange(
                                orderData._id,
                                e.target.checked
                              )
                            }
                            disabled={orderData?.paid_status}
                          />
                        </div>
                      </td>
                      {/* Order status */}
                      <td scope='row'>
                        <select
                          value={
                            editableValues[orderData._id]?.oderStatus ||
                            orderData?.order_status
                          }
                          onChange={(e) =>
                            handleOrderStatusChange(
                              orderData._id,
                              e.target.value
                            )
                          }
                          className='form-select'
                          aria-label='Default select example'>
                          <option value='pending'>
                            {t("ManageOrders.order_status.one")}
                          </option>
                          <option value='confirm'>
                            {t("ManageOrders.order_status.two")}
                          </option>
                          <option value='rejected'>
                            {t("ManageOrders.order_status.three")}
                          </option>
                        </select>
                      </td>

                      {/* delivery status */}
                      <td scope='row'>
                        <select
                          className='form-select'
                          aria-label='Default select example'
                          value={
                            editableValues[orderData._id]?.deliveryStatus ||
                            orderData?.delivery_status
                          }
                          onChange={(e) =>
                            handleDeliveryStatusChange(
                              orderData._id,
                              e.target.value
                            )
                          }>
                          <option value='pending'>
                            {t("ManageOrders.delivery_status.one")}
                          </option>
                          <option value='shipped'>
                            {t("ManageOrders.delivery_status.two")}
                          </option>
                          <option value='delivered'>
                            {t("ManageOrders.delivery_status.three")}
                          </option>
                        </select>
                      </td>
                      <td scope='row'>{orderData?.payment_method}</td>
                      <td scope='row'>
                        {moment(orderData?.order_placed_at).format(
                          "'MMMM Do YYYY, h:mm:ss a'"
                        )}
                      </td>
                    </tr>
                  </Fragment>
                ))}

                {/* Manage Order Modal */}
                <ManageOrderModal orderData={selectedOrderInvoiceData} />
              </tbody>
            ) : (
              <div className='text-center w-100'>
                <h3> {t("ManageOrders.notFound")}</h3>
              </div>
            )}
          </table>
        </div>

        {/* Loader */}
        {/* <div className='d-flex align-items-center justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div> */}

        {/* showing data count and pagination */}
        {/* showing data count and pagination */}
        {!isLoading && OrdersData?.data?.length > 0 && (
          <div className='my-5 w-100 d-flex  align-content-center justify-content-between'>
            {/* Showing 0 - 0 out of 0 items */}
            <div>
              {locale === "ar" ? (
                // Arabic
                <figcaption className='blockquote-footer m-0'>
                  <b>{OrdersData?.showingArabic}</b>
                </figcaption>
              ) : (
                // English
                <figcaption className='blockquote-footer m-0'>
                  {OrdersData?.showingEnglish}
                </figcaption>
              )}
            </div>

            {/* pagination */}
            <div>
              <nav aria-label='Page navigation example'>
                <ul className='pagination'>
                  {/* Previous page button */}
                  <li
                    className={`page-item prev_btn ${
                      currentPage === 1 ? "disabled" : ""
                    }`}>
                    <a
                      className='page-link'
                      href='#'
                      onClick={() => handlePageChange(currentPage - 1)}
                      tabIndex='-1'
                      aria-disabled='true'>
                      {t("ManageOrders.pagination.prev")}
                    </a>
                  </li>
                  {OrdersData?.totalPages?.map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}>
                      <a
                        className='page-link'
                        href='#'
                        onClick={() => handlePageChange(page)}>
                        {page}
                      </a>
                    </li>
                  ))}

                  {/* Next page button */}
                  <li
                    className={`page-item next_btn ${
                      currentPage === OrdersData?.totalPages?.length
                        ? "disabled"
                        : ""
                    }`}>
                    <a
                      className='page-link'
                      href='#'
                      onClick={() => handlePageChange(currentPage + 1)}>
                      {t("ManageOrders.pagination.next")}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(RegularOrders), {
  ssr: false,
});
