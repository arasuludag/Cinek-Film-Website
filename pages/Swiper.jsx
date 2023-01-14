// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";

import "swiper/css";
import "swiper/css/effect-cards";

let images = [];
for (let i = 1; i < 6; i++) {
  images.push(`Slides/${i}.jpg`);
}

export default function Cards() {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper"
    >
      {images.map((imageSRC, index) => (
        <SwiperSlide key={index}>
          <img
            src={imageSRC}
            key={index}
            style={{ objectFit: "scale-down" }}
            width="400px"
            alt={`Poster ${index}`}
          ></img>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
