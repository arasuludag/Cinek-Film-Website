import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "0 10px",
  },
  media: {
    height: 0,
    paddingTop: "141.5%", // 16:9
  },
  content: {
    backgroundColor: "black",
    color: "white",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      onClick={() => {
        window.open(props.href);
      }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          href={props.href}
        />
        <CardContent className={classes.content}>
          <h4>{props.title}</h4>
          <p>{props.date}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
