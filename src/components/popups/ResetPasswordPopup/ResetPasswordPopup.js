import React from 'react';
import { approveButtonText } from "../../../StaticContent";
import s from "./PopupReset.module.css";
import InformativeField from '../../pages/DetailedComponents/Fields/InformativeField/InformativeField';
import CustomButton from '../../pages/DetailedComponents/Buttons/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AfterResetPopup from './AfterResetPopup/AfterResetPopup';

const ResetPasswordPopup = (props) => {
    return (
        // <AfterResetPopup /> onSubmit => setValue => conditional rendering
        <div className="popup-container">
            <div className={s.resetWrapper}>
            <CustomButton small="true" component={Link} to="/signin"><KeyboardBackspaceIcon/>back</CustomButton>
                <div className={s.popupWrapper}>
                    <h1>Forgot your password?</h1>
                    <h3>
                        Don’t worry, just enter your email address,
                        and we will send you a link to reset your password.
                    </h3>
                </div>
                <form className={s.popupWrapper}>
                    <InformativeField
                        type="text" 
                        id="reset"
                        name="reset" 
                        placeholder="email"
                        // onChange={onInputChange}
                        // value={}
                    />
                    <CustomButton type="submit" small="true" linear="true">{approveButtonText[3]}</CustomButton>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordPopup;