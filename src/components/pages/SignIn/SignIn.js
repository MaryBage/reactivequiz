import React from "react";
import s from "./SignIn.module.css"
import image from "../../../images/pages/signin.png";
import ApproveButton from "../DetailedComponents/Buttons/ApproveButton/ApproveButton";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import InformalField from "../DetailedComponents/Fields/InformalField/InformalField";
import PasswordField from "../DetailedComponents/Fields/PasswordField/PasswordField";
import CheckField from "../DetailedComponents/Fields/CheckField/CheckField"
import BackButton from "../DetailedComponents/Buttons/BackButton/BackButton";

const SignIn = (props) => {
    const logoText = props.logoText[3];
    const sloganText = props.sloganText[3];
    const informalText = props.informalFieldText[0];
    const approveButtonText = props.approveButtonText;

    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <BackButton />
                <PageIntro logoText={logoText} sloganText={sloganText} />
                <div className={s.informalDivision}>
                    <InformalField informalText={informalText} />
                    <PasswordField />
                    <ApproveButton approveButtonText={approveButtonText[0]} />
                </div>
                <CheckField />
                <ApproveButton approveButtonText={approveButtonText[1]} />
            </div>
        </div>
    )
}

export default SignIn;