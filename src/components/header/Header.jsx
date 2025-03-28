import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { RiFileSearchFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/query/UserQuery";
import { userContext } from "../../App";
import { FaUser } from "../../utils/Icons";

const Header = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  // console.log(searchTerm);
  const { data } = useQuery(GET_USER, { fetchPolicy: "no-cache" });

  // console.log("getUser",data?.getUser);
  
  //  console.log(data);
  setUserData(data?.getUser);
  // console.log(userData?.user_id);

  const handleProfile = () => {
    setDropDown((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
        
        if (!event.target.closest(".header-user-profile-icon")) {
            setDropDown(false);
        }
    };
    document.addEventListener("click", handleClickOutside);
}, []);
  useEffect(() => {
    if (searchTerm.length > 0) {
      setTimeout(() => {
        navigate("/searchpackage", { state: searchTerm });
      }, 2000);
    }
  }, [searchTerm]);

  return (
    <div className="header-container">
      <div className="header-logo-container">
        <p className="header-logo-1 header-logo">Tring</p>
        <p className="header-logo-2 header-logo">Trip</p>
      </div>
      <div className="search-bar-container">
        <RiFileSearchFill />
        <input
          type="text"
          placeholder="search to travel"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div>
        <FaUser className="header-user-profile-icon" onClick={handleProfile} />
        {dropDown && (
          <div className="profile-dropdown">
            <p onClick={() => navigate("/profile")} className="header-profile">Profile</p>
            <p onClick={()=> navigate("/mybookings")} className="header-mybookings">My Bookings</p>
            <p onClick={()=>handleLogout} className="header-logout">Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
