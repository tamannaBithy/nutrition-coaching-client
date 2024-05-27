import Image from "next/image";
export default function ExportSliderContent() {
  return (
    <>
      <div className='explore_card card bg-dark text-white position-relative border-0'>
        <Image
          src='/assets/weeklyImg1.jpg'
          alt='weeklyImg1'
          width={100}
          height={100}
          className='explore_img'
        />
        <div className='explore_overlay'>
          <h5 className='card-title text-center explore_overlay_title'>
            Herb Cream Cheese Salmon
          </h5>
        </div>
      </div>
    </>
  );
}
