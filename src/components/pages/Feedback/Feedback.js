import React from "react";
import { logoText, sloganText, approveButtonText } from "../../../StaticContent";
import s from "./Feedback.module.css";
import image from "../../../images/pages/feedback.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import MessageField from "../DetailedComponents/Fields/MessageField/MessageField";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import { Link } from "react-router-dom";

const Feedback = (props) => {

    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <CustomButton small="true" component={Link} to="/"><KeyboardBackspaceIcon/>back</CustomButton>
                <PageIntro logoText={logoText[5]} sloganText={sloganText[5]} />
                <form className={s.feedbackInformativeDivision}>
                    <div className={s.nameAndEmailField}>
                        <InformativeField
                            type="text"
                            id="feedback" 
                            name="feedback"
                            placeholder="name"
                            // value={}
                        />
                            <InformativeField
                            type="email"
                            id="feedback-email" 
                            name="feedback-email"
                            placeholder="email"
                            // value={}
                        />
                    </div>
                    <MessageField />
                    <div className={s.customButtonWrapper}>
                        <CustomButton type="submit">{approveButtonText[2]}</CustomButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Feedback;