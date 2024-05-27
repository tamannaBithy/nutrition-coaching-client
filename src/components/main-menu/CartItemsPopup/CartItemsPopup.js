"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import {
  useDeleteMealFromMainMealCartMutation,
  useDeleteMealFromOfferedMealCartMutation,
  useGetAllCartsQuery,
} from "../../../../redux/features/queries/CART_API";
import "./CartItemsPopup.css";

export default function CartItemsPopup({ mealData }) {
  const t = useTranslations("MainMealsMenu");
  const t2 = useTranslations("OfferedMenus");

  const { locale } = useParams();
  const {
    data: allCarts,
    isLoading: allCartsLoading,
    isError: allCartsError,
  } = useGetAllCartsQuery();

  const [deleteMealFromMainMealCart, { isLoading, isError }] =
    useDeleteMealFromMainMealCartMutation();
  const [deleteMealFromOfferedMealCart] =
    useDeleteMealFromOfferedMealCartMutation();

  const { meals } = mealData;

  const selectedMealsPerDay =
    parseInt(localStorage.getItem("selectedMealsPerDay")) || 0;

  const selectedPlanDuration = parseInt(
    localStorage.getItem("selectedPlanDuration")
  );

  //get total items in cart
  const totalItems =
    (allCarts?.data?.mainMealCart[0]?.menus?.length || 0) +
    (allCarts?.data?.offeredMealCart[0]?.menus?.length || 0);

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

  return (
    <div
      className="offcanvas offcanvas-end overflow-y-auto overflow-x-hidden"
      tabindex="-1"
      id="offcanvasWithBackdrop"
      data-bs-keyboard="false"
      aria-labelledby="offcanvasWithBackdropLabel"
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title d-flex align-items-center column-gap-2"
          id="offcanvasWithBackdropLabel"
        >
          <MdOutlineShoppingBag />
          <div className="d-flex align-items-center column-gap-1">
            <span>{totalItems}</span>
            {t("sideBarCanvas.items")}
          </div>
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <RxCross2 />
        </button>
      </div>
      <hr />
      <div className="offcanvas-body main-menu-canvas-body">
        {/* Main meal table */}
        {allCarts?.data?.mainMealCart[0]?.menus?.length > 0 && (
          <div className="table_container mt-3">
            <div className="title">
              <h4>{t("sideBarCanvas.title1")}</h4>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">
                      {t("sideBarCanvas.tableHead.columns.one.label")}
                    </th>
                    <th scope="col">
                      {t("sideBarCanvas.tableHead.columns.two.label")}
                    </th>
                    <th scope="col">
                      {t("sideBarCanvas.tableHead.columns.three.label")}
                    </th>
                    <th scope="col">
                      {t("sideBarCanvas.tableHead.columns.four.label")}
                    </th>
                    <th scope="col">
                      {t("sideBarCanvas.tableHead.columns.five.label")}
                    </th>
                    <th scope="col">
                      {t("sideBarCanvas.tableHead.columns.six.label")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allCarts?.data?.mainMealCart[0]?.menus?.map(
                    (mainMeal, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row" className="table_image">
                            <Image
                              src={`http://localhost:8000${mainMeal?.mealDetails?.image}`}
                              fill="true"
                              sizes="(min-width: 808px) 50vw, 100vw"
                              style={{
                                objectFit: "cover", // cover, contain, none
                              }}
                              alt="Image"
                            />
                          </th>
                          <th scope="row" style={{ width: "250px" }}>
                            {mainMeal?.mealDetails?.meal_name}
                          </th>

                          <th scope="row">
                            ${mainMeal?.mealDetails?.regular_price}
                          </th>
                          <th scope="row">{mainMeal?.quantity}</th>
                          <th scope="row">${mainMeal?.sub_total}</th>
                          <th scope="row">
                            <div className="text-center">
                              <button
                                onClick={() =>
                                  handleDeleteMealFormCart(
                                    cartId,
                                    mainMeal?.mealDetails?._id
                                  )
                                }
                                className="delete_btn"
                              >
                                {" "}
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          </th>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Offered meal table */}
        {allCarts?.data?.offeredMealCart[0]?.menus?.length > 0 && (
          <div className="table_container mt-3">
            <div className="title">
              <h4>{t2("sideBarCanvas.title2")}</h4>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">
                      {t2("sideBarCanvas.tableHead.columns.one.label")}
                    </th>
                    <th scope="col">
                      {t2("sideBarCanvas.tableHead.columns.two.label")}
                    </th>
                    <th scope="col">
                      {t2("sideBarCanvas.tableHead.columns.three.label")}
                    </th>
                    <th scope="col">
                      {t2("sideBarCanvas.tableHead.columns.four.label")}
                    </th>
                    <th scope="col">
                      {t2("sideBarCanvas.tableHead.columns.five.label")}
                    </th>
                    <th scope="col">
                      {t2("sideBarCanvas.tableHead.columns.six.label")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allCarts?.data?.offeredMealCart[0]?.menus?.map(
                    (mainMeal, i) => {
                      return (
                        <tr key={i}>
                          <th className="table_image">
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
                          </th>
                          <th scope="row" style={{ width: "250px" }}>
                            {mainMeal?.mealDetails?.package_name}
                          </th>
                          <th scope="row">${mainMeal?.mealDetails?.price}</th>
                          <th scope="row">
                            <div className="d-flex align-items-center quantity-btn">
                              {mainMeal?.quantity}
                            </div>
                          </th>
                          <th scope="row">${mainMeal?.sub_total}</th>
                          <th scope="row">
                            <div className="text-center">
                              <button
                                className="delete_btn"
                                onClick={() =>
                                  handleDeleteOfferedMealFormCart(
                                    offeredMealCartId,
                                    mainMeal?.mealDetails?._id
                                  )
                                }
                              >
                                {" "}
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          </th>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="card-body my-5">
          <table className="table table-clear">
            <tbody>
              <tr>
                <td className="left">
                  <strong>{t("sideBarCanvas.grandTotal")}</strong>
                </td>
                <td className="right">
                  <strong>
                    ${allCarts?.data?.grandTotalAfterDiscount} IQD
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="popup_footer mb-1">
          <Link href="/cart">
            {" "}
            <button>{t("sideBarCanvas.goToCart")}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
