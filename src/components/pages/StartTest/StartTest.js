import React, {useState} from "react";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import image from "../../../images/pages/start.png";
import CustomButton from '../DetailedComponents/Buttons/CustomButton/CustomButton';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CustomSelect from "../DetailedComponents/Buttons/CustomSelect/CustomSelect";
import {category, level, time} from "../../../StaticContent";


const StartTest = () => {

    const [data, setData] = useState({category: "", level: "", time: ""});
    const handleSubmit = (e) => {
        e.preventDefault();
        setData({category: "", level: "", time: ""});

    };
    const handleSelectChange = (e) => {
        const {name} = e.target;
        setData({...data, [name]: e.target.value});
    };

    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper">
                <CustomButton small="true" href="/back"><KeyboardBackspaceIcon/>back</CustomButton>
                <PageIntro logoText="compose" sloganText="a quiz, test your skills "/>
                <form className="informativeDivision" onSubmit={handleSubmit}>
                    <CustomSelect value={data.category} key="category" onChange={handleSelectChange} options={category}
                                  name="category"/>
                    <CustomSelect value={data.level} key="level" onChange={handleSelectChange} options={level}
                                  name="level"/>
                    <CustomSelect value={data.time} key="time" onChange={handleSelectChange} options={time}
                                  name="time"/>
                    <CustomButton type="submit">Start</CustomButton>
                </form>

            </div>
        </div>
    )

}

export default StartTest;