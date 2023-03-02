import React from "react";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function MediaCard(props) {
  return (
    <Card sx={{ background: "black", height: "625px" }}>
      <Image
        src={props.image}
        alt={props.title}
        width={400}
        height={550}
        objectFit="contain"
      />

      <Link href={props.href} target="_blank" underline="none" color="white">
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="p">{props.date}</Typography>
      </Link>
    </Card>
  );
}
