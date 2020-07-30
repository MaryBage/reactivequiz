import React from "react";
import image from "../../../images/pages/start.png";
import CustomButton from '../DetailedComponents/Buttons/CustomButton/CustomButton'
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import './_StartPage.css';


const StartPage = () => {
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper-new">
                <h1 className="title">reActive</h1>
                {/*<div className="inner-container">*/}
                <p className="subtitle">becoming reactive experts</p>
                <div className="buttons">
                    <CustomButton linear>where you are</CustomButton>
                    <CustomButton linear>for trainees</CustomButton>
                    <CustomButton linear>for trainers</CustomButton>
                    <CustomButton type="submit" linear>feedback</CustomButton>

                </div>
                {/*</div>*/}

            </div>
        </div>
    )


};
export default StartPage