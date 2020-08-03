import React from "react";
import s from "./PageNotFound.module.css";
import image from "../../../images/pages/PageNotFound.png";

const PageNotFound = (props) => {
    const url = image;

    return (
        <div>
            <div className={s.PageNotFoundCenterer}>
                <img src={url} alt="img" />
            </div>
        </div>
    )
}

export default PageNotFound;