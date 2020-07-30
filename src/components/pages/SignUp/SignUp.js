import React from "react";
import image from "../../../images/pages/signup.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import BackButton from "../DetailedComponents/Buttons/BackButton/BackButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import NameField from "../DetailedComponents/Fields/NameField/NameField";
import EmailField from "../DetailedComponents/Fields/EmailField/EmailField"
import PasswordField from "../DetailedComponents/Fields/PasswordField/PasswordField";
import ApproveButton from "../DetailedComponents/Buttons/ApproveButton/ApproveButton";


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
                <div className="informalDivision">
                    <NameField informalText={informalText[1]} />
                    <EmailField informalText={informalText[0]} />
                    <PasswordField informalText={informalText[2]} />
                    <ApproveButton approveButtonText={approveButtonText} />
                </div>
            </div>
        </div>
    )
}

export default SignUp;