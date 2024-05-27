// import LayOut from "@/components/MainMenu/LayOut";

import OfferedMenu from "@/components/Offered-Menu/OfferedMenu";

export const metadata = {
  title: "Nutrition-Coaching | Offered Menu",
  description: "",
};
export default function page() {
  return (
    <div className='padding-top'>
      <OfferedMenu />
    </div>
  );
}
