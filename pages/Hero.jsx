import React from "react";

import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

function Hero() {
  return (
    <Grid
      className="Hero"
      container
      direction="row-reverse"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={9} sm={1} lg={1}>
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

export default Hero;
