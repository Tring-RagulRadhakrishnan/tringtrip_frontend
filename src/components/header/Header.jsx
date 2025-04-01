import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { RiFileSearchFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/query/UserQuery";
import { userContext } from "../../App";
import { FaUser } from "../../utils/Icons";
import { LOGOUT } from "../../graphql/mutation/userMutation";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
 
  const { data } = useQuery(GET_USER, { fetchPolicy: "no-cache" });
 

  const [logout] = useMutation(LOGOUT, { fetchPolicy: "no-cache" });


  console.log(userData);
  
    setUserData(data?.getUser);

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

  const handleFaqs = () => {
    navigate("/home");
    setTimeout(() => {
      document
        .getElementById("home-faq-container")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLogout = async () => {
    try{ 
      const response = await logout();
      setUserData(null);
      if(response?.data?.logout){
        toast.error("logout Successfull")
        setUserData(null)
        navigate("/signin");
      }
    
    }
    catch(err){
      console.log("error log from logout",err);
      
    }
  };

  return (
    <div className="header-container">
      <div className="header-logo-container" onClick={()=>navigate("/home")}>
        <p className="header-logo-1 header-logo">Tring</p>
        <p className="header-logo-2 header-logo">Trip</p>
      </div>

      {userData && (
        <div className="search-bar-container">
          <RiFileSearchFill />
          <input
            type="text"
            placeholder="search to travel"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      )}

      <div className="header-navigation-page-container">
        <p onClick={() => navigate("/allpackages")}>All Packages</p>
        {userData?.role == "user" ? (
          <p onClick={() => navigate("/mybookings")}>My Bookings</p>
        ) : (
          <p onClick={() => navigate("/addpackage")}>Add Package</p>
        )}
        <p onClick={() => handleFaqs()}>Faqs</p>
      </div>

      <div>
        <FaUser className="header-user-profile-icon" onClick={handleProfile} />
        {dropDown && (
          <div className="profile-dropdown">
            {userData ? (
              <>
                <p
                  onClick={() => navigate("/profile")}
                  className="header-profile"
                >
                  Profile
                </p>
                <p
                  onClick={() => navigate("/mybookings")}
                  className="header-mybookings"
                >
                  My Bookings
                </p>
                <p onClick={() => handleLogout()} className="header-logout">
                  Logout
                </p>
              </>
            ) : (
              <>
                <p
                  onClick={() => navigate("/signin")}
                  className="header-profile"
                >
                  Sign In
                </p>
                <p
                  onClick={() => navigate("/signup")}
                  className="header-profile"
                >
                  Sign Up
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
