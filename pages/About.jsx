import React from "react";
import Grid from "@mui/material/Grid";
import Swiper from "./Swiper";

function About() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="About"
    >
      <Grid item xs={12} sm={10} lg={6}>
        <h1 style={{ fontWeight: "300" }}>HAKKINDA</h1>
        <p>
          Cinek Film 2015 yılında Atakan Karabulut tarafından Gazimağusa da
          kuruldu. Kısa filmler üzerine çalışmalar yapmaya başlayan ekip daha
          sonra video klip ve animasyon filmler üzerine de çalışmalar yaptı. Bu
          alanlarda sürekli kendini geliştirmeyi hedefleyen Cinek Film
          çalışmalarına devam etmektedir.
        </p>
      </Grid>
      <Grid item xs={10} sm={10} lg={6}>
        <Swiper />
      </Grid>
    </Grid>
  );
}

export default About;
