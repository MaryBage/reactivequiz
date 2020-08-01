import React from "react";
import './_StartPage.css';
import { logoText, sloganText } from "../../../StaticContent";
import image from "../../../images/pages/start.png";
import arrow from "../../../images/arrow/arrowup.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
// import { MemoryRouter as Router } from 'react-router';
// import { Link as RouterLink } from 'react-router-dom';


const StartPage = () => {
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper-custom">
                <div className="pageIntro-custom">
                    <PageIntro logoText={logoText[0]} sloganText={""} />
                </div>
                <div className="arrow">
                    <img src={arrow} />
                </div>
                <div>
                    <PageIntro logoText={""} sloganText={sloganText[0]} />
                </div>
                {/* <Router> */}
                    {/*<div className="inner-container">*/}
                        <div className="buttons">
                            <CustomButton href="/about" linear="true">where you are</CustomButton>
                            <CustomButton href="/for-trainees" linear="true">for trainees</CustomButton>
                            <CustomButton href="/for-trainers" linear="true">for trainers</CustomButton>
                            <CustomButton href="/feedback" type="submit" linear="true">feedback</CustomButton>
                        </div>
                    {/*</div>*/}
                {/* </Router> */}
                <footer><small>&copy; Copyright 2020, Reactive</small></footer> 
            </div>
        </div>
    )
}

export default StartPage;