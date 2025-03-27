import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { RiFileSearchFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/query/UserQuery";
import { userContext } from "../../App";

const Header = () => {
  const navigate = useNavigate();
  const {userData, setUserData} = useContext(userContext);
const [searchTerm,setSearchTerm] = useState("");
  const handleSearch  = (e)=>{
    setSearchTerm(e.target.value);
  }
  console.log(searchTerm);
const {data} = useQuery(GET_USER,{fetchPolicy:"no-cache"})
//  console.log(data);
setUserData(data?.getUser);
console.log(userData?.user_id);


  

  useEffect(()=>{
    if(searchTerm.length>0){
      setTimeout(()=>{
        navigate("/searchpackage",{state:searchTerm})
      },2000)
    }
  },[searchTerm])
  
  return (
    <div className="header-container">
      <div className="header-logo-container">
        <p className="header-logo-1 header-logo">Tring</p>
        <p className="header-logo-2 header-logo">Trip</p>
      </div>
      <div className="search-bar-container">
        <RiFileSearchFill/>
        <input type="text" placeholder="search to travel" onChange={(e)=>handleSearch(e)}/>
      </div>
      <div></div>
      
    </div>
  );
};

export default Header;
