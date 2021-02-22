import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import NavBar from "components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <h1 className="text-2xl text-center">This is App.jsx</h1>
            </div>
          )}
        />
        <Route exact path="/about" render={() => <div>About</div>} />
      </Switch>
    </Router>
  );
};

export default App;
