import React from "react";
import s from "./CheckField.module.css";
import CheckBox from "./CheckBox";


const CheckField = (props) => {
    return (
        <div className={s.checkField}>
            <div className={s.firstInnerCheckField}>
                <CheckBox />
                <div>remember me</div>
            </div>
            <div className={s.secondInnerCheckField}><a href="#writeyourmailpage">forgot password?</a></div>
        </div>
    )
}

export default CheckField;