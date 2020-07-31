import React from "react";
import { logoText, sloganText, informativeFieldType, informativeFieldId, informativeFieldText, approveButtonText } from "../../../StaticContent";
import s from "./Feedback.module.css";
import image from "../../../images/pages/feedback.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import BackButton from "../DetailedComponents/Buttons/BackButton/BackButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import ApproveButton from "../DetailedComponents/Buttons/ApproveButton/ApproveButton";
import MessageField from "../DetailedComponents/Fields/MessageField/MessageField";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";

const Feedback = (props) => {
    const uniqueId = `${informativeFieldId[2]}Second`;

    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <BackButton />
                <PageIntro logoText={logoText[5]} sloganText={sloganText[5]} />
                <form className={s.feedbackInformativeDivision}>
                    <div className={s.nameAndEmailField}>
                        <InformativeField fieldType={informativeFieldType[0]} fieldId={informativeFieldId[2]} informativeText={informativeFieldText[1]} />
                        <InformativeField fieldType={informativeFieldType[0]} fieldId={uniqueId} informativeText={informativeFieldText[0]} />
                    </div>
                    <MessageField />
                    <ApproveButton approveButtonText={approveButtonText[2]} />
                </form>
            </div>
        </div>
    )
}

export default Feedback;