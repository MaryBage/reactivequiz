import React, {useState} from "react";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import image from "../../../images/pages/pass.png";
import CustomButton from '../DetailedComponents/Buttons/CustomButton/CustomButton';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CustomSelect from "../DetailedComponents/Buttons/CustomSelect/CustomSelect";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";
// import Select from 'react-select-2'
// Be sure to include styles at some point, probably during your bootstrapping
// import 'react-select-2/dist/css/react-select-2.css'


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
                <CustomButton small="true" url="/home"><KeyboardBackspaceIcon/>back</CustomButton>
                <div className="freeSpaceDiv"></div>
                <PageIntro logoText={logoText[2]} sloganText={sloganText[2]}/>
                <div className="freeSpaceDiv"></div>
                <div className="informativeDivision">
                    <CustomSelect options={category} name="category" selectfieldtext={selectFieldText[0]} />
                    <SimpleLine />
                    <CustomSelect options={category} name="category" selectfieldtext={selectFieldText[1]} />
                    <SimpleLine />
                    <CustomSelect options={category} name="category" selectfieldtext={selectFieldText[2]} />
                    <CustomButton linear="true">{approveButtonText[4]}</CustomButton>
                </div>
            </div>
        </div>
    )
}

export default StartTest;