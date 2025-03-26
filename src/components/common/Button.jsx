import React from "react";
import '../../styles/global.css'

const Button = ({type,message,onClick})=>{
    return(
        <div className="button-container">
        <button className="common-button" type={type} onClick={onClick}>{message}</button>
        </div>
    )
}
export default Button;
