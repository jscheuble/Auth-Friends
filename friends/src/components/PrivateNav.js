import React from "react";
import { Link } from "react-router-dom";

export default function PrivateNav() {
  return (
    <nav>
      <Link to="/logout">Logout</Link>
      <Link to="/private">Friends</Link>
    </nav>
  );
}
