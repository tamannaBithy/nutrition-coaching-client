"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import "./DeliveryServicePlate.css";

export default function DeliveryServicePlate() {
  const { locale } = useParams();
  const t = useTranslations("DeliveryServicePlate");

  return (
    <section className='deliveryServicePlate py-4 py-md-0'>
      <div className='container'>
        <div className='servicePlate py-4 py-md-0 text-center'>
          <div className='content'>
            <h3>{t("title")}</h3>
            <p>{t("paragraph")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
