import React from "react";
import PersonCard from "./PersonCard.jsx";
import Grid from "@mui/material/Grid";
import people from "./assets/team.json";

function Ekip() {
  const team = people.map((person, index) => (
    <PersonCard
      image={"/Team/" + person.image}
      name={person.name}
      job={person.job}
      text={person.text}
      key={index}
    />
  ));

  return (
    <Grid
      id="Team"
      container
      direction="row"
      rowSpacing={10}
      justifyContent="center"
      alignItems="center"
      sx={{ margin: "100px auto" }}
    >
      {team}
    </Grid>
  );
}

export default Ekip;
