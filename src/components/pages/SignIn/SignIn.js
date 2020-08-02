import React, {useState} from "react";
import {
    logoText,
    sloganText,
    informativeFieldType,
    informativeFieldId,
    informativeFieldText,
    approveButtonText
} from "../../../StaticContent";
import image from "../../../images/pages/signin.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import CheckField from "../DetailedComponents/Fields/CheckField/CheckField";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";


const SignIn = ({handleSubmit}) => {
    const [data, setData] = useState({email: '', password: ''});
    const oniInputChange = (e) => {
        const {name} = e.target;
        setData({...data, [name]: e.target.value});
    };
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(data);
        setData({email: '', password: ''});
    };
    return (
        <div className="wrapper">
            <StaticImage image={image}/>
            <div className="changable-wrapper">
                <CustomButton small="true" href="/back"><KeyboardBackspaceIcon/>back</CustomButton>
                <PageIntro logoText={logoText[3]} sloganText={sloganText[3]}/>

                <form onSubmit={onSubmit} className="informativeDivision">
                    <InformativeField required onChange={oniInputChange} id="email" type="email" name="email"
                                      placeholder="email"
                                      value={data.email}/>
                    <SimpleLine />
                    <InformativeField required id="password" type="password" name="password" placeholder="password"
                                      onChange={oniInputChange} value={data.password}/>
                    <SimpleLine />
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CheckField id="remember-me" type="checkbox"/>
                    <CustomButton type="button" href="/sign-up">Sign Up</CustomButton>
                </form>


            </div>
        </div>
    )
}

export default SignIn;