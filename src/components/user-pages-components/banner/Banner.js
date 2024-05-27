"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useGetVisibleBannersQuery } from "./../../../../redux/features/queries/BANNER_API";

import "./Banner.css";

export default function Banner() {
  const { locale } = useParams();
  const t = useTranslations("BannerBtn");

  const isLoggedIn = true;

  const {
    data: banner,
    isLoading,
    isError,
  } = useGetVisibleBannersQuery({ lang: locale });
  const { banner_heading, banner_paragraph, image } = banner?.data || {};
  //Banner bg image
  const bgImage =
    image === "" || image === undefined || image === null
      ? "/assets/banner.jpg"
      : `https://nutrition-coaching.onrender.com${image}`;
  let content = null;
  if (isLoading) {
    content = (
      <>
        {" "}
        <div className='my-5 d-flex align-items-center justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </>
    );
  }
  if (!isLoading && !isError) {
    content = (
      <>
        <section
          className='banner-section'
          style={{
            background: `rgba(0, 0, 0, 0.4) url(${bgImage}) `,
          }}>
          <div
            className='container banner-container'
            dir={locale === "ar" ? "rtl" : ""}>
            <div className='row'>
              <div className='col-12 banner-content'>
                <div className='heading'>
                  <h1>{banner_heading}</h1>
                </div>
                <p>{banner_paragraph}</p>
                <Link href='/weekly-menu'>
                  <button className='banner_btn'>{t("label")}</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return <>{content}</>;
}
