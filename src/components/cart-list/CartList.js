"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  useDeleteMealFromMainMealCartMutation,
  useDeleteMealFromOfferedMealCartMutation,
  useGetAllCartsQuery,
} from "../../../redux/features/queries/CART_API";
import "./CartList.css";

export default function CartList() {
  const t = useTranslations("Cart");

  const {
    data: allCarts,
    isLoading: allCartsLoading,
    isError: allCartsError,
  } = useGetAllCartsQuery();
  const [deleteMealFromMainMealCart, { isLoading, isError }] =
    useDeleteMealFromMainMealCartMutation();
  const [deleteMealFromOfferedMealCart] =
    useDeleteMealFromOfferedMealCartMutation();

  const { locale } = useParams();
  // State to store the fetched language
  const [language, setLanguage] = useState(null);

  // get cart ID
  const cartId = allCarts?.data?.mainMealCart[0]?._id;
  // get offered meal cart ID
  const offeredMealCartId = allCarts?.data?.offeredMealCart[0]?._id;

  //handle delete cart item
  const handleDeleteMealFormCart = (cartId, menuId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! But you can re-add it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Removed!",
        text: "Your file has been removed.",
        icon: "success",
      });

      // Call your deleteMealFromMainMealCart function here
      deleteMealFromMainMealCart({ cartId, menuId });
    });
  };

  //handle delete offered meal cart item
  const handleDeleteOfferedMealFormCart = (cartId, menuId) => {
    console.log(cartId, menuId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! But you can re-add it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8dc143",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Removed!",
        text: "Your file has been removed.",
        icon: "success",
      });

      // Remove from local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      delete cartItems[menuId];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Call your deleteMealFromOfferedMealCart function here
      deleteMealFromOfferedMealCart({ cartId, menuId });
    });
  };

  if (
    allCarts?.data?.mainMealCart[0]?.menus?.length === 0 &&
    allCarts?.data?.offeredMealCart[0]?.menus?.length === 0
  ) {
    return (
      <div className="text-center my-5 py-5 ">
        <h2 className="no_cart_data_title display-5">{t("noItem")}</h2>

        <div className="py-3 d-sm-flex gap-3 justify-content-sm-center align-items-sm-center">
          <div className="my-3">
            <Link href="/weekly-menu" className="text-decoration-none">
              <button className="back_our_plans_btn form-control text-center  mx-auto rounded-5 text-white">
                {t("buttons.backBtns.one")}
              </button>
            </Link>
          </div>

          <div className="my-3">
            <Link href="/offered-menu" className="text-decoration-none">
              <button className="back_our_plans_btn form-control text-center  mx-auto rounded-5 text-white">
                {t("buttons.backBtns.two")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="meal_cart_wrapper mx-md-5 my-5 padding-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              {/* Main meal table */}
              {allCarts?.data?.mainMealCart[0]?.menus?.length > 0 && (
                <div className="weekly_menu_table_section">
                  <div className="weekly_cart_table_title">
                    <h2>{t("MainMealTables.tableTitle")}</h2>
                  </div>

                  <div className="table-responsive mt-4">
                    {/* Main Meals Cart Table */}
                    <table className="table table-bordered weekly_meals_cat_table">
                      <thead>
                        <tr>
                          <td scope="col">
                            {t("MainMealTables.tableHead.columns.one.label")}
                          </td>
                          <td scope="col">
                            {t("MainMealTables.tableHead.columns.two.label")}
                          </td>
                          <td scope="col">
                            {t("MainMealTables.tableHead.columns.three.label")}
                          </td>
                          <td scope="col">
                            {t("MainMealTables.tableHead.columns.four.label")}
                          </td>
                          <td scope="col">
                            {t("MainMealTables.tableHead.columns.five.label")}
                          </td>
                          <td scope="col">
                            {t("MainMealTables.tableHead.columns.six.label")}
                          </td>
                          <td scope="col">
                            {t("MainMealTables.tableHead.columns.seven.label")}
                          </td>
                        </tr>
                      </thead>

                      <tbody>
                        {allCarts?.data?.mainMealCart[0]?.menus?.map(
                          (mainMeal, i) => (
                            <tr key={i}>
                              <td scope="row">{i + 1}</td>
                              <td scope="row" className="table_image">
                                <Image
                                  src={`http://localhost:8000${mainMeal?.mealDetails?.image}`}
                                  fill="true"
                                  sizes="(min-width: 808px) 50vw, 100vw"
                                  style={{
                                    objectFit: "cover", // cover, contain, none
                                  }}
                                  alt="Image"
                                />
                              </td>
                              <td scope="row" style={{ width: "300px" }}>
                                {mainMeal?.mealDetails?.meal_name}
                              </td>
                              <td scope="row">{mainMeal?.quantity}</td>
                              <td scope="row">
                                ${mainMeal?.mealDetails?.regular_price}
                              </td>

                              <td scope="row">${mainMeal?.sub_total}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    handleDeleteMealFormCart(
                                      cartId,
                                      mainMeal?.mealDetails?._id
                                    )
                                  }
                                  className="weekly_cart_delete"
                                >
                                  <Image
                                    src="/assets/cart/delete.svg"
                                    alt="deleteIcon"
                                    width={60}
                                    height={40}
                                  />
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {/* Offered meal table */}
              {allCarts?.data?.offeredMealCart[0]?.menus?.length > 0 && (
                <div className="weekly_menu_table_section mt-4">
                  <div className="weekly_cart_table_title">
                    <h2>{t("OfferedMealsCartTable.tableTitle")}</h2>
                  </div>

                  <div className="table-responsive mt-4">
                    {/* Weekly Meals Cart Table */}
                    <table className="table table-bordered weekly_meals_cat_table">
                      <thead>
                        <tr>
                          <td scope="col">
                            {t(
                              "OfferedMealsCartTable.tableHead.columns.one.label"
                            )}
                          </td>
                          <td scope="col">
                            {t(
                              "OfferedMealsCartTable.tableHead.columns.two.label"
                            )}
                          </td>
                          <td scope="col">
                            {t(
                              "OfferedMealsCartTable.tableHead.columns.three.label"
                            )}
                          </td>
                          <td scope="col">
                            {t(
                              "OfferedMealsCartTable.tableHead.columns.four.label"
                            )}
                          </td>
                          <td scope="col">
                            {t(
                              "OfferedMealsCartTable.tableHead.columns.five.label"
                            )}
                          </td>
                          <td scope="col">
                            {t(
                              "OfferedMealsCartTable.tableHead.columns.six.label"
                            )}
                          </td>
                          <td scope="col">
                            {t(
                              "OfferedMealsCartTable.tableHead.columns.seven.label"
                            )}
                          </td>
                        </tr>
                      </thead>

                      <tbody>
                        {allCarts?.data?.offeredMealCart[0]?.menus?.map(
                          (mainMeal, i) => (
                            <tr key={i}>
                              <td scope="row">{i + 1}</td>
                              <td scope="row" className="table_image">
                                <Image
                                  src={
                                    mainMeal?.mealDetails?.package_image
                                      ? `http://localhost:8000${mainMeal?.mealDetails?.package_image}`
                                      : ""
                                  }
                                  fill="true"
                                  sizes="(min-width: 808px) 50vw, 100vw"
                                  style={{
                                    objectFit: "cover", // cover, contain, none
                                  }}
                                  alt="Image"
                                />
                              </td>
                              <td scope="row" style={{ width: "300px" }}>
                                {mainMeal?.mealDetails?.package_name}
                              </td>

                              <td scope="row">{mainMeal?.quantity}</td>
                              <td scope="row">
                                ${mainMeal?.mealDetails?.price}
                              </td>
                              <td scope="row">${mainMeal?.sub_total}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    handleDeleteOfferedMealFormCart(
                                      offeredMealCartId,
                                      mainMeal?.mealDetails?._id
                                    )
                                  }
                                  className="weekly_cart_delete"
                                >
                                  <Image
                                    src="/assets/cart/delete.svg"
                                    alt="deleteIcon"
                                    width={60}
                                    height={40}
                                  />
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Amount Summary */}
            <div className="col-lg-3 col-md-12 col-sm-12 ">
              <div className="amount_table_section">
                <div className="weekly_cart_table_title">
                  <h2>Summary</h2>
                </div>

                <div className="table-responsive mt-4">
                  <table className="table table-bordered amount_table">
                    <tbody>
                      <tr>
                        <td>
                          <strong>{t("summary.priceSummary.Discount")}</strong>
                        </td>
                        <th>{allCarts?.data?.discount} IQD</th>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            {t("summary.priceSummary.Grandtotal")}
                          </strong>
                        </td>
                        <th>{allCarts?.data?.grandTotalAfterDiscount} IQD</th>
                      </tr>
                    </tbody>
                  </table>

                  <div className="d-flex flex-wrap flex-column align-items-end justify-content-end">
                    <div className="my-2">
                      <Link href="/checkout">
                        <button className="pro_checkout_btn">
                          {t("buttons.proceed")}
                        </button>
                      </Link>
                    </div>

                    <div className="my-2">
                      <p>
                        ----------------------{t("buttons.divider")}
                        -----------------------
                      </p>
                    </div>
                    <div className="my-2 ">
                      <Link href="/main-menu">
                        <button className="cont_weekly_menu_btn">
                          {t("buttons.mainMenu")}
                        </button>
                      </Link>
                    </div>

                    <div className="my-2 ">
                      <Link href="/offered-menu">
                        <button className="cont_offered_menu_btn">
                          {t("buttons.offeredMenu")}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
