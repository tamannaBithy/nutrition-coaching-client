import { useTranslations } from "next-intl";
import ManageAllUsersTable from "../ManageAllUsersTable/ManageAllUsersTable";

export default function AllUsersParent() {
  const t = useTranslations("Dashboard");
  return (
    <div className='container-fluid manage-all-users-container'>
      {/* Manage all users title  */}
      <div className='manage_all_users_title'>
        <h2>{t("ManageAllUser.title")}</h2>
      </div>

      {/* main content */}
      <div className='py-3'>
        <ManageAllUsersTable />
      </div>
    </div>
  );
}
