import MainMenuItems from "@/components/main-menu/MainMenuItems";
import "./style.css";

// Export Meta Data
export const metadata = {
  title: "GigaDiet Meals | Main-Menu",
  description: "Select you meals as per your preferences",
};

/**
 * @component MainMenu
 * @description The main menu component for GigaDiet Meals.
 * This component renders the MainMenuItems component within a Suspense component.
 * It provides a loading fallback while data is being fetched.
 * @returns {JSX.Element} The JSX representation of the MainMenu component.
 */

export default async function MainMenu() {
  return (
    <>
      <MainMenuItems />
    </>
  );
}
