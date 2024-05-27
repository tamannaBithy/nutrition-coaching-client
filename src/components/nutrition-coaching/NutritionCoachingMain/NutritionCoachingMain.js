import Image from "next/image";
import ChooseAppointment from "../ChooseAppointment/ChooseAppointment";
import NutritionBanner from "../NutritionBanner/NutritionBanner";

export default function NutritionCoachingMain() {
  return (
    <>
      <NutritionBanner />

      <div className='nutrition_coaching_section'>
        <div className='container nutrition_main_box'>
          <div className='logo_box display-4 text-center'>
            <Image
              src='/assets/logoOne.png'
              alt='GigaDiet Meals Logo'
              width={300}
              height={200}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>

          <ChooseAppointment />
        </div>
      </div>
    </>
  );
}
