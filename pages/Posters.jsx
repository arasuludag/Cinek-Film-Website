import React from "react";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";

export default function MediaCard(props) {
  return (
    <Card>
      <img src={props.image} style={{ width: "100%" }} />

      <Link href={props.href}>
        <h4>{props.title}</h4>
        <p>{props.date}</p>
      </Link>
    </Card>
  );
}
