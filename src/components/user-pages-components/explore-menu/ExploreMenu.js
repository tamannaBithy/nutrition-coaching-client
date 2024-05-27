import { useTranslations } from "next-intl";
import ExploreSlider from "./ExploreSlider";
import "./style.css";

export default function ExploreMenu() {
  const t = useTranslations("ExploreTheMenu");

  return (
    <>
      <div className='container'>
        <div className='explore_menu_header'>
          <h2>{t("title")}</h2>
          <p>{t("paragraph")}</p>
        </div>
      </div>
      <ExploreSlider />
    </>
  );
}
