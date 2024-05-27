import ManageDiscounts from "@/components/Dashboard/ManageDiscount/ManageDiscounts";
import "./discount.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Discount",
  description: "",
};

/**
 * Component for managing discounts.
 * @component
 * @returns {JSX.Element} The rendered Discount component.
 */
export default function Discount() {
  return (
    // Container for the entire Discount component
    <div className='container-fluid discount-container'>
      <ManageDiscounts />
    </div>
  );
}
