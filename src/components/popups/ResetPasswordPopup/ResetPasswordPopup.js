import React from 'react';
import { informativeFieldType, informativeFieldId, informativeFieldText, approveButtonText } from "../../../StaticContent";
import s from "./PopupReset.module.css";
import InformativeField from '../../pages/DetailedComponents/Fields/InformativeField/InformativeField';
import CustomButton from '../../pages/DetailedComponents/Buttons/CustomButton/CustomButton';

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
                <form className={s.popupWrapper}>
                    <InformativeField fieldType={informativeFieldType[0]} fieldId={informativeFieldId[3]} informativeText={informativeFieldText[2]} />
                    <CustomButton type="submit" linear="true">{approveButtonText[3]}</CustomButton>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordPopup;