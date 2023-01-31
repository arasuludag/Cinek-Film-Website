import { Swiper, SwiperSlide } from "swiper/react";
import Posters from "./Posters.jsx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// import required modules
import { FreeMode } from "swiper";

export default function FilmsCarousel(props) {
  const posters = props.films.map((film, index) => (
    <SwiperSlide className="posterSwiperSlide" key={index}>
      <Posters
        key={index}
        image={"Posters/" + film.image}
        title={film.title}
        date={film.date}
        href={film.href}
      />
    </SwiperSlide>
  ));

  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        freeMode={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[FreeMode]}
        className="posterSwiper"
      >
        {posters}
      </Swiper>
    </>
  );
}
