import React from "react";
import image from "../../../images/pages/signin.png";
import BackButton from "../BackButton/BackButton";
import Division from "../Division/Division";
import Checkbox from "../CheckBox/CheckBox";
import StaticImage from "../StaticImage/StaticImage";
import PageIntro from "../PageIntro/PageIntro";

const SignIn = (props) => {
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper">
                <BackButton />
                <PageIntro sloganAndLogo={props}/>
                <Division />
                <Checkbox/>
                <Division />
            </div>
        </div>
    )
}

export default SignIn;