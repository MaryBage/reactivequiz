import React from "react";
import s from "./CheckField.module.css";
import CheckBox from "./CheckBox";


const CheckField = (props) => {
    return (
        <div className={s.checkField}>
            <div className={s.checkBoxField}>
                <CheckBox />
                <div>remember me</div>
            </div>
            <div>forgot password?</div>
        </div>
    )
}

export default CheckField;