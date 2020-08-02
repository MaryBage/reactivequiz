import React from "react";
import { logoText, sloganText, approveButtonText } from "../../../StaticContent";
import image from "../../../images/pages/signup.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";
import { Link } from "react-router-dom";


const SignUp = (props) => {

    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <CustomButton small="true" component={Link} to="/signin"><KeyboardBackspaceIcon/>back</CustomButton>
                <div className="freeSpace"></div>
                <PageIntro logoText={logoText[4]} sloganText={sloganText[4]} />
                <div className="freeSpace"></div>
                <form className="informativeDivision">
                    <InformativeField 
                        type="text"
                        id="signup" 
                        name="signup"
                        placeholder="name"
                        // value={}
                    />
                    <SimpleLine />
                    <InformativeField
                        type="email"
                        id="signup-email" 
                        name="signup-name"
                        placeholder="email"
                        // value={}
                    />
                    <SimpleLine />
                    <InformativeField
                        type="password"
                        id="signup-password" 
                        name="signup-password"
                        placeholder="password"
                        // value={}
                    />
                    <CustomButton type="submit" linear="true">{approveButtonText[1]}</CustomButton>
                </form>
            </div>
        </div>
    )
}

export default SignUp;