import React, { useState } from 'react';
import { approveButtonText } from "../../../StaticContent";
import s from "./PopupReset.module.css";
import InformativeField from '../../pages/DetailedComponents/Fields/InformativeField/InformativeField';
import CustomButton from '../../pages/DetailedComponents/Buttons/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AfterResetPopup from './AfterResetPopup/AfterResetPopup';
import axios from '../../../axios/axios-quiz';
import { Loader } from "../../pages/DetailedComponents/Loader/Loader";

const ResetPasswordPopup = (props) => {

    const [status, setStatus] = useState({ status: false, message: "" });
    const [value, setValue] = useState("");
    const [loader, setLoader] = useState(false);

    const onInputChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const onSubmitClick = (e) => {
        e.preventDefault();
        setLoader(true);
        axios
        .post(`/reset.php`, btoa(JSON.stringify(
            {
                email: value,
            }
        )))
        .then(res => {
            console.log(res.data);
            setStatus({ ...res.data });
            setLoader(false);
        });
    }

    return (
        <>
            {loader ? <Loader /> :
                status.status ? <AfterResetPopup /> :
                <div className="popup-container">
                    <div className={s.resetWrapper}>
                        <CustomButton small="true" component={Link} to="/signin"><KeyboardBackspaceIcon />back</CustomButton>
                        <div className={s.popupWrapper}>
                            <h1>Forgot your password?</h1>
                            <h3>
                                Don’t worry, just enter your email address, and we will send you a link to reset your password.
                            </h3>
                        </div>
                        <form className={s.popupWrapper} onSubmit={onSubmitClick}>
                            <p className="error-message">{!status.status ? status.message : ""}</p>
                            <InformativeField className={!status.status && status.message == "" ? "" : "incorrectInput"} required
                                type="text"
                                id="reset"
                                name="reset"
                                placeholder="email"
                                value={value}
                                onChange={onInputChange}
                            />
                            <CustomButton type="submit" small="true" linear="true">{approveButtonText[3]}</CustomButton>
                        </form>
                    </div>
                </div>
            }

        </>
    )
}

export default ResetPasswordPopup;