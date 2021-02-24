import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import NavBar from "components/NavBar";
import UrlDashboard from "components/Urls";
import RedirectToUrl from "components/RedirectToUrl";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={UrlDashboard}/>
        <Route exact path="/:slug" component={() => <RedirectToUrl/>}/>
      </Switch>
    </Router>
  );
};

export default App;
