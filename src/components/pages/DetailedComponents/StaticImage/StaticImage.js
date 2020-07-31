import React from "react";

const StaticImage = (props) => {
    const url = props.image;
    return (
        <div className="static-wrapper">
            <img className="img" src={url} alt="sign_in" />
        </div>
            
    )
}

export default StaticImage;