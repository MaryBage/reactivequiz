import React from "react";
import image from "../../../images/pages/signup.png";
import StaticImage from "../StaticImage/StaticImage";
import Logo from "../Logo/Logo";
import BackButton from "../BackButton/BackButton";
import Slogan from "../Slogan/Slogan";
import Division from "../Division/Division";

const SignUp = (props) => {
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper">
                <BackButton />
                <Logo />
                <Slogan />
                <Division />
            </div>
        </div>
    )
}

export default SignUp;