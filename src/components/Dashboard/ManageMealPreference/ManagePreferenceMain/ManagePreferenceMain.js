import { useTranslations } from "next-intl";
import AddPreferenceForm from "../AddPreferenceForm/AddPreferenceForm";
import PreferenceMealCards from "../PreferenceMealCards/PreferenceMealCards";

export default function ManagePreferenceMain() {
  const t = useTranslations("Dashboard");

  // const langData = language?.adminDashboard?.manageMealPreference;
  return (
    <div className='container-fluid manage-preference-container'>
      {/* Title section for managing meal preferences */}
      <div className='manage_preference_title'>
        <h2>{t("ManageMealPreference.pageTitle")}</h2>
      </div>

      <div className='row gap-2 py-3'>
        {/* Column for AddPreferenceForm */}
        <div className='col-lg-5 col-md-12 col-sm-12'>
          <AddPreferenceForm />
        </div>

        {/* Column Divider */}
        <div className='preference_divider d-lg-block d-none'></div>

        {/* Column for PreferenceMealCards */}
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <PreferenceMealCards />
        </div>
      </div>
    </div>
  );
}
