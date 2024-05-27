"use client";
import Image from "next/image.js";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetAllCustomizedMealsQuery } from "../../../redux/features/queries/CUSTOMIZED_MEAL_API.js";
import "./CustomizeMeal.css";

const AllCustomizedMeal = () => {
  const { locale: lang } = useParams();

  const [showPerPage, setShowPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLang, setSelectedLang] = useState(lang);

  const {
    data: customMealData,
    isLoading,
    refetch,
  } = useGetAllCustomizedMealsQuery({
    showPerPage,
    pageNo: currentPage,
    lang: selectedLang,
  });

  console.log(customMealData?.data);

  //handle language preference select change
  const handleSelectedLang = (e) => {
    setSelectedLang(e.target.value);
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
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog selected_meal_modal modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title" id="staticBackdropLabel">
              Select Meals
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="row px-4 py-5">
                  {customMealData?.data?.map((meal) => {
                    return (
                      <div className="col-md-4" key={meal?._id}>
                        <div className="meal_card">
                          <div className="card_image">
                            <Image
                              src={`http://localhost:8000${meal?.image}`}
                              fill="true"
                              style={{
                                objectFit: "cover",
                                overflow: "hidden",
                              }}
                              alt="CUSTOM-MEAL"
                            />
                          </div>
                          <div className="card-body px-2 py-2">
                            <h5 className="card-title">{meal?.meal_name}</h5>
                          </div>

                          <div className="footer_cart_btn my-3">
                            <button>Add To Cart</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCustomizedMeal;
