import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Navbar.jsx";
import FilmsCarousel from "./FilmsCarousel.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Team from "./Team.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

import documentaries from "./assets/documentaries.json";
import latest from "./assets/latest.json"
import animation from "./assets/animation.json"
import horror from "./assets/horror.json"
import comedies from "./assets/comedies.json"
import drama from "./assets/drama.json"
import action from "./assets/action.json"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cinek Film - Bağımsız Film & Animasyon Stüdyosu</title>
        <meta
          name="description"
          content="Cinek Film kısa filmler, video klip ve animasyon filmler üzerine çalışmalar yapan bir ekiptir."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/Favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/Favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>

      <Navbar />
      <Hero />
      <FilmsCarousel posters={latest} title="Yeni Çıkanlar" />
      <FilmsCarousel posters={documentaries} title="Belgeseller" />
      <FilmsCarousel posters={animation} title="Animasyon" />
      <FilmsCarousel posters={horror} title="Korku / Gerilim" />
      <FilmsCarousel posters={comedies} title="Komediler" />
      <FilmsCarousel posters={drama} title="Dramalar" />
      <FilmsCarousel posters={action} title="Aksiyon / Macera" />
      <About />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
