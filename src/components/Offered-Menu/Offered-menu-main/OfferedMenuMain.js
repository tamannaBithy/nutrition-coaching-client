"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetOfferedMealByIdQuery } from "../../../../redux/features/queries/OFFERED_MEALS_API";
import OfferedMenuPopup from "../OfferedMenuPopup";

export default function OfferedMenuMain() {
  const { id: mealId } = useParams();
  const { locale } = useParams();

  const t = useTranslations("OfferedMenus");

  // State to manage selected meal data for the modal
  const [selectedMealData, setSelectedMealData] = useState(null);
  const {
    data: packageDetails,
    isLoading,
    isError,
  } = useGetOfferedMealByIdQuery({ mealId });

  const { data: mealsData } = packageDetails || {};

  const bgImage = mealsData?.image
    ? `http://localhost:8000${mealsData?.image}`
    : "/assets/meals.jpg";

  //Handle read more modal
  const handleCardClick = (mealId) => {
    const selectedData = mealsData?.meals
      .flatMap((mealContent) => mealContent)
      .find((mealData) => mealData?._id === mealId);

    if (selectedData) {
      setSelectedMealData(selectedData);
    }
  };

  //decide what to render
  let content = null;

  if (isLoading)
    content = (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!isLoading && !isError) {
    content = (
      <>
        {
          <div className="offered_meals_area ">
            <div
              className="offer_meal_banner"
              style={{
                background: `rgba(0, 0, 0, 0.4) url(${bgImage})`,
              }}
            >
              <div className="banner_title">
                <h2>{mealsData?.package_name}</h2>
              </div>
            </div>
            <div className="offer_meals_info">
              <div className="top_details pt-4">
                <div className="container text-white">
                  <h5 className="">
                    {t("total")} : {mealsData?.meals?.length} {t("meals")}
                  </h5>
                </div>
              </div>
            </div>
            <div className="meals_box_Info pb-5 pt-5">
              <div className="container">
                <div className="row">
                  <div className="col-xl-5">
                    {mealsData?.meals?.map((meal) => {
                      const {
                        carbs,
                        meal_name,
                        protein,
                        fat,
                        calories,
                        image,
                        _id,
                      } = meal;

                      const cardImage = image
                        ? `http://localhost:8000${image}`
                        : "";
                      return (
                        <>
                          <div className="card bg-dark overflow-hidden text-white mb-5 ">
                            <div className="row g-0">
                              <div className="col-md-5">
                                <div className="card_image_offered_meal">
                                  <Image
                                    src={cardImage}
                                    alt="Meals Image"
                                    fill="true"
                                    sizes="(min-width: 808px) 50vw, 100vw"
                                    style={{
                                      objectFit: "cover",
                                      overflow: "hidden",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-md-7">
                                <div
                                  className="card-body"
                                  style={{ maxWidth: 540 }}
                                >
                                  <h5 className="card-title">{meal_name}</h5>
                                  <ul className="meal_card_lists">
                                    <li>
                                      <small>{t("protein")}</small>
                                      <p>{protein}g</p>
                                    </li>
                                    <li>
                                      <small>{t("carbs")}</small>
                                      <p>{carbs}g</p>
                                    </li>
                                    <li>
                                      <small>{t("fat")}</small>
                                      <p>{fat}g</p>
                                    </li>
                                    <li>
                                      <small>{t("calories")}</small>
                                      <p>{calories}</p>
                                    </li>
                                  </ul>
                                  <p
                                    onClick={() => handleCardClick(_id)}
                                    className="card-text"
                                  >
                                    <small className="text-muted">
                                      <button
                                        className="meal_pop_up"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                      >
                                        {t("btnText")}
                                      </button>
                                    </small>
                                  </p>
                                  <OfferedMenuPopup
                                    mealData={selectedMealData}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <div className="col-xl-6">
                    <div className="meal_champion">
                      <div className=" text-white mb-3  bg-dark  meal_champion_area">
                        <div className="card-header">
                          <h5>{t("eatLikeAChampion")}</h5>
                          <div className="meals_total">
                            <p>
                              <svg
                                className="me-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="36"
                                height="36"
                              >
                                <path
                                  d="M4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311L4.5 7.65311ZM12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM6.49896 9.97065L11 12.5765V17.625H13V12.5765L17.501 9.97066L16.499 8.2398L12 10.8445L7.50104 8.2398L6.49896 9.97065Z"
                                  fill="rgba(163,163,163,1)"
                                ></path>
                              </svg>
                              {mealsData?.meals?.length} {t("meals")}
                              <br></br>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="back_link_link">
              <Link href="/offered-menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                >
                  <path
                    d="M12 13V20L4 12L12 4V11H20V13H12Z"
                    fill="rgba(100,205,138,1)"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        }
      </>
    );
  }

  return <>{content}</>;
}
