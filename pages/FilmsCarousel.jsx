import { Swiper, SwiperSlide } from "swiper/react";
import Posters from "./Posters.jsx";
import Typography from "@mui/material/Typography";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Navigation } from "swiper";

const posters = (posters) =>
  posters.map((film, index) => (
    <SwiperSlide className="posterSwiperSlide" key={index}>
      <Posters
        key={index}
        image={"/Posters/" + film.image}
        title={film.title}
        date={film.date}
        href={film.href}
      />
    </SwiperSlide>
  ));

export default function FilmsCarousel(props) {
  return (
    <div style={{ margin: "50px auto" }}>
      <Typography id={props.title} variant="h3" sx={{ margin: "10px 15px" }}>
        {props.title}
      </Typography>
      <Swiper
        navigation={true}
        slidesPerView={"auto"}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        className="posterSwiper"
      >
        {props.posters && posters(props.posters)}
      </Swiper>
    </div>
  );
}
