import React from 'react';
import harder from "../../images/popups/harder.png"
import superik from "../../images/popups/super.png"
import thanksmail from "../../images/popups/thanksmail.png"
import well from "../../images/popups/well.png"


const Popup = (props) => {

    const images=[harder,well,superik,thanksmail]

    return  (
    <div>

        <img src={images[3]} alt="aaa"/>

    </div>)


    
}

export default Popup;