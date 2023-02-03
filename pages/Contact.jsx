import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Image from "next/image";

import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";

function About() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="Contact"
      id="Contact"
    >
      <Grid item xs={12} sm={10} lg={6} sx={{ textAlign: "center" }}>
        <Image
          width={500}
          height={500}
          objectFit="contain"
          src="/Contact Photo.jpg"
          alt="iletisim-resim"
        />
      </Grid>
      <Grid style={{ textAlign: "center" }} item xs={12} sm={10} lg={5}>
        <Typography variant="h3">İLETİŞİM</Typography>
        <Button
          variant="outlined"
          color="primary"
          href="mailto:cinekfilm@gmail.com"
        >
          <EmailIcon /> cinekfilm@gmail.com
        </Button>
        <br /> <br />
        <Link
          style={{ color: "white" }}
          href="https://www.facebook.com/cinekfilm"
          target="_blank"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </Link>
        <Link
          style={{ color: "white" }}
          href="https://www.youtube.com/channel/UCAOcpcCJ753yKD9oAgvQdww"
          target="_blank"
          aria-label="Youtube"
        >
          <YouTubeIcon />
        </Link>
        <Link
          style={{ color: "white" }}
          href="https://www.instagram.com/cinek_film/"
          target="_blank"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </Link>
        <Link
          style={{ color: "white" }}
          href="https://twitter.com/cinekfilm"
          target="_blank"
          aria-label="Twitter"
        >
          <TwitterIcon />
        </Link>
        <br /> <br />
        <Typography variant="p">
          (0362) 435 92 29 <br />
          Kale Mah. Bankalar Cad. Kuzeyhan No: 39 Kat: 3 İlkadım / Samsun
        </Typography>
      </Grid>
    </Grid>
  );
}

export default About;
