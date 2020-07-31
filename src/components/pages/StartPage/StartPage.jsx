import React from "react";
import './_StartPage.css';
import { logoText, sloganText } from "../../../StaticContent";
import image from "../../../images/pages/start.png";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
<<<<<<< HEAD
import './_StartPage.css';
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
=======
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
>>>>>>> 0e0f6cba55c7b250b3fac9904b565b6a81cb7a23

const StartPage = () => {
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper-custom">
                <div className="pageIntro-custom">
                    <PageIntro logoText={logoText[0]} sloganText={sloganText[0]} />
                </div>
                {/*<div className="inner-container">*/}
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
}

export default StartPage;