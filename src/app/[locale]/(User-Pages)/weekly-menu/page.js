import WeeklyMenuItems from "@/components/weekly-menu/WeeklyMenuItems";
import "./weekly.css";

/**
 * @component WeeklyMenu
 * @description The weekly menu component for GigaDiet Meals.
 * This component fetches the weekly menu data and renders the WeeklyMenuItems component within a Suspense component.
 * It provides a loading fallback while data is being fetched.
 * @returns {JSX.Element} The JSX representation of the WeeklyMenu component.
 */

export const metadata = {
  title: "GigaDiet Meals | Weekly-Menu",
  description: "Here is the list of weekly meals menu of GigaDiet Meals",
};

export default async function WeeklyMenu() {
  return (
    <div className='padding-top'>
      {/* Render the WeeklyMenuItems component  */}
      <WeeklyMenuItems />
    </div>
  );
}
