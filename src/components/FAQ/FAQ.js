"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useGetAllFAQsQuery } from "../../../redux/features/queries/FAQ_API";

export default function FAQ() {
  const { locale } = useParams();
  const t = useTranslations("FAQ");
  const { data, isLoading, isError } = useGetAllFAQsQuery({ lang: locale });

  //decide what to render
  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && !isError) {
    content = (
      <>
        {data?.data?.map((faq, i) => (
          <div className='accordion-item' key={i}>
            <h2 className='accordion-header' id={`${i}headingOne`}>
              <button
                className='accordion-button'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target={`#${i}collapseOne`}
                aria-expanded='true'
                aria-controls={`${i}collapseOne`}>
                {faq?.title}
              </button>
            </h2>

            <div
              id={`${i}collapseOne`}
              className='accordion-collapse collapse'
              aria-labelledby={`${i}headingOne`}
              data-bs-parent={i}>
              <div
                className='accordion-body'
                dangerouslySetInnerHTML={{
                  __html: faq?.description,
                }}></div>
            </div>
          </div>
        ))}
      </>
    );
  }
  return (
    <div className='row row-gap-5 row-gap-lg-0'>
      <div className='title mt-5'>
        <h2>{t("title")}</h2>
      </div>
      <div className='col-12'>
        <div className='left_area'>
          <div className='accordion' id='accordionExample'>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
