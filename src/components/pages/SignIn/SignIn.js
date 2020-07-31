import React from "react";
import { logoText, sloganText, informativeFieldType, informativeFieldId, informativeFieldText, approveButtonText } from "../../../StaticContent";
import image from "../../../images/pages/signin.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import BackButton from "../DetailedComponents/Buttons/BackButton/BackButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import CheckField from "../DetailedComponents/Fields/CheckField/CheckField";
import ApproveButton from "../DetailedComponents/Buttons/ApproveButton/ApproveButton";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";

const SignIn = (props) => {
    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <BackButton />
                <PageIntro logoText={logoText[3]} sloganText={sloganText[3]} />
                <form className="informativeDivision">
                    <InformativeField fieldType={informativeFieldType[0]} fieldId={informativeFieldId[0]} informativeText={informativeFieldText[0]}/>
                    <InformativeField fieldType={informativeFieldType[1]} fieldId={informativeFieldId[0]} informativeText={informativeFieldText[2]}/>
                    <ApproveButton approveButtonText={approveButtonText[0]} />
                    <CheckField />
                    <ApproveButton approveButtonText={approveButtonText[1]} />
                </form>
            </div>
        </div>
    )
}

export default SignIn;