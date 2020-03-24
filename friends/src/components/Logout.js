import React from "react";

import Nav from "./Nav";

class Logout extends React.Component {
  logOut = () => {
    window.localStorage.removeItem("token");
  };

  componentDidMount() {
    this.logOut();
  }

  render() {
    return (
      <div>
        <Nav />
        <h1>See you later!</h1>
      </div>
    );
  }
}

export default Logout;
