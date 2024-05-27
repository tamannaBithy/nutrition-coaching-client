import MealTypeManageMain from "@/components/Dashboard/ManageMealType/MealTypeManageMain/MealTypeManageMain";
import "./ManageMealType.css";

// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | Manage Meal Type",
  description: "",
};

/**
 * Component for managing meal types.
 * @component
 * @returns {JSX.Element} The rendered ManageMealType component.
 */
export default function ManageMealType() {
  return (
    // Container for the entire ManageMealType component
    <>
      <MealTypeManageMain />
    </>
  );
}
