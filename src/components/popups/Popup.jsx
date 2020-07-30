import React from 'react';
import s from "./Popup.module.css"
import harder from "../../images/popups/harder.png";
import well from "../../images/popups/well.png";
import great from "../../images/popups/great.png";
import thanksmail from "../../images/popups/thanksmail.png";

const Popup = (props) => {
    const images = [harder, well, great, thanksmail];

    return (
        <div className="popup-container">
            <div className={s.popupWrapper}>
                <div>
                    <img className="img" src={images[0]} alt="img" />
                </div>
                <div className={s.popupCommonWrapper}>
                    <h1>Well done!</h1>
                    <h2>Your result: <span>15</span> of <span>20</span></h2>
                </div>
            </div>
        </div>
    )
}

export default Popup;