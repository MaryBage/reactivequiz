import React from 'react';
import s from "./PopupReset.module.css"
import EmailField from '../../pages/DetailedComponents/Fields/EmailField/EmailField';
import ApproveButton from '../../pages/DetailedComponents/Buttons/ApproveButton/ApproveButton';
import { informalFieldText, approveButtonText } from "../../../StaticContent";

const ResetPasswordPopup = (props) => {
    return (
        <div className="popup-container">
            <div className={s.resetWrapper}>
                <div className={s.popupWrapper}>
                    <h1>Forgot your password?</h1>
                    <h3>
                        Don’t worry, just enter your email address,
                        and we will send you a link to reset your password.
                    </h3>
                </div>
                <div className={s.popupWrapper}>
                    <EmailField informalText={informalFieldText[2]} />
                    <ApproveButton approveButtonText={approveButtonText[3]} />
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPopup;