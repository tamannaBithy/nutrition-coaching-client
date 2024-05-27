"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import "./BlogsHero.css";

export default function BlogsHero() {
  const { locale } = useParams();
  const t = useTranslations("Blogs");

  return (
    <div className='Blogs_hero_section'>
      <div className='container d-flex flex-column justify-content-start '>
        <div className='blogs_hero_title'>
          <h2 className={`display-6 ${locale === "ar" ? "title_lang" : ""}`}>
            {t("blogsHero.title")}
          </h2>
        </div>
        <div className='blogs_hero_txt'>
          <p> {t("blogsHero.text")}</p>
        </div>
      </div>
    </div>
  );
}
