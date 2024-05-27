import { useTranslations } from "next-intl";
import { FaCheck } from "react-icons/fa";
import "./FreshNutritious.css";

export default function FreshNutritious() {
  const t = useTranslations("FreshNutritiousMeals");

  return (
    <section className='freshNutritious-section'>
      <div className='container px-5'>
        <div className='heading'>
          <h2>{t("title")}</h2>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='freshNutritious_container'>
              <div className='single_item flex-column row-gap-3 text-center flex-md-row row-gap-md-0 text-md-start mb-5'>
                <div className='icons'>
                  <FaCheck />
                </div>
                <div className='item_left'>
                  <h3>{t("nutritiousMeals.listOne.item_title")}</h3>
                  <p>{t("nutritiousMeals.listOne.paragraph")}</p>
                </div>
              </div>
              <div className='single_item flex-column row-gap-3 text-center flex-md-row row-gap-md-0 text-md-start mb-5'>
                <div className='icons'>
                  <FaCheck />
                </div>
                <div className='item_left'>
                  <h3>{t("nutritiousMeals.listTwo.item_title")}</h3>
                  <p>{t("nutritiousMeals.listTwo.paragraph")}</p>
                </div>
              </div>
              <div className='single_item flex-column row-gap-3 text-center flex-md-row row-gap-md-0 text-md-start mb-5'>
                <div className='icons'>
                  <FaCheck />
                </div>
                <div className='item_left'>
                  <h3>{t("nutritiousMeals.listThree.item_title")}</h3>
                  <p>{t("nutritiousMeals.listThree.paragraph")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
