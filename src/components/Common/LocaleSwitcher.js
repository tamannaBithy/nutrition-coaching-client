"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "./../../navigation";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "ar" : "en";
  const pathname = usePathname();

  return (
    <Link href={pathname} locale={otherLocale} className='nav-item nav-link'>
      {t("title", { locale: otherLocale })}: {t("lang")}
    </Link>
  );
}
