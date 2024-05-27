import Link from "next/link";
import Image from "next/image";

/**
 * @component PriceCard
 * @description Renders a price card for a specific menu item.
 * @param {string} id - The unique identifier for the menu item.
 * @returns {JSX.Element} The JSX representation of the PriceCard component.
 */

export default function PriceCard({ id }) {
  return (
    <>
    {/* Individual price card */}
      <div className="col-xl-4 custom_cursor position-relative">
        <div className="card mb-3 pb_100">
          <Image
            src="/assets/weeklyImg1.jpg"
            alt="weeklyImg1"
            width={100}
            height={100}
            className="card-img-top"
          />
           {/* Overlay for promotional tag */}
          <div className="image_overly_offers">
            <p className="bg_green_overly">NEW</p>
          </div>
   {/* Nutritional information */}
          <div className="card-body">
            <div className="weekly_menu_item">
              <ul>
                <li>Protein : 34g </li>
                <li>Carbs : 43g</li>
                <li>Fat : 55g</li>
              </ul>
            </div>
            {/* Menu item name */}
            <h5 className="card-title">Roasted Garlic Chicken</h5>
             {/* Link to detailed page */}
            <Link href={`/offered-menu/${id}`}>
              <button className="offer_read_more">Read More</button>
            </Link>
          </div>
        </div>
          {/* Cart footer area with quantity and add to cart button */}
        <div className="cart_footer_area">
          <div className="cart_footer_quantity">
            <div className="cart_minus">-</div>
            <div className="cart_text">1</div>
            <div className="cart_plus">+</div>
          </div>
          <div className="footer_cart_btn">
            <button>Add To Cart</button>
          </div>
        </div>
        {/* <MainMenuPopup/> */}
      </div>
    </>
  );
}
