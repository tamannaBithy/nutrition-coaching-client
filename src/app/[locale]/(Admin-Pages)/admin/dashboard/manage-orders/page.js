import CustomizeOrders from "@/components/Dashboard/ManageOrders/CustomizeOrders";
import OrderTabsBtn from "@/components/Dashboard/ManageOrders/OrderTabsBtn";
import RegularOrders from "@/components/Dashboard/ManageOrders/RegularOrders";
import "./manage-order.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Manage Orders",
  description: "",
};

export default function ManageOrders() {
  return (
    <div>
      <OrderTabsBtn />
      <div class='tab-content' id='v-pills-tabContent'>
        <div
          class='tab-pane fade show active'
          id='v-pills-home'
          role='tabpanel'
          aria-labelledby='v-pills-home-tab'>
          <RegularOrders />
        </div>
        <div
          class='tab-pane fade'
          id='v-pills-profile'
          role='tabpanel'
          aria-labelledby='v-pills-profile-tab'>
          <CustomizeOrders />
        </div>
      </div>
    </div>
  );
}
