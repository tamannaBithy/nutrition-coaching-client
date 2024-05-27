import AllBanners from "@/components/Dashboard/HomeBannerManage/AllBanners/AllBanners";
import "./all-banner.css";
// Metadata for the page
export const metadata = {
  title: "GigaDiet Meals | All-Banners",
  description: "",
};

/**
 * @component ManageBanner
 * @description Page for manage a banner
 * @returns {JSX.Element} The JSX representation of the ManageBanner page.
 */
export default function ManageBanner() {
  return (
    <div className='container-fluid '>
      <AllBanners />
    </div>
  );
}
