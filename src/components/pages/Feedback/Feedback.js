import React, { useState } from "react";
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
import axios from '../../../axios/axios-quiz'
import Popup from '../../popups/Popup'

const Feedback = () => {

    const [sentStatus, setSentStatus] = useState({status: false, message: ''})

    const sbmtHandler = () => {

        axios
        .post(`/feedback.php`,btoa(JSON.stringify({email: 'put email here',
                                            name: 'put name here',
                                            message: 'put message here'})))
        .then(res => {
        setSentStatus(res.data.status)})
        

    }

    return (
      <div className="wrapper">
            <StaticImage image={image} anim='fromRight' />
            <div className="changable-wrapper fromLeft">
                <CustomButton small="true" component={Link} to="/"><KeyboardBackspaceIcon/>back</CustomButton>
                <PageIntro logoText={logoText[4]} sloganText={sloganText[4]} />
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
                    <div className={s.feedbackCustomButton}>
                        <CustomButton type="submit">{approveButtonText[2]}</CustomButton>
                    </div>
                </form>
            </div>
        </div>
    
    )
}

export default Feedback;