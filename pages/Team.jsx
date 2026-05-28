import React from "react";
import PersonCard from "./PersonCard.jsx";
import Grid from "@mui/material/Grid";
import { getImageUrl } from "../lib/sanity";

function Ekip({ teamMembers }) {
  if (!Array.isArray(teamMembers) || teamMembers.length === 0) return null;

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
      {teamMembers.map((m) => (
        <PersonCard
          image={getImageUrl(m.photo)}
          name={m.name}
          job={m.role}
          text={m.bio || ""}
          key={m._id}
        />
      ))}
    </Grid>
  );
}

export default Ekip;
