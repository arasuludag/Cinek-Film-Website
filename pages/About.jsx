import React from "react";

import Grid from "@material-ui/core/Grid";

function About() {
  return (
    <div className="About">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={10} lg={6}>
          <h1 style={{ fontWeight: "300" }}>HAKKINDA</h1>
          <p>
            Cinek Film 2015 yılında Atakan Karabulut tarafından Gazimağusa da kuruldu. Kısa filmler üzerine çalışmalar yapmaya başlayan ekip daha sonra video klip ve animasyon filmler üzerine de çalışmalar yaptı. Bu alanlarda sürekli kendini geliştirmeyi hedefleyen Cinek Film çalışmalarına devam etmektedir.
          </p>
        </Grid>
        <Grid item xs={12} sm={10} lg={6}>
          <img
            className="AboutPhoto"
            src="About Photo.jpg"
            alt="hakkimizda-resim"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
