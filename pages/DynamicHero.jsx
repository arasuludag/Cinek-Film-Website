import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import { getHeroImages, getHeroImageUrl } from '../lib/sanity'

function DynamicHero({ heroImages = [] }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [localHeroImages, setLocalHeroImages] = useState(heroImages)

  useEffect(() => {
    // If heroImages are provided as props, use them
    if (heroImages && heroImages.length > 0) {
      setLocalHeroImages(heroImages)
      return
    }

    // Fallback: fetch hero images if not provided as props
    const fetchHeroImages = async () => {
      try {
        setLoading(true)
        const images = await getHeroImages()
        setLocalHeroImages(images)
      } catch (err) {
        setError(err.message)
        console.error('Failed to load hero images:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroImages()
  }, [heroImages])

  // Cycle background image every 20 seconds
  useEffect(() => {
    if (!localHeroImages.length) return;
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % localHeroImages.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [localHeroImages])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Grid
      container
      direction="row-reverse"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundImage: `url(${getHeroImageUrl(localHeroImages[currentIndex]?.image)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        minHeight: '70vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <Grid item xs={9} sm={1} lg={1} sx={{ position: 'relative', zIndex: 2 }}>
        <Grid
          style={{ margin: "0 0 50px 0" }}
          item
          container
          direction="column"
        >
          <Grid item sx={{ margin: "8px 0" }}>
            <Link
              style={{ color: "white" }}
              href="https://www.facebook.com/cinekfilm"
              target="_blank"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
          </Grid>
          <Grid item sx={{ margin: "8px 0" }}>
            <Link
              style={{ color: "white" }}
              href="https://www.youtube.com/channel/UCAOcpcCJ753yKD9oAgvQdww"
              target="_blank"
              aria-label="Youtube"
            >
              <YouTubeIcon />
            </Link>
          </Grid>
          <Grid item sx={{ margin: "8px 0" }}>
            <Link
              style={{ color: "white" }}
              href="https://www.instagram.com/cinek_film/"
              target="_blank"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
          </Grid>
          <Grid item sx={{ margin: "8px 0" }}>
            <Link
              style={{ color: "white" }}
              href="https://twitter.com/cinekfilm"
              target="_blank"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DynamicHero; 