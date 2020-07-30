import React from "react";
import image from "../../../images/pages/signin.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import BackButton from "../DetailedComponents/Buttons/BackButton/BackButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import CheckField from "../DetailedComponents/Fields/CheckField/CheckField"
import NameField from "../DetailedComponents/Fields/NameField/NameField";
import PasswordField from "../DetailedComponents/Fields/PasswordField/PasswordField";
import ApproveButton from "../DetailedComponents/Buttons/ApproveButton/ApproveButton";

const SignIn = (props) => {
    const logoText = props.logoText[3];
    const sloganText = props.sloganText[3];
    const informalText = props.informalFieldText;
    const approveButtonText = props.approveButtonText;

    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <BackButton />
                <PageIntro logoText={logoText} sloganText={sloganText} />
                <form className="informalDivision" action="">
                    <NameField informalText={informalText[1]} />
                    <PasswordField informalText={informalText[2]} />
                    <ApproveButton approveButtonText={approveButtonText[0]} />
                    <CheckField />
                    <ApproveButton approveButtonText={approveButtonText[1]} />
                </form>
            </div>
        </div>
    )
}

export default SignIn;