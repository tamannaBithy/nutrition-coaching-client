import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProgressBar from "./../main-menu/ProgressBar";
import "./OfferedPopup.css";

export default function OfferedMenuPopup({ mealData }) {
  const t = useTranslations("OfferedMenus");

  const [isOpen, setIsOpen] = useState(false);

  const handleShowIngredient = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      {" "}
      <div
        className="modal fade meals_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header " onClick={handleCloseModal}>
              <button
                type="button"
                className="btn-close m-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0 overflow-hidden">
              <div className="row">
                {/* modal left area */}
                <div className="col-md-6 p-0">
                  <div className="modal_image">
                    <Image
                      src={
                        mealData?.image
                          ? `http://localhost:8000${mealData?.image}`
                          : ""
                      }
                      fill="true"
                      sizes="(min-width: 808px) 50vw, 100vw"
                      style={{
                        objectFit: "cover",
                        overflow: "hidden",
                      }}
                      alt="MEAL IMAGE"
                    />
                  </div>
                </div>
                {/* modal right area */}
                <div className="col-md-6 p-0">
                  <div className="right_area_content">
                    <div className="meal_title">
                      <h5 className="px-3 text-black">{mealData?.meal_name}</h5>
                    </div>

                    {/* Calories and Premium Protein */}
                    <div className="popup_starts px-3">
                      <div className="popup_calories">
                        <div className="pop_cal">
                          {mealData?.calories}
                          <p>{t("calories")}</p>
                        </div>

                        {/* Premium Protein Image */}
                        <div className="pop_cal_img">
                          <Image
                            src="/assets/fish-icon.png"
                            alt="weeklyImg1"
                            width={100}
                            height={100}
                            layout="responsive"
                          />
                          <p>{t("premiumProtein")}</p>
                        </div>
                      </div>

                      {/* Progress Bars for Nutrients */}
                      <div className="popup_progress_round pt-3">
                        <ProgressBar
                          myProps={mealData?.protein}
                          name={t("protein")}
                        />
                        <ProgressBar myProps={mealData?.fat} name={t("fat")} />
                        <ProgressBar
                          myProps={mealData?.carbs}
                          name={t("carbs")}
                        />
                      </div>
                    </div>
                    {/* Ingredients and More Button */}
                    <div
                      className="popup_more_button"
                      onClick={handleShowIngredient}
                    >
                      {t("ingredientsAndMore")}
                      <span>
                        {isOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* modal bottom box nutrition_facts*/}
            {isOpen && (
              <div className="modal-body fade-in-animation  p-0 pt-5 overflow-hidden modal_bottom_Ingredients">
                <div className="row">
                  {/* modal left area */}
                  <div className="col-md-4 p-0">
                    <div className="modal_image_nutrition_facts">
                      <Image
                        src={
                          mealData?.nutrition_facts
                            ? `http://localhost:8000${mealData?.nutrition_facts}`
                            : ""
                        }
                        fill="true"
                        sizes="(min-width: 808px) 50vw, 100vw"
                        alt="MEAL IMAGE"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 px-4 mt-3">
                    <div className="ingredients">
                      <h5>{t("ingredients")}</h5>

                      {/* Long list of ingredients */}
                      <p>{mealData?.ingredients}</p>
                    </div>
                  </div>
                  <div className="col-md-4 px-4">
                    <div className="ingredients">
                      <div className="d-flex align-items-center">
                        {/* Heating Icon Image */}
                        <div className="heat_img">
                          <Image
                            src="/assets/heat-icon.svg"
                            alt="heat-icon"
                            width={39}
                            height={45}
                          />
                        </div>
                      </div>

                      {/* Heating instructions */}
                      <p>{mealData?.heating_instruction}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
