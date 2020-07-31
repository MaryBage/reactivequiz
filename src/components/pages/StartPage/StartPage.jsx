import React from "react";
import image from "../../../images/pages/start.png";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import './_StartPage.css';
import Buttons from "../DetailedComponents/Buttons/CustomButton/CustomButton";

const StartPage = () => {
    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper-new">
                <h1 className="title">reActive</h1>
                <KeyboardArrowUpIcon />
                <p className="subtitle">becoming reactive experts</p>
                <div className="buttons">
                    <Buttons buttonText="where you are" />
                    <Buttons buttonText="where you are" />
                    <Buttons buttonText="where you are" />
                </div>
                {/*</div>*/}

            </div>
        </div>
    )
}

export default StartPage;