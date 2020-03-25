import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/">Login</Link>
      <Link to="/private">Friends</Link>
    </nav>
  );
}
