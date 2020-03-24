import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";

import LoginForm from "./components/LoginForm";
import FriendsList from "./components/FriendsList";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LoginForm} />
      <PrivateRoute path="/private" component={FriendsList} />
    </div>
  );
}

export default App;
