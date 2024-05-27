import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import "./CustomModal.css";
import ProgressBar from "./ProgressBar";
export default function CustomModal2({ popupData, onClose, showModal }) {
  const t = useTranslations("MainMealsMenu");
  const [isOpen, setIsOpen] = useState(false);

  const handleShowIngredient = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom_modal_container ">
      <div className="custom_modal_dialog">
        <div className="custom_modal_dialog_content">
          <div className="custom_modal_header">
            <button onClick={onClose}>
              <RxCross1 />
            </button>
          </div>
          <div className="custom_modal_body p-0 overflow-hidden">
            <div className="row">
              <div className="col-md-6 p-0 position-relative overflow-hidden">
                <div className="modal_image">
                  <Image
                    src={
                      popupData?.image
                        ? `http://localhost:8000${popupData?.image}`
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

                  <div className="badge_item">
                    <span>{popupData?.main_badge_tag}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 p-0 position-relative">
                <div className="modal_right_side_content ">
                  <div className="meal_title">
                    <h5 className="px-3">{popupData?.meal_name}</h5>
                  </div>
                  <ul className="popup_tag px-3">
                    {popupData?.tags?.map((tag, i) => (
                      <li key={i}>{tag}</li>
                    ))}
                  </ul>

                  {/* Calories and Premium Protein */}
                  <div className="popup_starts px-3">
                    <div className="popup_calories">
                      <div className="pop_cal">
                        {popupData?.calories}
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
                        myProps={popupData?.protein}
                        name={t("protein")}
                      />
                      <ProgressBar myProps={popupData?.fat} name={t("fat")} />
                      <ProgressBar
                        myProps={popupData?.carbs}
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
            <div className="modal-body  p-0 pt-5 overflow-hidden modal_bottom_Ingredients">
              <div className="row">
                {/* modal left area */}
                <div className="col-md-4 p-0">
                  <div className="modal_image_nutrition_facts">
                    <Image
                      src={
                        popupData?.nutrition_facts
                          ? `http://localhost:8000${popupData?.nutrition_facts}`
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
                    <h5>{t("ingredients")} </h5>

                    {/* Long list of ingredients */}
                    <p>{popupData?.ingredients}</p>
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
                    <p>{popupData?.heating_instruction}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
