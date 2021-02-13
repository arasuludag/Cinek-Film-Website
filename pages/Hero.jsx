import React from "react";

import Grid from "@material-ui/core/Grid";

import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

function Hero() {
  return (
    <div className="Hero">
      <Grid
        className="HeroGrid"
        container
        direction="row-reverse"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={9} sm={1} lg={1}>
          <Grid
            style={{ margin: "0 0 50px 0" }}
            item
            container
            direction="column"
          >
            <Grid item style={{margin:"8px 0"}}>
              <a
                style={{ color: "black" }}
                href="https://www.facebook.com/cinekfilm"
              >
                <FacebookIcon />
              </a>
            </Grid>
            <Grid item style={{margin:"8px 0"}}>
              <a
                style={{ color: "black" }}
                href="https://www.youtube.com/channel/UCAOcpcCJ753yKD9oAgvQdww"
              >
                <YouTubeIcon />
              </a>
            </Grid>
            <Grid item style={{margin:"8px 0"}}>
              <a
                style={{ color: "black" }}
                href="https://www.instagram.com/cinek_film/"
              >
                <InstagramIcon />
              </a>
            </Grid>
            <Grid item style={{margin:"8px 0"}}>
              <a
                style={{ color: "black" }}
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
