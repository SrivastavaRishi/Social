import "./online.css";
import React from "react";
import {
  Link
} from "react-router-dom";
export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
      <Link 
          to = {user.link} 
          style={{textDecoration : 'none'}}
      >
        <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      
      <span className="rightbarUsername">{user.username}</span>
      </Link>
    </li>
  );
}
