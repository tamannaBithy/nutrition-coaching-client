import { useTranslations } from "next-intl";
import "./NutritionBanner.css";

export default function NutritionBanner() {
  const t = useTranslations("NutritionCoaching");

  return (
    <div className='nutrition_hero_section'>
      <div className='container d-flex flex-column justify-content-start '>
        <div className='nutrition_hero_title'>
          <h2 className='display-5 '>{t("bannerTitle")}</h2>
        </div>
        <div className='nutrition_hero_txt'>
          <p>{t("paragraphTxt")}</p>
        </div>
      </div>
    </div>
  );
}
