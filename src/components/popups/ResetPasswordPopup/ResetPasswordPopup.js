import React from 'react';
import { informativeFieldType, informativeFieldId, informativeFieldText, approveButtonText } from "../../../StaticContent";
import s from "./PopupReset.module.css";
import ApproveButton from '../../pages/DetailedComponents/Buttons/ApproveButton/ApproveButton';
import InformativeField from '../../pages/DetailedComponents/Fields/InformativeField/InformativeField';
import SimpleLine from '../../pages/DetailedComponents/SimpleLine/SimpleLine';

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
                    <SimpleLine />
                    <ApproveButton approveButtonText={approveButtonText[3]} />
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordPopup;