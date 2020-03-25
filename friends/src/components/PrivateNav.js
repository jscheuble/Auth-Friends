import React from "react";
import { Link, Route } from "react-router-dom";

import Logout from "./Logout";

export default function PrivateNav() {
  return (
    <nav>
      <Link to="/logout">Logout</Link>
      <Link to="/private">Friends</Link>
      <Route path="/logout" component={Logout} />
    </nav>
  );
}
