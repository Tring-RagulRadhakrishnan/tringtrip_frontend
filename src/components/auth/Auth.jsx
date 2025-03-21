import React from 'react'
import { Outlet } from 'react-router-dom'
import travelImg from '../../assets/Auth_img.jpg';
const Auth = () => {
  return (
    <div className="signup-outer-con">
    <div className="signup-con1">
      <img src={travelImg} alt="" />
      <Outlet/>
    </div>
  </div>
  )
}

export default Auth