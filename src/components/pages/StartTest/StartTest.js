import React, {useState} from "react";
import { logoText, sloganText, selectFieldText, approveButtonText, category } from "../../../StaticContent";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import image from "../../../images/pages/pass.png";
import CustomButton from '../DetailedComponents/Buttons/CustomButton/CustomButton';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CustomSelect from "../DetailedComponents/Buttons/CustomSelect/CustomSelect";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";
import { Link } from "react-router-dom";
import { Quiz } from "../Quiz/Quiz";
// import Select from 'react-select-2'
// Be sure to include styles at some point, probably during your bootstrapping
// import 'react-select-2/dist/css/react-select-2.css'


const StartTest = () => {

    const [data, setData] = useState({quiz: false, category: "", level: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({quiz: true, category: "put category here", level: "put level here"});

    };
    const handleSelectChange = (e) => {
        const {name} = e.target;
        setData({...data, [name]: e.target.value});
    };

    return (
        
        //  կախված պայմանից նկարում ես <Quiz {...data} />
        <div className="wrapper">
            <StaticImage image={image} anim='fromBelow'/>
            <div className="changable-wrapper fromAbove">
                <CustomButton small="true" component={Link} to="/"><KeyboardBackspaceIcon/>back</CustomButton>
                <PageIntro logoText={logoText[1]} sloganText={sloganText[1]}/>
                <div className="informativeDivision">
                    <CustomSelect options={category} name="category" selectfieldtext={selectFieldText[0]} />
                    <SimpleLine />
                    <CustomSelect options={category} name="category" selectfieldtext={selectFieldText[1]} />
                    <CustomButton type="submit" linear="true">{approveButtonText[4]}</CustomButton>
                </div>
            </div>
        </div>
    )
}

export default StartTest;