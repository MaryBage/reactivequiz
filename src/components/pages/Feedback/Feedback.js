import React from "react";
import image from "../../../images/pages/feedback.png";
import StaticImage from "../StaticImage/StaticImage";
import BackButton from "../BackButton/BackButton";
import Division from "../Division/Division";
import PageIntro from "../PageIntro/PageIntro";

const Feedback = (props) => {
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper">
                <BackButton />
                <PageIntro />
                <Division />
            </div>
        </div>
    )
}

export default Feedback;