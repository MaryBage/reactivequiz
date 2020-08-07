import React from "react";

import "./staticImage.css";
const StaticImage = (props) => {
    const url = props.image;
    return (
      
             <div className="static-wrapper">
            <img className="img" src={url} alt="img" />
        </div>
        
        
            
    )
}

export default StaticImage;