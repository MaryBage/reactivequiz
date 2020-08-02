import React from "react";
import s from "./CheckField.module.css";
import { informativeFieldType, informativeFieldId } from "../../../../../StaticContent";
import InformativeField from "../InformativeField/InformativeField";


const CheckField = ({...props}) => {
    return (
        <div className={s.checkField}>
            <div className={s.firstInnerCheckField}>
                <InformativeField  {...props} />
                <div>remember me</div>
            </div>
            <div className={s.secondInnerCheckField}><a href="#writeyourmailpage">forgot password?</a></div>
        </div>
    )
}

export default CheckField;