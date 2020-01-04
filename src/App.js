import React from "react";
import { Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import { createBrowserHistory as createHistory } from "history";
import "./App.css";
import TopBar from "./TopBar";
import "./TopBar.css";
import FeedPage from "./FeedPage";
import SearchPage from "./SearchPage";

const history = createHistory();
function App({ feedsStore }) {
  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route 
          path="/Search"
          exact
          component={props => <SearchPage {...props} feedsStore={feedsStore} />}
        />
        <Route
          path="/"
          exact
          component={props => <HomePage {...props} feedsStore={feedsStore} />}
        />
        <Route
          path="/feed"
          exact
          component={props => <FeedPage {...props} feedsStore={feedsStore} />}
        />
      </Router>
    </div>
  );
}
export default App;