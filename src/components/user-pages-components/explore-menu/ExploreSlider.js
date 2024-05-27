"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ExportSliderContent from "./ExportSliderContent";

export default function ExploreSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    margin: 20,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <>
      <div className='container py-5'>
        <Slider {...settings} className='explore_slide'>
          <ExportSliderContent />
          <ExportSliderContent />
          <ExportSliderContent />
          <ExportSliderContent />
          <ExportSliderContent />
          <ExportSliderContent />
          <ExportSliderContent />
          <ExportSliderContent />
          <ExportSliderContent />
          <ExportSliderContent />
        </Slider>
      </div>
    </>
  );
}
