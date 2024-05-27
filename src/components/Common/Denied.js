"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Denied() {
  const previousPage = useRouter();
  const { locale } = useParams();

  const t = useTranslations("AccessDeniedPage");

  return (
    <div className='not-found-main'>
      <div className='content position-relative access-denied'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50'>
          <text
            x='50%'
            y='50%'
            dominant-baseline='middle'
            text-anchor='middle'
            fill='#e2e8f0'
            font-family='Arial'>
            403
          </text>
        </svg>

        <div className='item'>
          <h1>{t("heading")}</h1>
          <p>{t("description")}</p>

          <div className='w-50 mx-auto flex-row  d-md-flex align-content-center justify-content-md-around'>
            <button
              className='common-btn-l-e mb-2 mb-md-0'
              onClick={() => previousPage.back()}>
              {t("backBtnText")}
            </button>
            <Link href={`/${locale}`}>
              <button className='common-btn-l-e'>{t("homeBtnText")}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
