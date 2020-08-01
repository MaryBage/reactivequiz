import React from "react";
import { logoText, sloganText, informativeFieldType, informativeFieldId, informativeFieldText, approveButtonText } from "../../../StaticContent";
import image from "../../../images/pages/signup.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import ApproveButton from "../DetailedComponents/Buttons/ApproveButton/ApproveButton";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";


const SignUp = (props) => {
    const uniqueId = `${informativeFieldId[1]}Second`;

    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <CustomButton small="true" href="/back"><KeyboardBackspaceIcon/>back</CustomButton>
                <div className="freeSpaceDiv"></div>
                <PageIntro logoText={logoText[4]} sloganText={sloganText[4]} />
                <div className="freeSpaceDiv"></div>
                <form className="informativeDivision">
                    <InformativeField fieldType={informativeFieldType[0]} fieldId={informativeFieldId[1]} informativeText={informativeFieldText[1]} />
                    <SimpleLine />
                    <InformativeField fieldType={informativeFieldType[0]} fieldId={uniqueId} informativeText={informativeFieldText[0]} />
                    <SimpleLine />
                    <InformativeField fieldType={informativeFieldType[1]} fieldId={informativeFieldId[1]} informativeText={informativeFieldText[2]} />
                    <SimpleLine />
                    <ApproveButton approveButtonText={approveButtonText[1]} />
                </form>
            </div>
        </div>
    )
}

export default SignUp;