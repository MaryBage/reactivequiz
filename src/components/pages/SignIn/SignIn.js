import React from "react";
import image from "../../../images/pages/signin.png";
import Logo from "../Logo/Logo";
import BackButton from "../BackButton/BackButton";
import Slogan from "../Slogan/Slogan";
import Division from "../Division/Division";
import Checkbox from "../CheckBox/CheckBox";
import StaticImage from "../StaticImage/StaticImage";

const SignIn = (props) => {
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper">
                <BackButton />
                <Logo />
                <Slogan />
                <Division />
                <Checkbox/>
                <Division />
            </div>
        </div>
    )
}

export default SignIn;