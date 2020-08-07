import React from 'react';
import s from "./Popup.module.css"
import harder from "../../images/popups/harder.png";
import well from "../../images/popups/well.png";
import great from "../../images/popups/great.png";
import thanksmail from "../../images/popups/thanksmail.png";
import { popupText } from '../../StaticContent';


const Popup = (props) => {
    const images = [harder, well, great, thanksmail];
    const total = props.totalPoint;
    const result = props.resultPoint;
    const coefficient = (result / total) * 100;
    const thanksmailText='We greatly appreciate your feedback!'
    let i;
    let text;
    if (coefficient < 50) {
        i = 0;
        text = popupText.harder;
    } else if (coefficient >= 50 && coefficient <= 80) {
        i = 1;
        text = popupText.well;
    } else if (coefficient > 80) {
        i = 2;
        text = popupText.great;
    } else {
        i = 3;
        text = popupText.thanksmail;
    }

    return (
        <div className="popup-container">
            <div className={s.popupWrapper}>
                <div>
                    <img className={s.popupImg} src={images[i]} alt="img" />
                </div>
                <div className={s.popupCommonWrapper}>
                    <h1>{text}</h1>
                        {props.resultPoint ? <h2>Your result: <span>{result}</span> of <span>{total}</span></h2> :
                    <h2>{thanksmailText}</h2>}
                </div>
            </div>
        </div>
    )
}

export default Popup;