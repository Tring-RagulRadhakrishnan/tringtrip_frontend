import React from "react";
import '../../styles/global.css'

const Button = ({type,message})=>{
    return(
        <button className="common-button" type={type}>{message}</button>
    )
}
export default Button;
