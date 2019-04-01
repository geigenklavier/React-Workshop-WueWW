import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Index } from "./Pages/Index";
import { Posts } from "./Pages/Posts";
import { CreatePost } from "./Pages/CreatePost";

import { createMuiTheme, Paper, MenuList } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";

function useNavHandler(target, setStatus) {
  return React.useCallback(
    function(event) {
      event.preventDefault();
      setStatus(target);
    },
    [target, setStatus]
  );
}

function App() {
  return (
    <div className="App">
      <MenuList className="nav">
        <Link to="/">Startseite</Link>
        <Link to="/posts"> Beiträge</Link>
        <Link to="/createPost">Neuer Beitrag</Link>
      </MenuList>
      <main>
        <Switch>
          <Route path="/posts" component={Posts} />
          <Route path="/createPost" component={CreatePost} />
          <Route path="/" component={Index} />
        </Switch>
      </main>
    </div>
  );
}

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  rootElement
);
