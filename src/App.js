import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./components/home";
import Upload from "./components/upload";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/not-found" exact component={NotFound} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
