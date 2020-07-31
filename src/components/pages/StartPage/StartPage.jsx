import React from "react";
import image from "../../../images/pages/start.png";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import './_StartPage.css';
import Buttons from "../DetailedComponents/Buttons/CustomButton/CustomButton";

const StartPage = () => {
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper-new">
                <h1 className="title">reActive</h1>
                {/*<div className="inner-container">*/}
                <p className="subtitle">becoming reactive experts</p>
                <div className="buttons">
                    <CustomButton href="/about-us" linear="true"> where you are </CustomButton>
                    <CustomButton href="/for-trainees" linear="true">for trainees</CustomButton>
                    <CustomButton href="/for-trainers" linear="true">for trainers</CustomButton>
                    <CustomButton href="/feedback" type="submit" linear="true">feedback</CustomButton>

                </div>
                {/*</div>*/}

            </div>
        </div>
    )


};
export default StartPage