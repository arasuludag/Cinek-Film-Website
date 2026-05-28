import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";

import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

import { getHeroImages, getImageUrl } from "../lib/sanity";

const SOCIALS = [
  { href: "https://www.facebook.com/cinekfilm", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.youtube.com/channel/UCAOcpcCJ753yKD9oAgvQdww", label: "Youtube", Icon: YouTubeIcon },
  { href: "https://www.instagram.com/cinek_film/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://twitter.com/cinekfilm", label: "X", Icon: XIcon },
];

function DynamicHero({ heroImages = [] }) {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localHeroImages, setLocalHeroImages] = useState(heroImages);

  useEffect(() => {
    if (heroImages && heroImages.length > 0) {
      setLocalHeroImages(heroImages);
      return;
    }
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        const images = await getHeroImages();
        setLocalHeroImages(images);
      } catch (err) {
        console.error("Failed to load hero images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroImages();
  }, [heroImages]);

  useEffect(() => {
    if (!localHeroImages.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % localHeroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [localHeroImages]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  const current = localHeroImages[currentIndex];
  const bgUrl = current ? getImageUrl(current.image) : "";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "70vh", md: "85vh" },
        minHeight: { xs: 480, md: 600 },
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      {localHeroImages.map((img, i) => (
        <Box
          key={img._id || i}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${getImageUrl(img.image)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: i === currentIndex ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,1) 100%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 70%)",
          display: { xs: "none", md: "block" },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          left: { xs: 20, md: 60 },
          right: { xs: 20, md: "auto" },
          bottom: { xs: 80, md: 120 },
          maxWidth: { md: 600 },
          color: "white",
          zIndex: 2,
        }}
      >
        {current?.title && (
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.2rem", sm: "3rem", md: "4rem" },
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
            }}
          >
            {current.title}
          </Typography>
        )}
      </Box>

      {localHeroImages.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: { xs: 32, md: 56 },
            display: "flex",
            justifyContent: "center",
            gap: 1,
            zIndex: 3,
          }}
        >
          {localHeroImages.map((_, i) => (
            <Box
              key={i}
              onClick={() => setCurrentIndex(i)}
              sx={{
                width: i === currentIndex ? 28 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  i === currentIndex ? "white" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      )}

      <Box
        sx={{
          position: "absolute",
          right: { xs: 12, md: 28 },
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          zIndex: 3,
        }}
      >
        {SOCIALS.map(({ href, label, Icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            aria-label={label}
            sx={{
              color: "white",
              opacity: 0.85,
              display: "flex",
              transition: "opacity 0.2s",
              "&:hover": { opacity: 1 },
            }}
          >
            <Icon fontSize="medium" />
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default DynamicHero;
