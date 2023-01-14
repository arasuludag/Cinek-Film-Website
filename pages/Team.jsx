import React from "react";
import PersonCard from "./PersonCard.jsx";
import Grid from "@mui/material/Grid";
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
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ margin: "50px auto" }}
    >
      {team}
    </Grid>
  );
}

export default Ekip;
