import Banner from "@/components/user-pages-components/banner/Banner";
import DeliveryServicePlate from "@/components/user-pages-components/delivery-service-plate/DeliveryServicePlate";
import ExploreMenu from "@/components/user-pages-components/explore-menu/ExploreMenu";
import FreshNutritious from "@/components/user-pages-components/fresh-nutritious/FreshNutritious";
import HowItWorks from "@/components/user-pages-components/how-it-works/HowItWorks";

export const metadata = {
  title: "Giga Diet Meals | Home",
  description: "Giga Diet Meals - Eat like a champion",
};

export default function Index() {
  return (
    <div className='padding-top'>
      <Banner />
      <HowItWorks />
      <FreshNutritious />
      <ExploreMenu />
      <DeliveryServicePlate />
    </div>
  );
}
