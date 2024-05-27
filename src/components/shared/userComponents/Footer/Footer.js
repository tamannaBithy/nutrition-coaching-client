"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className='footer'>
      <div className='mx-4'>
        <div className='container footer_container'>
          <div className='row row-gap-5 row-gap-lg-0'>
            <div className='col-12 col-lg-4'>
              <div className='footer_left_col'>
                <div className='footer_logo'>
                  <Image
                    src='/assets/logoOne.png'
                    alt='GigaDiet Meals Logo'
                    width={200}
                    height={200}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
                <p>{t("col1.paragraph")}</p>
              </div>
            </div>
            <div className='col-12 col-lg-8'>
              <div className='row row-gap-5 row-gap-lg-0'>
                <div className='col-12 col-lg-3'>
                  <div className='footer_heading'>
                    <h2>{t("col2.title")}</h2>
                  </div>

                  <div className='footer-item'>
                    <ul>
                      <li>
                        <Link href='/weekly-menu'>
                          {t("col2.links.weeklyMenu")}
                        </Link>
                      </li>

                      <li>
                        <Link href='/our-plans'>
                          {t("col2.links.ourPlans")}
                        </Link>
                      </li>

                      <li>
                        <Link href='/offered-menu'>
                          {t("col2.links.offeredMenu")}
                        </Link>
                      </li>

                      <li>
                        <Link href='/nutrition-coaching'>
                          {t("col2.links.nutritionCoaching")}
                        </Link>
                      </li>

                      <li>
                        <Link href='/blogs'>{t("col2.links.Blogs")}</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-12 col-lg-3'>
                  <div className='footer_heading'>
                    <h2>{t("col3.title")}</h2>
                  </div>

                  <div className='footer-item'>
                    <ul>
                      <li>
                        <Link href='/privacy-policy'>
                          {t("col3.links.PrivacyPolicy")}
                        </Link>
                      </li>

                      <li>
                        <Link href='/terms-conditions'>
                          {t("col3.links.Terms&Conditions")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-12 col-lg-3'>
                  <div className='footer_heading'>
                    <h2>{t("col4.title")}</h2>
                  </div>

                  <div className='footer-item'>
                    <ul>
                      <li>
                        <Link href='/faq'>{t("col4.links.Help&FAQ")}</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='col-12 col-lg-3'>
                  <div className='footer_heading'>
                    <h2>{t("col5.title")}</h2>
                  </div>

                  <div className='footer-item'>
                    <div className='social_media'>
                      <div className='icons'>
                        <FaFacebookF />
                      </div>
                      <div className='icons'>
                        <FaInstagram />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row footer_bottom m-0'>
        <div className='col-12'>
          <p>
            <span>{t("Copyright")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
