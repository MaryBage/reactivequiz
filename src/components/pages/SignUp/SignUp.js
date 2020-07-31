import React from "react";
import { logoText, sloganText, informativeFieldType, informativeFieldId, informativeFieldText, approveButtonText } from "../../../StaticContent";
import image from "../../../images/pages/signup.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import BackButton from "../DetailedComponents/Buttons/BackButton/BackButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import ApproveButton from "../DetailedComponents/Buttons/ApproveButton/ApproveButton";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";


const SignUp = (props) => {
    const uniqueId = `${informativeFieldId[1]}Second`;

    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <BackButton />
                <PageIntro logoText={logoText[4]} sloganText={sloganText[4]} />
                <form className="informativeDivision">
                    <InformativeField fieldType={informativeFieldType[0]} fieldId={informativeFieldId[1]} informativeText={informativeFieldText[1]} />
                    <InformativeField fieldType={informativeFieldType[0]} fieldId={uniqueId} informativeText={informativeFieldText[0]} />
                    <InformativeField fieldType={informativeFieldType[1]} fieldId={informativeFieldId[1]} informativeText={informativeFieldText[2]} />
                    <ApproveButton approveButtonText={approveButtonText[1]} />
                </form>
            </div>
        </div>
    )
}

export default SignUp;