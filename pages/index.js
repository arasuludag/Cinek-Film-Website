import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Navbar.jsx";
import FilmsCarousel from "./FilmsCarousel.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Team from "./Team.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cinek Film</title>
        <meta
          name="description"
          content="Cinek Film kısa filmler, video klip ve animasyon filmler üzerine çalışmalar yapan bir ekiptir."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/Favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/Favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar />
      <Hero />
      <h1 id="Filmler" style={{ margin: "20px 20px", fontWeight: "300" }}>
        Filmler
      </h1>
      <FilmsCarousel />
      <About />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
