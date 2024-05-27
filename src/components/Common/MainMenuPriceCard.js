import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  useAddToMainMealCartMutation,
  useDeleteMealFromMainMealCartMutation,
  useGetAllCartsQuery,
} from "../../../redux/features/queries/CART_API";
// import MainMenuPopup from "../MainMenu/MainMenuPopup";
import CustomModal from "../main-menu/CustomModal";
import LoadMoreButton from "../weekly-menu/LoadMoreButton";
import "./MainMenuPriceCard.css";

/**
 * @component MainMenuPriceCard
 * @description Renders a price card for a meal with details like image, nutritional information, and pricing.
 * @param {Object} cardData - Data for the meal card, including meal details.
 * @returns {JSX.Element} The JSX representation of the MainMenuPriceCard component.
 */

export default function MainMenuPriceCard({ cardData }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMealData, setSelectedMealData] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  // State to manage the number of visible items and 'Show All' toggle
  const [visibleItems, setVisibleItems] = useState(4);
  const [showAll, setShowAll] = useState(false);
  const { meals } = cardData;

  const {
    data: allCarts,
    isLoading: allCartsLoading,
    isError: allCartsError,
  } = useGetAllCartsQuery();

  const [deleteMealFromMainMealCart, { isLoading, isError }] =
    useDeleteMealFromMainMealCartMutation();

  const [
    addToMainMealCart,
    { isLoading: cartAddLoading, isError: cartAddError },
  ] = useAddToMainMealCartMutation();

  // get all carts details
  const mainMealCartMenuDetails = allCarts?.data?.mainMealCart[0]?.menus?.map(
    (menu) => ({
      _id: menu.mealDetails._id,
      quantity: menu.quantity,
    })
  );

  const cartId = allCarts?.data?.mainMealCart[0]?._id;
  const cartMenusLength = allCarts?.data?.mainMealCart[0]?.menus?.length;

  const selectedMealsPerDay =
    parseInt(localStorage.getItem("selectedMealsPerDay")) || 0;

  const selectedPlanDuration = parseInt(
    localStorage.getItem("selectedPlanDuration")
  );

  const duration = selectedPlanDuration * selectedMealsPerDay;

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

  //Add to cart handler
  const handleAddToCart = async (mealId) => {
    const data = {};

    data.mainMealsMenu = mealId;
    data.quantity = selectedPlanDuration;

    if (cartMenusLength >= duration) {
      return Swal.fire(`You can't select more than ${duration} meals`);
    }

    try {
      await addToMainMealCart(data);

      // Success: Show success message
      Swal.fire({
        title: "Added to Cart!",
        text: "Your item has been added to the cart successfully.",
        icon: "success",
      });
    } catch (error) {
      // Handle any errors if necessary
      console.error("Error adding to cart:", error);
    }
  };

  const handleCardClick = (mealId) => {
    const selectedData = meals
      .flatMap((mealContent) => mealContent)
      .find((mealData) => mealData?._id === mealId);
    if (selectedData) {
      setSelectedMealData(selectedData);
      setShowModal(true);
    }
  };
  function handleModalClose() {
    setSelectedMealData(null);
    setShowModal(false);
  }
  /**
   * @function handleToggleShowMore
   * @description Handles the 'Show More' button click and toggles between displaying all items and a limited number.
   */
  const handleToggleShowMore = () => {
    setShowAll((prevShowAll) => !prevShowAll);
    // If showing less, reset visible items to initial state
    if (!showAll) {
      setVisibleItems(3);
    }
  };

  return (
    <>
      {meals &&
        meals
          ?.slice(0, showAll ? meals?.length : visibleItems)
          ?.map((meal, i) => {
            // get meal quantity
            const matchingQuantity = mainMealCartMenuDetails?.find(
              (quantity) => quantity._id === meal._id
            );

            return (
              <div
                key={meal?._id || i}
                className="col-xl-4 col-md-6 custom_cursor position-relative"
              >
                <div className="card menu-card mb-3 pb_100 overflow-hidden">
                  <div className="main_menu_image">
                    <Image
                      src={
                        meal?.image ? `http://localhost:8000${meal?.image}` : ""
                      }
                      fill="true"
                      sizes="(min-width: 808px) 50vw, 100vw"
                      style={{
                        objectFit: "cover",
                        overflow: "hidden",
                      }}
                      alt="MEALS IMAGE"
                    />
                  </div>

                  <div className="image_overly_offers">
                    {meal?.main_badge_tag !== "" && (
                      <p className="bg_green_overly">{meal?.main_badge_tag}</p>
                    )}
                  </div>

                  <div className="card-body">
                    <div className="weekly_menu_item">
                      <ul>
                        <li>Protein: {meal?.protein}g</li>
                        <hr />
                        <li>Carbs: {meal?.carbs}g</li>
                        <li>Fat: {meal?.fat}g</li>
                        <li>Calories: {meal?.calories}g</li>
                      </ul>
                    </div>

                    <h5 className="main_menu_card_title my-2">
                      {meal?.meal_name}
                    </h5>

                    {meal?.old_price > 1 && meal?.regular_price && (
                      <h6 className="main_menu_price">
                        Price:{" "}
                        <del className="me-1 old_price_tag">
                          {meal?.old_price}
                        </del>{" "}
                        <strong>{meal?.regular_price}</strong>{" "}
                      </h6>
                    )}

                    {meal?.old_price === 0 && (
                      <h6 className="main_menu_price">
                        Price: <strong>{meal?.regular_price}</strong>{" "}
                      </h6>
                    )}

                    <button
                      onClick={() => handleCardClick(meal?._id)}
                      className="offer_read_more"
                    >
                      Read More
                    </button>
                  </div>
                </div>

                <div className="cart_footer_area">
                  <div className="cart_footer_quantity">
                    <div className="cart_text">
                      {matchingQuantity?.quantity || 0}
                    </div>
                  </div>

                  <div className="footer_cart_btn">
                    {matchingQuantity?.quantity > 0 ? (
                      <button
                        onClick={() =>
                          handleDeleteMealFormCart(cartId, meal?._id)
                        }
                      >
                        Remove From Cart
                      </button>
                    ) : (
                      <button onClick={() => handleAddToCart(meal?._id)}>
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

      <div className="looding_button mb-5 mt-3">
        <LoadMoreButton
          onLoadMore={handleToggleShowMore}
          showAll={showAll}
          disabled={meals?.length <= 4}
        />
      </div>
      {showModal && (
        <CustomModal
          popupData={selectedMealData}
          onClose={handleModalClose}
          showModal={showModal}
        />
      )}
      {/* {showModal && (
        <MainMenuPopup
          popupData={selectedMealData}
          onClose={handleModalClose}
        />
      )} */}
    </>
  );
}
