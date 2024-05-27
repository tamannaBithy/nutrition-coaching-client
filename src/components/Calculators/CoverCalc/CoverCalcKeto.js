import { useTranslations } from "next-intl";

export default function CoverCalcKeto() {
  const t = useTranslations("Calculators");

  return (
    <div className='coverCalc py-4'>
      <div className='container'>
        <div className='content'>
          <h4>{t("ketoMacroClc.pageTitle")}</h4>
          <p>{t("ketoMacroClc.paragraphTxt")}</p>
        </div>
      </div>
    </div>
  );
}
