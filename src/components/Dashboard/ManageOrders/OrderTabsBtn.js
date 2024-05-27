import { useTranslations } from "next-intl";

export default function OrderTabsBtn() {
  const t = useTranslations("Dashboard");

  return (
    <>
      <ul
        className='nav nav-pills mb-3 d-flex justify-content-center'
        id='pills-tab'
        role='tablist'>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link active'
            id='v-pills-home-tab'
            data-bs-toggle='pill'
            data-bs-target='#v-pills-home'
            type='button'
            role='tab'
            aria-controls='v-pills-home'
            aria-selected='true'>
            {t("ManageOrders.tabs.name1")}
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='v-pills-profile-tab'
            data-bs-toggle='pill'
            data-bs-target='#v-pills-profile'
            type='button'
            role='tab'
            aria-controls='v-pills-profile'
            aria-selected='false'>
            {t("ManageOrders.tabs.name2")}
          </button>
        </li>
      </ul>
    </>
  );
}
