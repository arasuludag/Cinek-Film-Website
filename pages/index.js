import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import Navbar from "./Navbar.jsx";
import DynamicCarousels from "./DynamicCarousels.jsx";
import DynamicHero from "./DynamicHero.jsx";
import TopTenCarousel from "./TopTenCarousel.jsx";
import About from "./About.jsx";
import Team from "./Team.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Home() {
  const [homepageData, setHomepageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        const { getHomepageData } = await import('../lib/sanity');
        const data = await getHomepageData();
        setHomepageData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  if (loading) {
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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
          <CircularProgress />
        </Box>
      </div>
    );
  }

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
      <DynamicHero heroImages={homepageData?.heroImages} />
      <TopTenCarousel topTen={homepageData?.topTen} />
      <DynamicCarousels categories={homepageData?.categories} />
      <About aboutSection={homepageData?.aboutSection} />
      <Team teamMembers={homepageData?.teamMembers} />
      <Contact />
      <Footer />
    </div>
  );
}
