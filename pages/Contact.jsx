import React from "react";

import Grid from "@mui/material/Grid";

import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";

function About() {
  return (
    <div className="Contact">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
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
            variant="outlined"
            color="primary"
            href="mailto:cinekfilm@gmail.com"
          >
            <EmailIcon /> cinekfilm@gmail.com
          </Button>
          <br /> <br />
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
          <a style={{ color: "white" }} href="https://twitter.com/cinekfilm">
            <TwitterIcon />
          </a>{" "}
          <br /> <br />
          <p>
            (0362) 435 92 29 <br />
            Kale Mah. Bankalar Cad. Kuzeyhan No: 39 Kat: 3 İlkadım / Samsun
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
