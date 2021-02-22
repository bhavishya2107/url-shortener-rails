import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import NavBar from "components/NavBar";
import UrlDashboard from "components/Urls";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={UrlDashboard} />
      </Switch>
    </Router>
  );
};

export default App;
