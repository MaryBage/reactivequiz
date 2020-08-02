import React from "react";
import { logoText, sloganText, informativeFieldType, informativeFieldId, informativeFieldText, approveButtonText } from "../../../StaticContent";
import image from "../../../images/pages/signin.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import CheckField from "../DetailedComponents/Fields/CheckField/CheckField";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";

const SignIn = (props) => {
    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <CustomButton small="true" url="/home"><KeyboardBackspaceIcon/>back</CustomButton>
                <PageIntro logoText={logoText[3]} sloganText={sloganText[3]} />
                <form className="informativeDivision">
                    <InformativeField fieldType={informativeFieldType[0]} fieldId={informativeFieldId[0]} informativeText={informativeFieldText[0]}/>
                    <SimpleLine />
                    <InformativeField fieldType={informativeFieldType[1]} fieldId={informativeFieldId[0]} informativeText={informativeFieldText[2]}/>
                    <CustomButton type="submit" linear="true">{approveButtonText[0]}</CustomButton>
                    <CheckField />
                    <CustomButton url="/register">{approveButtonText[1]}</CustomButton>
                </form>
            </div>
        </div>
    )
}

export default SignIn;