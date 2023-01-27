import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

const Banner: React.FC = () => {
  return (
    <div className="carousel w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
      >
        <SwiperSlide>
          <div id="item1" className="carousel-item w-full">
            <img src="https://placeimg.com/800/100/arch" className="w-full" />
          </div>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div id="item1" className="carousel-item w-full">
            <img src="https://placeimg.com/800/100/arch" className="w-full" />
          </div>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div id="item1" className="carousel-item w-full">
            <img src="https://placeimg.com/800/100/arch" className="w-full" />
          </div>{" "}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
