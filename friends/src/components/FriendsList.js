import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import PrivateNav from "./PrivateNav";

class FriendsList extends React.Component {
  state = {
    friends: [],
    addFriend: {
      name: "",
      age: "",
      email: "",
      id: 0
    },
    isEditing: false,
    editId: ""
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
    this.setState({
      addFriend: {
        ...this.state.addFriend,
        id: Date.now()
      }
    });
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

  toggleEditing = (e, id) => {
    e.preventDefault();
    this.setState({
      isEditing: true,
      editId: id
    });
  };

  editFriend = id => {
    axiosWithAuth()
      .put(`/api/friends/:${id}`, this.state.addFriend)
      .then(res =>
        this.setState({
          friends: res.data
        })
      )
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchFriends();
  }

  render() {
    return (
      <>
        <PrivateNav />
        <form
          className="friend-form"
          onSubmit={
            this.state.isEditing
              ? this.editFriend(this.state.editId)
              : this.addNewFriend
          }
        >
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
          <button className="main-btn" type="submit">
            add new friend
          </button>
        </form>
        <div className="friend-container">
          {this.state.friends.map(friend => {
            return (
              <div className="friend" key={friend.id}>
                <p>Name: {friend.name}</p>
                <p>Age: {friend.age}</p>
                <p>Email: {friend.email}</p>
                <button
                  onClick={e => this.toggleEditing(e, friend.id)}
                  className="x"
                >
                  edit
                </button>
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
