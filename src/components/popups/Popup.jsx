import React from 'react';
import harder from "../../images/popups/harder.png";
import well from "../../images/popups/well.png";
import great from "../../images/popups/great.png";
import thanksmail from "../../images/popups/thanksmail.png";

const Popup = (props) => {
    const images = [harder, well, great, thanksmail];

    return (
        <div className="popup-container">
            <div className="popup-wrapper">
                <img src={images[0]} alt="img" />
                <div className="popup-text-wrapper">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Popup;