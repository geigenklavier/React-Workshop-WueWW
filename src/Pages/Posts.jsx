import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";

function fetchData() {
  return fetch(
    "https://firestore.googleapis.com/v1/projects/reactworkshop-13106/databases/(default)/documents/Post"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      return jsonData;
    });
}

export function Posts() {
  const classes = useStyles();

  const [result, setResult] = React.useState(null);

  React.useEffect(function() {
    fetchData().then(function(data) {
      setResult(data);
    });
  }, []);

  return (
    <>
      <h1>Beiträge</h1>
      <div>
        {result &&
          result.documents.map(function(document) {
            return (
              <Card className={classes.pos}>
                <CardContent>
                  <Typography variant="h6">
                    {document.fields.title.stringValue}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    von: {document.fields.author.stringValue}
                  </Typography>
                  <Typography component="p" className={classes.content}>
                    {document.fields.text.stringValue}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </>
  );
}

const useStyles = makeStyles({
  pos: { margin: 20 },
  content: { margin: "20px 0 0 0" }
});
