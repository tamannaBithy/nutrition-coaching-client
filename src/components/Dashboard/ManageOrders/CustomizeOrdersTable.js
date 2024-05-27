"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  useDeleteUserInputMealMutation,
  useGetAllUserMealsInputQuery,
} from "../../../../redux/features/queries/ADMIN_CUSTOMIZED_MEAL_API";
import OrderRequestModal from "./OrderRequestModal";
function CustomizeOrdersTable() {
  const t = useTranslations("Dashboard");
  const { locale: lang } = useParams();
  const [selectedData, setSelectedData] = useState("");
  const [showPerPage, setShowPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllUserMealsInputQuery({
    showPerPage,
    pageNo: currentPage,
  });
  const [deleteUserInputMeal, { data: deleteUserInputMealData }] =
    useDeleteUserInputMealMutation();
  // Event handlers
  const handleShowPerPageChange = (e) => {
    setShowPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectData = (meals) => {
    setSelectedData(meals);
  };

  //handle delete customized meal
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: t(
        "ManageCustomizedMeals.AllCustomizedMeals.inputs.deleteAlertMsg.title"
      ),
      text: t(
        "ManageCustomizedMeals.AllCustomizedMeals.inputs.deleteAlertMsg.text"
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: t(
        "ManageCustomizedMeals.AllCustomizedMeals.inputs.deleteAlertMsg.confirmButtonText"
      ),
      cancelButtonText: t(
        "ManageCustomizedMeals.AllCustomizedMeals.inputs.deleteAlertMsg.cancelButtonText"
      ),
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Removed!",
        text: deleteUserInputMealData?.message[lang],
        icon: "success",
      });

      // Call your delete customized meal function here
      deleteUserInputMeal(id);
    });
  };
  return (
    <div className='customized-meal-form-main'>
      <div className='title d-flex justify-content-between align-items-center'>
        <h2>{t("ManageCustomizedMeals.CustomizedMealsRequest.title")}</h2>
      </div>
      <div className='d-flex flex-wrap flex-column flex-sm-row row-gap-2 row-gap-md-0 align-content-center justify-content-between mb-4'>
        {/* Show per page */}
        <div className='show_per_page_section'>
          <p className='m-1'>
            <span>
              {t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.showPerPage.title"
              )}
              :
            </span>
          </p>
          {/* Select for how many data per page */}
          <select
            onChange={handleShowPerPageChange}
            className='form-select'
            aria-label='Default select example'>
            <option value={20}>
              {t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.showPerPage.options.perPageOne"
              )}
            </option>
            <option value={30}>
              {t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.showPerPage.options.perPageTwo"
              )}
            </option>
            <option value={50}>
              {t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.showPerPage.options.perPageThree"
              )}
            </option>
            <option value={100}>
              {t(
                "ManageCustomizedMeals.AllCustomizedMeals.inputs.showPerPage.options.perPageFour"
              )}
            </option>
          </select>
        </div>
      </div>

      {/* table */}
      <div className='table-responsive'>
        <table className='table table-hover table-bordered'>
          {/* table head data */}
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>
                {t(
                  "ManageCustomizedMeals.CustomizedMealsRequest.tableHead.labelOne"
                )}
              </th>
              <th scope='col'>
                {t(
                  "ManageCustomizedMeals.CustomizedMealsRequest.tableHead.labelTwo"
                )}
              </th>
              <th scope='col'>
                {t(
                  "ManageCustomizedMeals.CustomizedMealsRequest.tableHead.labelThree"
                )}
              </th>
              <th scope='col'>
                {t(
                  "ManageCustomizedMeals.CustomizedMealsRequest.tableHead.labelFour"
                )}
              </th>
              <th scope='col'>
                {t(
                  "ManageCustomizedMeals.CustomizedMealsRequest.tableHead.labelFive"
                )}
              </th>
              <th scope='col'>
                {t(
                  "ManageCustomizedMeals.CustomizedMealsRequest.tableHead.labelSix"
                )}
              </th>
              <th scope='col'>
                {t(
                  "ManageCustomizedMeals.CustomizedMealsRequest.tableHead.labelSeven"
                )}
              </th>
            </tr>
          </thead>

          <>
            {data?.data?.length > 0 ? (
              <tbody>
                {data?.data?.map((meal, i) => (
                  <tr key={i}>
                    <th scope='row'>{i + 1}</th>
                    <th
                      scope='row'
                      className='text-primary table_id'
                      data-bs-toggle='modal'
                      data-bs-target='#staticBackdrop4'
                      onClick={() => handleSelectData(meal)}>
                      {meal?._id}
                    </th>
                    <th scope='row'>{meal?.customer_data?.name}</th>
                    <td scope='row'>{meal?.customer_data?.phone}</td>
                    <td scope='row'>{meal?.customer_data?.email}</td>
                    <td scope='row'>{meal?.mealPerDay}</td>
                    <td scope='row'>{meal?.meal_duration_repeat}</td>
                    <th scope='row'>
                      <div className='text-start'>
                        <button
                          onClick={() => handleDelete(meal._id)}
                          type='button'
                          data-toggle='tooltip'
                          data-placement='right'
                          title='Delete'
                          className='delete_btn'>
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </th>
                  </tr>
                ))}

                <OrderRequestModal mealData={selectedData} />
              </tbody>
            ) : (
              <div className='text-center  my-5 notFound_meals'>
                <h4 className='text-dark '>
                  {t("ManageCustomizedMeals.AllCustomizedMeals.notFound")}
                </h4>
              </div>
            )}
          </>
        </table>
      </div>

      {/* showing data count and pagination */}
      {!isLoading && data?.data?.length > 0 && (
        <div className='my-5 w-100 d-flex  align-content-center justify-content-between'>
          {/* Showing 0 - 0 out of 0 items */}
          <div>
            {lang === "ar" ? (
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
                    {t(
                      "ManageCustomizedMeals.AllCustomizedMeals.inputs.pagination.prev"
                    )}
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
                    {t(
                      "ManageCustomizedMeals.AllCustomizedMeals.inputs.pagination.next"
                    )}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(CustomizeOrdersTable), {
  ssr: false,
});
