import React from "react";
import s from "./SignUp.module.css";
import image from "../../../images/pages/signin.png";
import ApproveButton from "../DetailedComponents/Buttons/ApproveButton/ApproveButton";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import InformalField from "../DetailedComponents/Fields/InformalField/InformalField";
import PasswordField from "../DetailedComponents/Fields/PasswordField/PasswordField";
import BackButton from "../DetailedComponents/Buttons/BackButton/BackButton";

const SignUp = (props) => {
    const logoText = props.logoText[4];
    const sloganText = props.sloganText[4];
    const informalText = props.informalFieldText;
    const approveButtonText = props.approveButtonText[1];

    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <BackButton />
                <PageIntro logoText={logoText} sloganText={sloganText} />
                <div className={s.informalDivision}>
                    <InformalField informalText={informalText[1]} />
                    <InformalField informalText={informalText[0]} />
                    <PasswordField />
                    <ApproveButton approveButtonText={approveButtonText} />
                </div>
            </div>
        </div>
    )
}

export default SignUp;