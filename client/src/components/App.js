import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import BookList from "./BookList";
import NewBookForm from "./NewBookForm";
import Home from "./Home";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={Home}>
        </Route>
        <Route exact path="/books" component={BookList} />
        <Route exact path="/books/new" component={NewBookForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/users/new" component={RegistrationForm} />
      </Switch>
    </Router>
  );

};

export default hot(App);
