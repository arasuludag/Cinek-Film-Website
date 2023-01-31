import React from "react";
import Grid from "@mui/material/Grid";
import PersonDialog from "./PersonDialog.jsx";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Image from "next/image";

export default function MediaCard(props) {
  return (
    <Grid item xs={10} sm={5} lg={2}>
      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
      >
        <Image
          src={props.image}
          alt={props.name}
          className="Avatar"
          width={150}
          height={150}
        />
        <Typography variant="h5">{props.name}</Typography>
        <Typography variant="p">{props.job}</Typography>
        <PersonDialog name={props.name} text={props.text} />
      </Stack>
    </Grid>
  );
}
