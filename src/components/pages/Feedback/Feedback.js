import React from "react";
import s from "./Feedback.module.css";
import image from "../../../images/pages/feedback.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import BackButton from "../DetailedComponents/Buttons/BackButton/BackButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import InformalField from "../DetailedComponents/Fields/InformalField/InformalField";
import ApproveButton from "../DetailedComponents/Buttons/ApproveButton/ApproveButton";
import MessageField from "../DetailedComponents/Fields/MessageField/MessageField";

const Feedback = (props) => {
    const logoText = props.logoText[5];
    const sloganText = props.sloganText[5];
    const informalText = props.informalFieldText;
    const approveButtonText = props.approveButtonText[2];

    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <BackButton />
                <PageIntro logoText={logoText} sloganText={sloganText} />
                <div className={s.informalDivision}>  
                    <InformalField informalText={informalText[1]} />
                    <InformalField informalText={informalText[0]} />
                    <MessageField />
                    <ApproveButton approveButtonText={approveButtonText} />
                </div>
            </div>
        </div>
    )
}

export default Feedback;