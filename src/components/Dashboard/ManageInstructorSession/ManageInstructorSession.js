"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useGetAllSessionsQuery,
  useUpdateSessionByIdMutation,
} from "../../../../redux/features/queries/BOOK_SESSION_API";
function ManageInstructorSession() {
  const { locale } = useParams();
  const t = useTranslations("Dashboard");
  const { data } = useGetAllSessionsQuery();
  const [updateSessionById] = useUpdateSessionByIdMutation();
  // State variable for status
  const [instructorStatus, setInstructorStatus] = useState({});

  // Function to handle changes in 'Status' select input
  const handleStatusChange = async (e, instructorId) => {
    const status = e.target.value;
    setInstructorStatus((prevStatus) => ({
      ...prevStatus,
      [instructorId]: status,
    }));
    // Call the mutation function to update session status for the specific instructor
    // const statusPayload = { instructorId, status: newStatus };
    const { data: updatedData } = await updateSessionById({
      id: instructorId,
      data: { status },
    });
    if (updatedData?.status) {
      Swal.fire({
        icon: "success",
        title: updatedData?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: updatedData?.message[locale],
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  // Initialize instructorStatus when data changes
  useEffect(() => {
    if (data && data?.data) {
      const initialStatus = data?.data.reduce((acc, instructor) => {
        acc[instructor._id] = instructor.status || "pending";
        return acc;
      }, {});
      setInstructorStatus(initialStatus);
    }
  }, [data]);

  return (
    <>
      <div className='customized-meal-form-main'>
        <div className='container'>
          <div className='title d-flex justify-content-between align-items-center'>
            <h2>{t("ManageSession.title")}</h2>
          </div>
          <div className='pt-4'>
            <div className='d-flex flex-wrap flex-column flex-sm-row row-gap-2 row-gap-md-0 align-content-center justify-content-between mb-4'>
              {/* Show per page */}
              <div className='show_per_page_section'>
                <p className='m-1'>
                  <span>{t("ManageSession.showPerPage.title")} :</span>
                </p>
                {/* Select for how many data per page */}
                <select
                  className='form-select'
                  aria-label='Default select example'>
                  <option value={10}>
                    {t("ManageSession.showPerPage.options.perPageOne")}
                  </option>
                  <option value={20}>
                    {t("ManageSession.showPerPage.options.perPageTwo")}
                  </option>
                  <option value={30}>
                    {t("ManageSession.showPerPage.options.perPageThree")}
                  </option>
                  <option value={40}>
                    {t("ManageSession.showPerPage.options.perPageFour")}
                  </option>
                </select>
              </div>

              <div className='show_per_page_section'>
                <p className='m-1'> {t("ManageSession.languagePreference")}</p>
                {/* Select for how many data per page */}
                <select
                  className='form-select'
                  aria-label='Default select example'>
                  <option value='ar'>العربية</option>
                  <option value='en'>English</option>
                </select>
              </div>

              {/* Global search */}
              <div className='search_area_section'>
                <p className='m-1'>{t("ManageSession.search.title")} : </p>
                {/* Search filed to find the user data  */}
                <form className='form-inline d-flex align-items-center'>
                  <input
                    className='form-control'
                    type='search'
                    placeholder={t("ManageSession.search.placeholder")}
                    aria-label='Search'
                  />
                  <div className='ms-2'>
                    <button className='search_btn' type='submit'>
                      <b> {t("ManageSession.search.title")} </b>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* table */}
            <div className='table-responsive'>
              <table className='table table-hover table-bordered'>
                {/* table head data */}
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>{t("ManageSession.tableHead.labelOne")}</th>
                    <th scope='col'>{t("ManageSession.tableHead.labelTwo")}</th>
                    <th scope='col'>
                      {t("ManageSession.tableHead.labelThree")}
                    </th>
                  </tr>
                </thead>

                <>
                  {data?.data?.length > 0 ? (
                    <tbody>
                      {data?.data?.map((instructor, i) => (
                        <tr key={i}>
                          <th scope='row' style={{ width: "80px" }}>
                            {i + 1}
                          </th>

                          <th scope='row' style={{ width: "200px" }}>
                            {instructor?.instructorDetails?.name}
                          </th>
                          <td scope='row' style={{ width: "350px" }}>
                            {instructor?.note_for_instructor}
                          </td>
                          <td scope='row' style={{ width: "200px" }}>
                            <select
                              className='form-select'
                              aria-label='Default select example'
                              value={
                                instructorStatus[instructor?._id] || "pending"
                              }
                              onChange={(e) =>
                                handleStatusChange(e, instructor?._id)
                              }>
                              <option value='pending'>Pending</option>
                              <option value='booked'>Booked</option>
                              <option value='rejected'>Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <div
                      className={`text-center  my-5 ${
                        locale === "ar"
                          ? "notFound_meals_arabic "
                          : "notFound_meals"
                      }`}>
                      <h4 className='text-dark '>
                        {t("ManageSession.notFound")}
                      </h4>
                    </div>
                  )}
                </>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(ManageInstructorSession), {
  ssr: false,
});
