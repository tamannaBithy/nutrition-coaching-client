"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetAllInstructorsQuery } from "../../../../redux/features/queries/INSTRUCTOR_API";
import BookAppointmentModal from "./BookAppointmentModal";
import "./ChooseAppointment.css";

export default function ChooseAppointment() {
  const t = useTranslations("NutritionCoaching");

  const translatedStrings = {
    sessionBookingTitle: t("sessionBooking.title"),
    sessionBookingNote: t("sessionBooking.note"),
    sessionBookingPlaceholder: t("sessionBooking.placeholder"),
    btn: t("sessionBooking.btn"),
  };

  const [showPerPage, setShowPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [selectedInstructor, setSelectedInstructor] = useState("");

  const { locale } = useParams();

  // Fetch real data using the generated query
  const {
    data: instructorsData,
    error,
    isLoading,
  } = useGetAllInstructorsQuery({ showPerPage, pageNo, lang: locale });

  const handleBookNow = (instructor) => {
    // Add your logic here to handle the booking using the coachId
    setSelectedInstructor(instructor);
    // Add any additional logic or redirect to a booking page if needed
  };

  const handleCloseModal = () => {
    setSelectedInstructor(null);
  };

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    setPageNo(newPage);
  };

  return (
    <>
      <BookAppointmentModal
        translatedStrings={translatedStrings}
        instructor={selectedInstructor}
        onClose={handleCloseModal}
      />
      <div className="choose_appointment_section">
        <div className="appointment_title_section">
          <span>1</span>
          <h4>{t("title1")}</h4>
        </div>

        <div className="appointment_txt_section my-4 mx-2 p-4">
          <h6>{t("title2")}</h6>
          <p>20 {t("minutes")}</p>

          <p className="pt-3">{t("paragraphTxt1")}</p>

          <p className="pt-3">{t("paragraphTxt2")}</p>

          <p className="pt-3"> {t("paragraphTxt3")}</p>
        </div>

        {locale === "ar"
          ? instructorsData?.showingArabic
          : instructorsData?.showingEnglish}

        {instructorsData?.data?.map((instructor) => (
          <div
            key={instructor._id}
            className="nutrition_coach_section my-4 mx-2 p-4"
          >
            <div className="row">
              <div className="col-lg-3">
                <div className="text-center mb-3 mb-md-0">
                  <Image
                    src={`http://localhost:8000/${instructor?.image}`}
                    alt="Instructor"
                    width={200}
                    height={200}
                    className="img-fluid"
                  />
                </div>
              </div>

              <div className="col-lg-9">
                <div className="coach_info">
                  <div className="coach_name_details ">
                    <span>{instructor.instructor_name}</span>
                    <br />
                    <span> {instructor.instructor_qualification}</span>
                  </div>

                  <div className="coach_booking_btn">
                    <button
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop5"
                      onClick={() => handleBookNow(instructor)}
                    >
                      {t("btnTxt")}
                    </button>
                  </div>
                </div>

                <div className="pt-4 coach_txt">
                  <p>{instructor.instructor_details}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {!isLoading && (
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              {/* Previous page button */}
              <li
                className={`page-item prev_btn ${
                  pageNo === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNo - 1)}
                  disabled={pageNo === 1}
                >
                  {t("prev")}
                </button>
              </li>

              {/* Page number buttons */}
              {instructorsData?.totalPages?.map((pageNum) => (
                <li
                  key={pageNum}
                  className={`page-item ${pageNum === pageNo ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                </li>
              ))}

              {/* Next page button */}
              <li
                className={`page-item next_btn ${
                  pageNo === instructorsData?.totalPages?.length
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNo + 1)}
                  disabled={pageNo === instructorsData?.totalPages?.length}
                >
                  {t("next")}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
