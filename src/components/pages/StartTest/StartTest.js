import React, { useState } from "react";
import { logoText, sloganText, selectFieldText, approveButtonText, category, level } from "../../../StaticContent";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import image from "../../../images/pages/pass.png";
import CustomButton from '../DetailedComponents/Buttons/CustomButton/CustomButton';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CustomSelect from "../DetailedComponents/Buttons/CustomSelect/CustomSelect";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";
import { Link } from "react-router-dom";
import  Quiz  from "../Quiz/Quiz";
import DelayLink from 'react-delay-link';

const StartTest = () => {

    const [data, setData] = useState({ quiz: '', category: "", level: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({ ...data, quiz: 'trainee' });
    };
    
    const handleSelectChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            {data.quiz ? <Quiz {...data} /> :
            <div className="wrapper">
                <StaticImage image={image} anim='fromBelow' />
                <div className="changable-wrapper fromAbove">
                    <DelayLink delay={700} to={"/"}>
                            <CustomButton small="true" ><KeyboardBackspaceIcon />back</CustomButton>
                    </DelayLink>
                    <div className="freeSpace" />
                    <PageIntro logoText={logoText[1]} sloganText={sloganText[1]} />
                    <div className="freeSpace" />
                    <form onSubmit={handleSubmit} className="informativeDivision">
                        <CustomSelect options={category} onChange={handleSelectChange} name="category" selectfieldtext={selectFieldText[0]} />
                        <SimpleLine />
                        <CustomSelect options={level} onChange={handleSelectChange} name="level" selectfieldtext={selectFieldText[1]} />
                        <CustomButton type="submit" linear="true">{approveButtonText[4]}</CustomButton>
                    </form>
                </div>
            </div>}
        </>
    )
}

export default StartTest;