import { useTranslations } from "next-intl";

export default function CoverCalcMacro() {
  const t = useTranslations("Calculators");

  return (
    <div className='coverCalc py-4'>
      <div className='container'>
        <div className='content'>
          <h4>{t("macroClc.pageTitle")}</h4>
          <p>{t("macroClc.paragraphTxt")}</p>
        </div>
      </div>
    </div>
  );
}
