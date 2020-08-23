import React, {useState, useEffect} from "react";
import s from "./Popup.module.css";
import thanksmail from "../../images/popups/thanksmail.png";
import {popupText} from "../../StaticContent";


const PopupThks = () => {

    const [width, setWidth] = useState({
        w: window.innerWidth,
        dif: window.outerWidth - window.innerWidth,
    });

  useEffect(() => {
      const handleResize = () =>
          setWidth({
              w: window.innerWidth,
              dif: window.outerWidth - window.innerWidth,
          });
      window.addEventListener("resize", handleResize);
      return () => {
          window.removeEventListener("resize", handleResize);
      };
  });

    
    return (
        <>

        <div className="popup-container">
            <div
                className={s.popupWrapper}
                style={
                    width.w >= 800
                        ? { minWidth: "800px", gridTemplateColumns: "repeat(2, 50%)" }
                        : { minWidth: "400px", gridTemplateRows: "repeat(2, 50%)" }
                }
            >
                <div className="zoomIn">
                    <img className={s.popupImg} src={thanksmail} alt="img" />
                </div>
                <div className={`${s.popupCommonWrapper} zoomOut`}>
                    <h1>{popupText.thanksmail}</h1>
          
                            <h2>"We greatly appreciate your feedback!"</h2>
                        </div>
                    </div>
                </div>
            
        </>
    );
};


export default PopupThks