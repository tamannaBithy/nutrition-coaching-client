import { useTranslations } from "next-intl";

export default function MealTabsBtn() {
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
            id='pills-home-tab'
            data-bs-toggle='pill'
            data-bs-target='#pills-home'
            type='button'
            role='tab'
            aria-controls='pills-home'
            aria-selected='true'>
            {t("ManageOfferedMeals.AddOfferedMeals.tabBtn.one")}
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='pills-profile-tab'
            data-bs-toggle='pill'
            data-bs-target='#pills-profile'
            type='button'
            role='tab'
            aria-controls='pills-profile'
            aria-selected='false'>
            {t("ManageOfferedMeals.AddOfferedMeals.tabBtn.two")}
          </button>
        </li>
      </ul>
    </>
  );
}
