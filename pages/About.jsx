import React from "react";
import Grid from "@mui/material/Grid";
import Swiper from "./Swiper";
import Typography from "@mui/material/Typography";

function About() {
  return (
    <Grid
      id="About"
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="About"
    >
      <Grid item xs={10} sm={10} lg={6}>
        <Typography variant="h3">HAKKINDA</Typography>
        <Typography variant="p">
          Cinek Film 2015 yılında Atakan Karabulut tarafından Gazimağusa da
          kuruldu. Kısa filmler üzerine çalışmalar yapmaya başlayan ekip daha
          sonra video klip ve animasyon filmler üzerine de çalışmalar yaptı. Bu
          alanlarda sürekli kendini geliştirmeyi hedefleyen Cinek Film
          çalışmalarına devam etmektedir.
        </Typography>
      </Grid>
      <Grid item xs={10} sm={10} lg={6}>
        <Swiper />
      </Grid>
    </Grid>
  );
}

export default About;
