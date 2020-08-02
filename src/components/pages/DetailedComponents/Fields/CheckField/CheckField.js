import React from "react";
import s from "./CheckField.module.css";
import { informativeFieldType, informativeFieldId } from "../../../../../StaticContent";
import InformativeField from "../InformativeField/InformativeField";
import { Link } from 'react-router-dom';


const CheckField = (props) => {

    return (
        <div className={s.checkField}>
            <div className={s.firstInnerCheckField}>
                <InformativeField fieldType={informativeFieldType[2]} fieldId={informativeFieldId[0]} />              
                <div>remember me</div>
            </div>
            <Link to="/resetpassword" className={s.secondInnerCheckField}>forgot password?</Link>
        </div>
    )
}

export default CheckField;