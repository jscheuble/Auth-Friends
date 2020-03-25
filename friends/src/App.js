import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";

import LoginForm from "./components/LoginForm";
import FriendsList from "./components/FriendsList";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LoginForm} />
      <PrivateRoute path="/private" component={FriendsList} />
      <Route path="/logout" component={Logout} />
    </div>
  );
}

export default App;
