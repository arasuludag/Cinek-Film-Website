import React from "react";

import Grid from "@material-ui/core/Grid";

import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";

function About() {
  return (
    <div className="Contact">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={10} lg={6}>
          <img
            className="ContactPhoto"
            src="Contact Photo.jpg"
            alt="iletisim-resim"
          />
        </Grid>
        <Grid style={{ textAlign: "center" }} item xs={12} sm={10} lg={5}>
          <h1 style={{ fontWeight: "300", margin: "25px 0" }}>İLETİŞİM</h1>
          <Button
            variant="outlined" color="primary"
            href="mailto:cinekfilm@gmail.com"
          >
            <EmailIcon /> cinekfilm@gmail.com
          </Button>
          <br /> <br/>
          <a
            style={{ color: "white" }}
            href="https://www.facebook.com/cinekfilm"
          >
            <FacebookIcon />
          </a>
          <a
            style={{ color: "white" }}
            href="https://www.youtube.com/channel/UCAOcpcCJ753yKD9oAgvQdww"
          >
            <YouTubeIcon />
          </a>
          <a
            style={{ color: "white" }}
            href="https://www.instagram.com/cinek_film/"
          >
            <InstagramIcon />
          </a>

          <a
            style={{ color: "white" }}
            href="https://twitter.com/cinekfilm"
          >
            <TwitterIcon />
          </a> <br/> <br/>
        <p>(0362) 435 92 29 <br/>
Kale Mah. Bankalar Cad. Kuzeyhan No: 39 Kat: 3 İlkadım / Samsun</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
