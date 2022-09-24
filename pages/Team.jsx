import React from "react";

import PersonCard from "./PersonCard.jsx";
import Grid from "@material-ui/core/Grid";

import people from "../public/team.json";

function Ekip() {
  const team = people.map((person, index) => (
    <PersonCard
      image={"Team/" + person.image}
      name={person.name}
      job={person.job}
      text={person.text}
      key={index}
    />
  ));

  return (
    <div style={{ margin: "50px auto" }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        {team}
      </Grid>
    </div>
  );
}

export default Ekip;
