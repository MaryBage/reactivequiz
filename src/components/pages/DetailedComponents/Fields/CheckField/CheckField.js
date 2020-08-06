import React from "react";
import s from "./CheckField.module.css";
import InformativeField from "../InformativeField/InformativeField";
import { Link } from 'react-router-dom';


const CheckField = ({...props}) => {
    return (
        <div className={s.checkField}>
            <div className={s.firstInnerCheckField}>
                <InformativeField  {...props} />
                <div>remember me</div>
            </div>
            <Link to="/reset_password" className={s.secondInnerCheckField}>forgot password?</Link>
        </div>
    )
}

export default CheckField;