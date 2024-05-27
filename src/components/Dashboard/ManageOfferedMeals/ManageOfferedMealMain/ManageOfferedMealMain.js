import AddForm from "../AddForm/AddForm";
import CreatePackageForm from "../CreatePackageForm/CreatePackageForm";
import MealTabsBtn from "./MealTabsBtn";

export default function ManageOfferedMealMain() {
  return (
    <div>
      <MealTabsBtn />
      <div className='tab-content' id='pills-tabContent'>
        <div
          className='tab-pane fade show active'
          id='pills-home'
          role='tabpanel'
          aria-labelledby='pills-home-tab'>
          <CreatePackageForm />
        </div>
        <div
          className='tab-pane fade'
          id='pills-profile'
          role='tabpanel'
          aria-labelledby='pills-profile-tab'>
          <AddForm />
        </div>
      </div>
    </div>
  );
}
