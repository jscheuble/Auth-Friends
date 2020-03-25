import React from "react";

import Nav from "./Nav";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class LoginForm extends React.Component {
  state = {
    userInfo: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", this.state.userInfo)
      .then(res => {
        window.localStorage.setItem("token", JSON.stringify(res.data.payload));
        this.props.history.push("/private");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Nav />
        <h1>Welcome</h1>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.userInfo.username}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={this.state.userInfo.password}
            onChange={this.handleChange}
          />
          <button className="main-btn">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
