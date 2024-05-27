"use client";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProgressBar from "../MainMenu/ProgressBar";
import "./popup.css";

export default function SliderPopup({ sliderImage, badgeData }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);

  const allClose = () => {
    if (openPopup === true) {
      setOpenPopup(false);
    }
    return false;
  };
  const toggle = () => {
    setOpenPopup((prevState) => !prevState);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={allClose}
      >
        <div className="modal-dialog modal_dialog_width modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-7 pop_slider_bg">
                    <Slider {...settings} className="explore_slide">
                      <div className="position-relative">
                        fdkjkljdfjdkdjsdjklj
                        {/* <Image
                              src={`http://localhost:8000/${sliderImage?.images[0]}`}
                              // alt={popupData?.meal_name}
                              alt="mealname"
                              width={100}
                              height={100}
                              className="card-img-top"
                              placeholder="empty" // or "blur" or "empty"
                              onLoad={() => setImageLoading(false)}
                              onError={() => setImageLoading(false)}
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              layout="responsive"
                            />  */}
                        {/* <div className='image_offer'>
                          <p className='img_offer'>new</p>
                        </div> */}
                      </div>
                    </Slider>
                  </div>

                  <div className="col-md-5">
                    <div>
                      <button
                        type="button"
                        className="btn-close before_close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="card-body p-0">
                      <div className="popup_plan_small px-3 pt-4">
                        Protein +
                      </div>
                      <h5 className="popup_title px-3">
                        Roasted Garlic Chicken
                      </h5>
                      <ul className="popup_tag px-3">
                        <li>High Protein</li>
                        <li>Nut-Free</li>
                      </ul>
                      <div className="popup_starts px-3">
                        <div className="popup_calories">
                          <div className="pop_cal">
                            740
                            <p>calories</p>
                          </div>
                          <div className="pop_cal_img">
                            <Image
                              src="/assets/fish-icon.png"
                              alt="weeklyImg1"
                              width={100}
                              height={100}
                              className="card-img-top"
                            />
                            <p>premium protein</p>
                          </div>
                        </div>
                        <div className="popup_progress_round pt-3">
                          <ProgressBar myProps={37} name={"PTOTEIN"} />
                          <ProgressBar myProps={49} name={"FAt"} />
                          <ProgressBar myProps={39} name={"CARBS"} />
                        </div>
                      </div>
                      <div className="popup_more_button" onClick={toggle}>
                        INGREDIENTS & MORE
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 16L6 10H18L12 16Z"
                              fill="rgba(255,255,255,1)"
                            ></path>
                          </svg>
                        </span>
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 8L18 14H6L12 8Z"
                            fill="rgba(42,86,49,1)"
                          ></path>
                        </svg> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="modal_top_box">
                <div className="modal_img_top"></div>
                <div className="modal_description_top"></div>
              </div> */}
                <div className="modal_bottom_box">
                  <div
                    className={`popup_more_button top_position ${
                      !openPopup && "d-none"
                    }`}
                    onClick={toggle}
                  >
                    INGREDIENTS & MORE
                    {openPopup && (
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 8L18 14H6L12 8Z"
                            fill="rgba(255,255,255,1)"
                          ></path>
                        </svg>
                      </span>
                    )}
                  </div>

                  {openPopup && (
                    <div className="click_popup" id="yourSectionId">
                      <div>
                        <button
                          type="button"
                          className="btn-close position-absolute after_close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="row">
                            <div className="col-md-4 mb-4">
                              <div className="img_pop">
                                <Image
                                  src="/assets/popupImg.png"
                                  alt="weeklyImg1"
                                  width={100}
                                  height={100}
                                  className="card-img-top"
                                />
                              </div>
                            </div>
                            <div className="col-md-4 mb-2">
                              <div className="ingredients_pop">
                                <h5>Ingredients</h5>
                                <p>
                                  SUSTAINABLE SALMON, GREEN BEANS, COUSCOUS
                                  (WHEAT FLOUR), OLIVE OIL, PEAS, ONION,
                                  *SPINACH, UNSALTED BUTTER (CREAM (FROM COWS
                                  MILK), NATURAL FLAVORINGS), GOAT CHEESE
                                  (GOAT’S MILK, SALT, ENZYMES), *GARLIC,
                                  *SHALLOTS, WHITE WINE VINEGAR, PARSLEY, SEA
                                  SALT, GARLIC POWDER, VEGETABLE BASE
                                  (VEGETABLES (CARROT, ONION, TOMATO, GARLIC),
                                  SEA SALT, SPICES, TURMERIC), BLACK PEPPER,
                                  ONION POWDER, *ARROWROOT, CHIVES, DILL WEED,
                                  TURMERIC CONTAINS: FISH, DAIRY, WHEA
                                </p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="instruction_pop_parent">
                                <div className="instruction_pop">
                                  <div className="heat_img">
                                    <Image
                                      src="/assets/heat-icon.svg"
                                      alt="weeklyImg1"
                                      width={100}
                                      height={100}
                                      className=""
                                    />
                                  </div>
                                  <h5>Heating Instruction</h5>
                                </div>
                                <p>
                                  Microwave: Peel a corner of protective film
                                  (1/4-1/2 inch). Heat 2-3 minutes. Time may
                                  vary depending on microwave. Conventional
                                  Oven: Transfer meal to oven-safe dish, heat
                                  for 7 minutes at 350 F or until desired
                                  temperature is reached. Stove Top: Transfer to
                                  pot, heat to desired temperature.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
