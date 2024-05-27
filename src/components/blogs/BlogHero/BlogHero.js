import { useTranslations } from "next-intl";
import "./BlogHero.css";

export default function BlogHero() {
  const t = useTranslations("Blogs");

  return (
    <div className='blog_hero_section'>
      <div className='container d-flex flex-column justify-content-center align-items-center'>
        <div className='blog_hero_title'>
          <h2 className='display-6 '>{t("blogsHero.title")}</h2>
        </div>
        <div className='blog_hero_txt'>
          <p>{t("blogsHero.text")}</p>
        </div>
      </div>
    </div>
  );
}
