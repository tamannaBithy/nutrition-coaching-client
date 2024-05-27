"use client";

import moment from "moment";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetMyOrdersQuery } from "../../../../redux/features/queries/ORDER_API";
import MyOrdersModal from "./MyOrdersModal";

const MyOrdersMainTable = () => {
  const { locale } = useParams();

  const t = useTranslations("Dashboard");

  // Get the current year
  const currentYear = new Date().getFullYear();
  // First day of the year
  const firstDayOfYear = new Date(currentYear, 0, 1);
  const firstDayString = firstDayOfYear.toISOString().split("T")[0];

  // Last day of the year
  const lastDayOfYear = new Date(currentYear, 11, 31);
  const lastDayString = lastDayOfYear.toISOString().split("T")[0];

  const [orders_from, setOrdersForm] = useState(firstDayString);
  const [orders_end, setOrdersEnd] = useState(lastDayString);
  const [showPerPage, setShowPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectOrder] = useState("");
  const { data, isLoading, isError, isSuccess } = useGetMyOrdersQuery({
    showPerPage,
    pageNo: currentPage,
    orders_from,
    orders_end,
  });

  // Function to handle start date change
  const handleStartDateChange = (event) => {
    setOrdersForm(event.target.value);
  };

  // Function to handle end date change
  const handleEndDateChange = (event) => {
    setOrdersEnd(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGetInvoice = (orderData) => {
    setSelectOrder(orderData);
  };

  return (
    <div>
      <div className='d-flex flex-wrap align-content-center justify-content-between mb-4'>
        {/* Show per page */}
        <div className='show_per_page_section'>
          <p className='m-1'>
            <span>{t("MyOrders.showPerPage")} :</span>
          </p>
          {/* Select for how many data per page */}
          <select className='form-select' aria-label='Default select example'>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='50'>50</option>
          </select>
        </div>

        {/* Order date form */}
        <div className='show_per_page_section'>
          <p className='m-1'>
            <span> {t("MyOrders.ordersForm")} :</span>
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
            <span>{t("MyOrders.ordersEnd")} :</span>
          </p>
          <input
            type='date'
            value={orders_end}
            onChange={handleEndDateChange}
            className='form-control'
          />
        </div>
      </div>
      {/* table */}
      <div className='table-responsive'>
        <table className='table table-hover table-bordered'>
          {/* table head data */}
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>{t("MyOrders.table.tableHead.one")}</th>
              <th scope='col'> {t("MyOrders.table.tableHead.two")}</th>
              <th scope='col'> {t("MyOrders.table.tableHead.three")}</th>
              <th scope='col'> {t("MyOrders.table.tableHead.four")}</th>
              <th scope='col'> {t("MyOrders.table.tableHead.five")}</th>
            </tr>
          </thead>
          {/* table body data */}
          <>
            {data?.data?.length > 0 ? (
              <tbody>
                {data?.data?.map((orderData, index) => (
                  <tr key={index}>
                    <td scope='row'>{index + 1}</td>
                    <td
                      scope='row'
                      role='button'
                      className='text-primary table_id'
                      data-bs-toggle='modal'
                      data-bs-target='#staticBackdrop2'
                      onClick={() => handleGetInvoice(orderData)}>
                      {orderData?._id} <br />
                      <div>
                        {orderData?.order_details?.mainMealCart?.length > 0 && (
                          <span class='badge bg-danger'>Main Meals</span>
                        )}
                        {orderData?.order_details?.customizedMealCart?.length >
                          0 && (
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

                    {/* Payment status */}
                    <td scope='row'>
                      {String(
                        orderData?.paid_status === true
                          ? `${t("MyOrders.paymentStatus.one")}`
                          : `${t("MyOrders.paymentStatus.two")}`
                      )}
                    </td>
                    {/* Order status */}
                    {/* "pending", "confirm", "rejected" */}
                    <td scope='row'>
                      {orderData?.order_status === "pending" &&
                        `${t("MyOrders.orderStatus.one")}`}
                      {orderData?.order_status === "confirm" &&
                        `${t("MyOrders.orderStatus.two")}`}
                      {orderData?.order_status === "rejected" &&
                        `${t("MyOrders.orderStatus.three")}`}
                    </td>

                    {/* delivery status */}
                    <td scope='row'>
                      {orderData?.delivery_status === "pending" &&
                        `${t("MyOrders.deliveryStatus.one")}`}
                      {orderData?.delivery_status === "shipped" &&
                        `${t("MyOrders.deliveryStatus.two")}`}
                      {orderData?.delivery_status === "delivered" &&
                        `${t("MyOrders.deliveryStatus.three")}`}
                    </td>
                    <td scope='row'>
                      {moment(orderData?.order_placed_at).format(
                        "'MMMM Do YYYY, h:mm:ss a'"
                      )}
                    </td>
                  </tr>
                ))}

                {/* My order invoice modal */}
                <MyOrdersModal orderData={selectedOrder} />
              </tbody>
            ) : (
              <div
                className={`text-center  my-5 ${
                  locale === "ar" ? "notFound_meals_arabic " : "notFound_meals"
                }`}>
                <h4 className='text-dark '>{t("MyOrders.notFound")}</h4>
              </div>
            )}
          </>
        </table>
        {/* showing data count and pagination */}
        {!isLoading && data?.data?.length > 0 && (
          <div className='my-5 w-100 d-flex  align-content-center justify-content-between'>
            {/* Showing 0 - 0 out of 0 items */}
            <div>
              {locale === "ar" ? (
                // Arabic
                <figcaption className='blockquote-footer m-0'>
                  <b>{data?.showingArabic}</b>
                </figcaption>
              ) : (
                // English
                <figcaption className='blockquote-footer m-0'>
                  {data?.showingEnglish}
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
                      {t("MyOrders.prevBtn")}
                    </a>
                  </li>
                  {data?.totalPages?.map((page) => (
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
                      currentPage === data?.totalPages?.length ? "disabled" : ""
                    }`}>
                    <a
                      className='page-link'
                      href='#'
                      onClick={() => handlePageChange(currentPage + 1)}>
                      {t("MyOrders.nextBtn")}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MyOrdersMainTable), {
  ssr: false,
});
