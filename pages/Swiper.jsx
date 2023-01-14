// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

let images = [];
for (let i = 1; i < 6; i++) {
  images.push(`Slides/${i}.jpg`);
}

// import required modules
import { EffectCards } from "swiper";

export default function Cards() {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper"
    >
      {images.map((imageSRC) => (
        <SwiperSlide>
          <img src={imageSRC} alt="Örnek fotoğraflar" width="450px"></img>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
