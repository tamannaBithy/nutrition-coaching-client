import { useTranslations } from "next-intl";
import Image from "next/image";
import "./HowItWorks.css";

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  return (
    <section className='howItWorks-section'>
      <div className='container mx-auto px-5'>
        <div className='heading'>
          <h2>{t("title")}</h2>
        </div>

        <div className='row row-gap-3 row-gap-md-3 row-gap-lg-0 justify-content-end'>
          <div className='col-12 col-md-6 col-lg-4'>
            <div className='sing-item-card'>
              <Image
                src='/assets/howItWork/meals.png'
                width={150}
                height={150}
                alt='MEAL'
              />
              <div className='content'>
                <h3>{t("cards.cardOne.title")}</h3>
                <p>{t("cards.cardOne.paragraph")}</p>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-6 col-lg-4'>
            <div className='sing-item-card'>
              <Image
                src='/assets/howItWork/cooker.png'
                width={150}
                height={150}
                alt='MEAL'
              />
              <div className='content'>
                <h3>{t("cards.cardTwo.title")}</h3>
                <p>{t("cards.cardTwo.paragraph")}</p>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-6 col-lg-4'>
            <div className='sing-item-card'>
              <Image
                src='/assets/howItWork/heater.png'
                width={150}
                height={150}
                alt='MEAL'
              />
              <div className='content'>
                <h3>{t("cards.cardThree.title")}</h3>
                <p>{t("cards.cardThree.paragraph")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
