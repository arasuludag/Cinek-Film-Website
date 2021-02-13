import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { Element } from "react-scroll";

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

      <Element name="filmsElement" />
      <h1 style={{ margin: "20px 20px", fontWeight: "300" }}>Filmler</h1>
      <FilmsCarousel />

      <Element name="aboutUsElement" />
      <About />

      <Element name="teamElement" />
      <Team />

      <Element name="contactElement" />
      <Contact />

      <Footer />
    </div>
  );
}
