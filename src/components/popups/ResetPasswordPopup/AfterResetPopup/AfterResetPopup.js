import React from 'react';
import s from "./AfterResetPopup.module.css";
import CustomButton from "../../../pages/DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link } from 'react-router-dom';

const AfterResetPopup = (props) => {
    return (
        <div className="popup-container">
            <div className={s.afterResetWrapper}>
                <div className={s.afterResetTextWrapper}>
                    <h1>Success!</h1>
                    <h3>
                        Password reset request was sent successfully.<br></br>
                        Please check your email to reset your password.
                    </h3>
                    <CustomButton small="true" component={Link} to="/signin"><KeyboardBackspaceIcon/>back</CustomButton>
                </div>
            </div>
        </div>
    )
}

export default AfterResetPopup;