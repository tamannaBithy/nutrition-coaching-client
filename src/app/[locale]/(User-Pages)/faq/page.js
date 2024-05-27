import FAQ from "../../../../components/FAQ/FAQ";

export const metadata = {
  title: "GigaDiet Meals | FAQ",
  description: "Frequently asked questions list",
};
export default function FAQPage() {
  return (
    <section className='container faq_section px-3 px-md-5 padding-top'>
      <FAQ />
    </section>
  );
}
