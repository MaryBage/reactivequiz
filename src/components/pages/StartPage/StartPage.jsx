import React from "react";
import StaticImage from "../StaticImage/StaticImage";
import image from "../../../images/pages/start.png";
import PageIntro from "../PageIntro/PageIntro";
import Buttons from "../Buttons/Button";
import './_StartPage.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const StartPage = () => {
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper-new">
                <h1 className="title">reActive</h1>
                <KeyboardArrowUpIcon/>
                <p className="subtitle">becoming reactive experts</p>
                <div className="buttons">
                    <Buttons buttonText="where you are"/>
                    <Buttons buttonText="where you are"/>
                    <Buttons buttonText="where you are"/>
                </div>
            </div>
        </div>
    )


};
export default StartPage