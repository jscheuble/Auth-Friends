import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class FriendsList extends React.Component {
  state = {
    friends: []
    // addFriend: {
    //     name: '',
    //     age: '',
    //     email: '',
    //     id: Date.now()
    // }
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

  componentDidMount() {
    this.fetchFriends();
  }

  render() {
    return <div></div>;
  }
}

export default FriendsList;
