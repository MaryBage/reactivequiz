import React from "react";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import image from "../../../images/pages/start.png";
import CustomButton from '../DetailedComponents/Buttons/CustomButton/CustomButton';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import Select from 'react-select-2'
// Be sure to include styles at some point, probably during your bootstrapping
// import 'react-select-2/dist/css/react-select-2.css'



const StartTest = () => {
    const category = [
        { value: 'javascript', label: 'JavaScript' },
    ];
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper">
                <CustomButton small="true" href="/back"><KeyboardBackspaceIcon/>back</CustomButton>
                <PageIntro logoText="compose" sloganText="a quiz, test your skills "/>
                <div className="informalDivision">
                    <form action="">
                        <select name="" id="">

                        </select>

                    </form>
                </div>
            </div>
        </div>
    )

}

export default StartTest;