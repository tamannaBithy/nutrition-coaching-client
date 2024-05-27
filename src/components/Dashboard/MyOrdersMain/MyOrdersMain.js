import { useTranslations } from "next-intl";
import "./MyOrders.css";
import MyOrdersMainTable from "./MyOrdersMainTable";

export default function MyOrdersMain() {
  const t = useTranslations("Dashboard");

  return (
    <div className='container-fluid runningWeeklyMeals_container'>
      {/* Manage all users title  */}
      <div className='runningWeeklyMeals_title'>
        <h2>{t("MyOrders.title")}</h2>
      </div>

      {/* main content */}
      <div className='py-3'>
        <MyOrdersMainTable />
      </div>
    </div>
  );
}
