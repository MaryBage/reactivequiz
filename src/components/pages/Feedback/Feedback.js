import React, { useState } from "react";
import { logoText, sloganText, approveButtonText } from "../../../StaticContent";
import s from "./Feedback.module.css";
import image from "../../../images/pages/feedback.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
// import MessageField from "../DetailedComponents/Fields/MessageField/MessageField";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import { Link } from "react-router-dom";
import axios from '../../../axios/axios-quiz'
import Popup from '../../popups/Popup'
import { Loader } from "../DetailedComponents/Loader/Loader";


const Feedback = () => {

    const [sentStatus, setSentStatus] = useState({ status: false, message: '' })
    const [fieldsValue, setFieldsValue] = useState({ fName: '', fEmail: '', message: '' })
    const [error, setError] = useState('')
    const [loader,setLoader] = useState(false)

    const sbmtHandler = (e) => {
        e.preventDefault()
        
        const allFieldsFilled = Object.values(fieldsValue).every(e => e)

        if (allFieldsFilled) {
            setLoader(true)
            axios
                .post(`/feedback.php`, btoa(JSON.stringify({
                    ...fieldsValue
                })))
                .then(res => {
                    console.log(res.data)
                    if(!res.data.status) setError(res.data.message)
                    setSentStatus({ ...res.data })
                    setLoader(false)
                })
        } else {
            setError('Please fill all fields');
        }

    }

    const onFieldChange = (e) => {
        e.preventDefault()
        setFieldsValue({ ...fieldsValue, [e.target.name]: e.target.value })
    }

    return (

        <>  {loader ? <Loader /> :
            sentStatus.status ? <Popup /> :
                <div className="wrapper">
                    <StaticImage image={image} anim='fromRight' />
                    <div className="changable-wrapper fromLeft">
                        <CustomButton small="true" component={Link} to="/"><KeyboardBackspaceIcon />back</CustomButton>
                        <PageIntro logoText={logoText[4]} sloganText={sloganText[4]} />
                        <form onSubmit={sbmtHandler} className={s.feedbackInformativeDivision}>
                            <p className="error-message">{error}</p>
                            <div className={s.nameAndEmailField}>
                                <InformativeField onBlur={onFieldChange}
                                    type="text"
                                    id="feedback-name"
                                    name="fName"
                                    placeholder="name"

                                />
                                <InformativeField style={sentStatus.message.includes('email') ? { borderColor: '#e60000', color: '#e60000' } : {}} onBlur={onFieldChange}
                                    type="text"
                                    id="feedback-email"
                                    name="fEmail"
                                    placeholder="email"
                                />
                            </div>
                            <textarea placeholder="message" className="commonstyle" name='message' onBlur={onFieldChange} />
                            <div className={s.feedbackCustomButton}>
                                <CustomButton type="submit">{approveButtonText[2]}</CustomButton>
                            </div>
                        </form>
                    </div>
                </div>}
        </>

    )
}

export default Feedback;