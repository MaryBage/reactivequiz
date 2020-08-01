import React from "react";
import s from "./SimpleLine.module.css";

const SimpleLine = (props) => {
    return (
        <div className={s.simpleLineWrapper}>
            <div className={s.simpleLine}></div>
        </div>
    )
}

export default SimpleLine;