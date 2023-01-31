// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-cards";

let images = [];
for (let i = 1; i < 6; i++) {
  images.push(`/Slides/${i}.jpg`);
}

export default function Cards() {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="cardSwiper"
    >
      {images.map((imageSRC, index) => (
        <SwiperSlide key={index} className="cardSwiperSlide">
          <Image
            src={imageSRC}
            key={index}
            width="400px"
            height="500px"
            objectFit="scale-down"
            alt={`Poster ${index}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
