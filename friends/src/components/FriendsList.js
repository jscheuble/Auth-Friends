import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Nav from "./Nav";

class FriendsList extends React.Component {
  state = {
    friends: [],
    addFriend: {
      name: "",
      age: "",
      email: "",
      id: Date.now()
    }
  };

  fetchFriends = () => {
    axiosWithAuth()
      .get("/api/friends")
      .then(res => {
        this.setState({
          friends: res.data
        });
        console.log(this.state.friends);
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    this.setState({
      addFriend: {
        ...this.state.addFriend,
        [e.target.name]: e.target.value
      }
    });
  };

  addNewFriend = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/friends", this.state.addFriend)
      .then(res => {
        this.setState({ friends: res.data });
      })
      .catch(err => console.log(err));
  };

  deleteFriend = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`/api/friends/${id}`)
      .then(res => {
        this.setState({
          friends: res.data.filter(friend => friend.id !== id)
        });
      });
  };

  componentDidMount() {
    this.fetchFriends();
  }

  render() {
    return (
      <>
        <Nav />
        <form onSubmit={this.addNewFriend}>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="age"
            placeholder="age"
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            onChange={this.handleChange}
          />
          <button type="submit">add new friend</button>
        </form>
        <div>
          {this.state.friends.map(friend => {
            return (
              <div className="friend" key={friend.id}>
                <p>Name: {friend.name}</p>
                <p>Age: {friend.age}</p>
                <p>Email: {friend.email}</p>
                <button
                  className="x"
                  onClick={e => this.deleteFriend(e, friend.id)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default FriendsList;
