import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import films from "../public/films.json";
import Posters from "./Posters.jsx";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 6, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const posters = films.map((film, index) => (
  <Posters
    key={index}
    image={"Posters/" + film.image}
    title={film.title}
    date={film.date}
    href={film.href}
  />
));

export default function FilmsCarousel() {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      responsive={responsive}
      infinite={true}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
    >
      {posters}
    </Carousel>
  );
}
