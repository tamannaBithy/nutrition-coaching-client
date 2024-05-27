"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMinusSm } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineShoppingBag } from "react-icons/md";
import Swal from "sweetalert2";
import {
  useAddToOfferedMealCartMutation,
  useDeleteMealFromOfferedMealCartMutation,
  useGetAllCartsQuery,
} from "../../../redux/features/queries/CART_API";
import { useGetAllOfferedMealsQuery } from "../../../redux/features/queries/OFFERED_MEALS_API";
// import CartItemsPopup from "../MainMenu/CartItemsPopup/CartItemsPopup";
import { useTranslations } from "next-intl";
import CartItemsPopup from "./../main-menu/CartItemsPopup/CartItemsPopup";
import "./OfferedMenu.css";

export default function OfferedMenu() {
  const t = useTranslations("OfferedMenus");

  const { locale } = useParams();

  const [searchInput, setSearchInput] = useState("");
  const {
    data: offeredMealsMenus,
    isError,
    isLoading,
  } = useGetAllOfferedMealsQuery({ lang: locale });

  const [addToOfferedMealCart] = useAddToOfferedMealCartMutation();
  const [] = useDeleteMealFromOfferedMealCartMutation();

  const {
    data: allCarts,
    isLoading: allCartsLoading,
    isError: allCartsError,
  } = useGetAllCartsQuery();

  const [imageLoading, setImageLoading] = useState(true);
  // const [cartItems, setCartItems] = useState({});

  //Increment Quantity Handler
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Increment Quantity Handler
  const incrementQuantityHandler = (mealId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [mealId]: {
        ...prevCartItems[mealId],
        quantity: (prevCartItems[mealId]?.quantity || 0) + 1,
      },
    }));
  };

  // Decrement Quantity Handler
  const decrementQuantityHandler = (mealId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [mealId]: {
        ...prevCartItems[mealId],
        quantity: Math.max((prevCartItems[mealId]?.quantity || 0) - 1, 0),
      },
    }));
  };

  // Add to cart handler
  const addToCartHandler = async (mealId) => {
    // Construct data object in the required format
    const cartData = {
      offeredMealsMenu: offeredMealsMenus.data.find(
        (meal) => meal._id === mealId
      ),
      quantity: cartItems[mealId]?.quantity || 0, // default quantity to 0 if not set
    };

    // Add the cart item to state
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [mealId]: cartData,
    }));

    // Update local storage with the new cart items
    localStorage.setItem(
      "cartItems",
      JSON.stringify({
        ...cartItems,
        [mealId]: cartData,
      })
    );

    // Extract quantity from cart data
    const { quantity } = cartItems[mealId] || { quantity: 0 };

    // Format the data as { offeredMealsMenu, quantity }
    const cartDataObj = {
      offeredMealsMenu: mealId, // Using mealId directly as _id
      quantity,
    };

    // Post the cart data
    const { data } = await addToOfferedMealCart(cartDataObj);
    if (data?.status) {
      Swal.fire({
        icon: "success",
        title: data?.message?.en,
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: data?.message?.en,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  // Search input change handler
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter meals based on search input
  const filteredMeals = offeredMealsMenus?.data?.filter((meal) =>
    meal.package_name.toLowerCase().includes(searchInput.toLowerCase())
  );
  // Render meals based on filtered data
  const mealsToRender = isLoading || isError ? [] : filteredMeals;

  const totalItems =
    (allCarts?.data?.mainMealCart[0]?.menus?.length || 0) +
    (allCarts?.data?.offeredMealCart[0]?.menus?.length || 0);

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
        {/* Cart items sticky  */}
        <div className="cartSticky position-relative">
          <button
            className="middleStickyBtn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBackdrop"
            aria-controls="offcanvasWithBackdrop"
          >
            <MdOutlineShoppingBag />
            <div className="d-flex align-items-center column-gap-1">
              <strong>{totalItems}</strong> {t("sideBarCanvas.items")}
            </div>
          </button>
          <CartItemsPopup mealData={offeredMealsMenus} />
        </div>
        <div>
          {/* Search filed to find the offered meal data data  */}
          <div className="search_area_offered_menu my-5 ">
            <form className="form-inline d-flex align-items-center">
              <div className="custom_input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg_icon bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                </svg>
                <input
                  className="input"
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  placeholder={t("placeholder")}
                />
              </div>
            </form>
          </div>
          {mealsToRender?.length > 0 ? (
            <div className="row">
              {mealsToRender?.map((meal) => {
                return (
                  <>
                    <div
                      key={meal?._id}
                      className="col-xl-4 col-md-6 custom_cursor position-relative"
                    >
                      <div className="card mb-3 pb_100">
                        {/* Meal Image */}
                        <div className="offered_meal_image">
                          <Image
                            src={
                              meal?.package_image
                                ? `http://localhost:8000${meal?.package_image}`
                                : ""
                            }
                            fill="true"
                            sizes="(min-width: 808px) 50vw, 100vw"
                            style={{
                              objectFit: "cover",
                              overflow: "hidden",
                            }}
                            alt="Offered-Meal"
                          />
                        </div>

                        <div className="card-body">
                          {/* Meal Name */}
                          <h5 className="main_menu_card_title">
                            {meal?.package_name}
                          </h5>

                          {/* Pricing Information */}
                          {meal?.price && (
                            <h6 className="main_menu_price">
                              {t("price")}: <strong>{meal?.price}</strong>${" "}
                            </h6>
                          )}
                          {/* Read More Button */}
                          <Link href={`/offered-menu/${meal?._id}`}>
                            <button className="offer_read_more">
                              {t("readMore")}
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* Cart Footer Section */}
                      <div className="cart_footer_area">
                        {/* Quantity Section */}
                        <div className="cart_footer_quantity">
                          <div
                            type="button"
                            className="cart_minus"
                            onClick={() => decrementQuantityHandler(meal?._id)}
                          >
                            <HiMinusSm />
                          </div>
                          <div className="cart_text">
                            {cartItems[meal?._id]?.quantity || 0}
                          </div>
                          <div
                            type="button"
                            className="cart_plus"
                            onClick={() => incrementQuantityHandler(meal?._id)}
                          >
                            <IoIosAdd />
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="footer_cart_btn">
                          <button
                            onClick={() => addToCartHandler(meal?._id)}
                            className={`${
                              !cartItems[meal?._id]?.quantity ||
                              cartItems[meal?._id].quantity === 0
                                ? "footer_cart_btn_disabled"
                                : ""
                            }`}
                          >
                            {t("addToCart")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <div className="text-center">
              <h4>{t("notfound")}</h4>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="offered-menu px-2 px-md-5 py-5">
      <div className="title text-center">
        <h2>{t("pageTitle")}</h2>
      </div>

      {content}
    </div>
  );
}
