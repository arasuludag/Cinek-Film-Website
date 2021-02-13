import React from "react";

import Grid from "@material-ui/core/Grid";

import PersonDialog from './PersonDialog.jsx';

export default function MediaCard(props) {
  return (
    <Grid item xs={10} sm={5} lg={2}>
        <div style={{ margin: "0 auto", height: "270px" }}>
          <img src={props.image} alt={props.name} className="Avatar" />
          <h4 style={{fontWeight: "300", textAlign:"center"}}>{props.name}</h4>
          <p style={{color: "white", textAlign:"center"}}>{props.job}</p>

        </div>
        <div >
        <PersonDialog
          name={props.name}
          text={props.text}/>
      </div>
    </Grid>
  );
}
