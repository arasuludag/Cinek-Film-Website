import React from "react";

import Grid from "@mui/material/Grid";

import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

function Hero() {
  return (
    <div className="Hero">
      <Grid
        className="HeroGrid"
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
            <Grid item style={{ margin: "8px 0" }}>
              <a
                style={{ color: "white" }}
                href="https://www.facebook.com/cinekfilm"
              >
                <FacebookIcon />
              </a>
            </Grid>
            <Grid item style={{ margin: "8px 0" }}>
              <a
                style={{ color: "white" }}
                href="https://www.youtube.com/channel/UCAOcpcCJ753yKD9oAgvQdww"
              >
                <YouTubeIcon />
              </a>
            </Grid>
            <Grid item style={{ margin: "8px 0" }}>
              <a
                style={{ color: "white" }}
                href="https://www.instagram.com/cinek_film/"
              >
                <InstagramIcon />
              </a>
            </Grid>
            <Grid item style={{ margin: "8px 0" }}>
              <a
                style={{ color: "white" }}
                href="https://twitter.com/cinekfilm"
              >
                <TwitterIcon />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Hero;
