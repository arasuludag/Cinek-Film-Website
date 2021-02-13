import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Posters from "./Posters.jsx";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 6 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default function FilmsCarousel() {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
    >
      <Posters
        image="Posters/BEKLENMEDİK OLAYLAR - VOL1 - FİLM AFİŞ (ARALIK-2017).jpg"
        title="Beklenmedik Olaylar Vol 1"
        date="Aralık 2017"
        href="https://www.youtube.com/watch?v=4YzkFeD7XSQ"
      />

      <Posters
        image="Posters/BEKLENMEDİK OLAYLAR - VOL2 - FİLM AFİŞ(MAYIS-2018).jpg"
        title="Beklenmedik Olaylar Vol 2"
        date="Mayıs 2018"
        href="https://www.youtube.com/watch?v=2t6htfsl6gE"
      />

      <Posters
        image="Posters/BEKLENMEDİK OLAYLAR - VOL3 - FİLM AFİŞ (EYLÜL-2019).jpg"
        title="Beklenmedik Olaylar Vol 3"
        date="Eylül 2019"
        href="https://www.youtube.com/watch?v=Fsuvv0uaknc"
      />

      <Posters
        image="Posters/ÇIKIŞ - FİLM AFİŞ (EKİM-2017).jpg"
        title="Çıkış"
        date="Ekim 2017"
        href="https://www.youtube.com/watch?v=KttRuK4avys"
      />
      <Posters
        image="Posters/KAÇIŞ - FİLM AFİŞ (EKİM-2017).jpg"
        title="Kaçış"
        date="Ekim 2017"
        href="https://www.youtube.com/watch?v=xk_HTyjNH68"
      />

      <Posters
        image="Posters/KAÇIŞ 2 - FİLM AFİŞ (OCAK-2018).jpg"
        title="Kaçış 2"
        date="Ocak 2018"
        href="https://www.youtube.com/watch?v=350tj4TnLJs"
      />
      <Posters
        image="Posters/KARANLIKTA KALAN HİKAYELER - FİLM AFİŞ ( EKİM-2017).jpg"
        title="Karanlıkta Kalan Hikayeler"
        date="Ekim 2017"
        href="https://www.youtube.com/watch?v=vlU0mFt2MCw"
      />
      <Posters
        image="Posters/KUYRUK - FİLM AFİŞİ (EKİM-2020).jpg"
        title="Kuyruk"
        date="Ekim 2020"
        href="https://www.youtube.com/watch?v=tMqWpQBv2zA"
      />
      <Posters
        image="Posters/Onüç - FİLM AFİŞ (EKİM-2018).jpg"
        title="Onüç"
        date="Ekim 2018"
        href="https://www.youtube.com/watch?v=CMltMZSISK4"
      />
      <Posters
        image="Posters/SESSİZLER KÖYÜ - FİLM AFİŞ (MAYIS-2018) .jpg"
        title="Sessizler Köyü"
        date="Mayıs 2018"
        href="https://www.youtube.com/watch?v=54Yo2eee9CU"
      />
      <Posters
        image="Posters/SEYYAH - FİLM AFİŞ (NİSAN-2016).jpg"
        title="Seyyah"
        date="Nisan 2016"
        href="https://www.youtube.com/watch?v=qEF_EVN6mmg"
      />

    </Carousel>
  );
}
