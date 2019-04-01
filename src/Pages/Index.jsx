import React from "react";

import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export function Index() {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography variant="h6">Start</Typography>
        </Toolbar>
      </AppBar>
      <Card>
        <Typography>Willkommen auf der Startseite</Typography>
      </Card>
    </>
  );
}

const useStyles = makeStyles({
  root: { margin: 0 }
});
