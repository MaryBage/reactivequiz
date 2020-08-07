import React,{useState} from "react";
import './_StartPage.css';
import { logoText, sloganText, informativeButtonText } from "../../../StaticContent";
import image from "../../../images/pages/start.png";
import arrow from "../../../images/arrow/arrowup.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import {Link} from "react-router-dom"
// import { MemoryRouter as Router } from 'react-router';
// import { Link as RouterLink } from 'react-router-dom';


const StartPage = () => {
   
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper-custom">
                <div className="innerWrapper">
                    <div className="logo">reActive</div>
                    <div className="arrow">
                        <img src={arrow} alt="img"/>
                    </div>
                    <div className="slogan">becoming reactive experts</div>
                    <div className="buttons">
                        <CustomButton component={Link} to="/about" linear="true">{informativeButtonText[0]}</CustomButton>
                        <CustomButton component={Link} to="/start_test" linear="true">{informativeButtonText[1]}</CustomButton>
                        <CustomButton component={Link} to="/signin" linear="true">{informativeButtonText[2]}</CustomButton>
                        <CustomButton component={Link} to="/feedback" linear="true">{informativeButtonText[3]}</CustomButton>
                    </div>
                </div>
<<<<<<< HEAD
                <div className="arrow">
                    <img src={arrow} alt="img"/>
                </div>
                <div>
                    <PageIntro logoText={""} sloganText={sloganText[0]} />
                </div>
                        <div className="buttons">
                            
                            <CustomButton component={Link} to="/about" linear="true">{informativeButtonText[0]}</CustomButton>
                            <CustomButton component={Link} to="/start_test" linear="true">{informativeButtonText[1]}</CustomButton>
                            <CustomButton component={Link} to="/signin" linear="true">{informativeButtonText[2]}</CustomButton>
                            <CustomButton component={Link} to="/feedback" linear="true">{informativeButtonText[3]}</CustomButton>
                       
                       
                          
                        </div>
=======
>>>>>>> 7dea1227fe4fe4ee07a084080d7df81a0ebbc682
                <footer><small>&copy; Copyright 2020, Reactive</small></footer> 
            </div>
        </div>
    )
}

export default StartPage;