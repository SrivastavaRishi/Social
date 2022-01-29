import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  let history = useHistory();
  const Suggestions = [
    {
      _id : "61f0e770fef43777a091b2aa", 
      username : "Rohit Sharma",
      profilePicture : "person/rohit.jpg", 
      link : "/profile/Rohit%20Sharma"
    }, 
    {
      _id : "61f0e292fef43777a091b2a6", 
      username : "Virat Kohli",
      profilePicture : "person/virat.jpg", 
      link : "/profile/Virat%20Kohli"
    }, 
    {
      _id : "61f0e8fafef43777a091b2ad", 
      username : "The Rock",
      profilePicture : "person/rock.jpg", 
      link : "/profile/The%20Rock"
    }, 
    {
      _id : "61f137221668764a98b108e4", 
      username : "Rishi Srivastava",
      profilePicture : "person/rishi.jpeg",
      link : "/profile/Rishi%20Srivastava"
    }
  ]

  useEffect(() => {
    const getFriends = async () => {
      try {
        if(user){
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        //new following
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        //console.log('rightBar', user._id, currentUser._id);
        // await axios.post(`/conversations`, {
        //   senderId : user._id, 
        //   receiverId : currentUser._id
        // });
      }
      setFollowed(!followed);
      

    } catch (err) {
    }
  };

  const handleClickMessage = async() => {
    //I am currentUser
    console.log('Message Clicked!')
    console.log('user', user.username);
    console.log('currentUser', currentUser.username);
    let getID = await axios.get('/conversations/find/' + user._id + '/' + currentUser._id);
    if(getID.data == null){
      const obj = {
        senderId: user._id,
        receiverId : currentUser._id
      };
      getID = await axios.post('/conversations', obj);
    }
    console.log('getId', getID.data);

    const convID = getID.data._id;
    console.log(convID);

    const message = {
      sender: currentUser._id,
      text: "Hi",
      conversationId: convID
    };

    // socket.current.emit("sendMessage", {
    //   senderId: currentUser._id,
    //   receiverId : user._id,
    //   text: "Hi",
    // });

    try{
      const res = await axios.post("/messages", message);
      console.log(res);
    }catch(err){
      console.log(err)
    }
    
    history.push('/messenger')

  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Popular Searches </h4>
        <ul className="rightbarFriendList">          
          {Suggestions.map((u) => (
            <Online key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <>
            <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
            </button>
            <button className="rightbarFollowButton" onClick={handleClickMessage}>
            Say Hi!
            </button>
          </>
        )}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
              key = {friend._id}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
