import React, {useState} from "react";
import { logoText, sloganText, approveButtonText } from "../../../StaticContent";
import image from "../../../images/pages/signup.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";
import { Link } from "react-router-dom";


const SignUp = ({handleRegister}) => {
    const [data, setData] = useState({displayName:'',email: '', password: ''});

    const oniInputChange = (e) => {
        const {name} = e.target;
        setData({...data, [name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleRegister(data);
        setData({displayName:'',email: '', password: ''});
    };

    return (
        <div className="wrapper">
            <StaticImage image={image} />
            <div className="changable-wrapper">
                <CustomButton small="true" component={Link} to="/signin"><KeyboardBackspaceIcon/>back</CustomButton>
                <PageIntro logoText={logoText[3]} sloganText={sloganText[3]} />
                <form onSubmit={onSubmit}  className="informativeDivision">
                    <InformativeField
                        onChange={oniInputChange}
                        type="text"
                        id="signup" 
                        name="displayName"
                        placeholder="name"
                        value={data.displayName}
                        required
                    />
                    <SimpleLine />
                    <InformativeField
                        onChange={oniInputChange}
                        type="text"
                        id="signup-email" 
                        name="email"
                        placeholder="email"
                        value={data.email}
                        required
                    />
                    <SimpleLine />
                    <InformativeField
                        onChange={oniInputChange}
                        type="password"
                        id="signup-password" 
                        name="password"
                        placeholder="password"
                        value={data.password}
                        required
                    />
                    <CustomButton type="submit" linear="true">{approveButtonText[1]}</CustomButton>
                </form>
            </div>
        </div>
    )
}

export default SignUp;