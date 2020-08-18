import React, {useState} from "react";
import {logoText, sloganText, approveButtonText} from "../../../StaticContent";
import image from "../../../images/pages/studentRegister.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";
import {Link} from "react-router-dom";
import {setCurrentUser} from "../../../redux/user/user.actions";
import {connect} from "react-redux";
import axios from "axios";
import {Loader} from '../DetailedComponents/Loader/Loader';
import DelayLink from 'react-delay-link';

const StuRegister = (props) => {
    const [data, setData] = useState({displayName: '', email: ''});

    const oniInputChange = (e) => {
        const {name} = e.target;
        setData({...data, [name]: e.target.value});
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        props.history.push({
            pathname:`/quiz/${props.match.params.detail}`,
            search: `${props.location.search}&start=${Date.now()}&name=${data.displayName}&email=${data.email}`,
            hash: `${props.location.hash}`
        })
    }
    return (
        <>
            
            <div className="wrapper">
                <StaticImage image={image} anim='fromBelow'/>
                <div className="changable-wrapper fromAbove" >
                    <div style={{marginTop: 150}}>
                        <PageIntro logoText="Are you ready?" sloganText="fill the fields below and press start"/>
                    </div>
                    <form onSubmit={handleRegister} className="informativeDivision">
                       
                        <InformativeField
                            onChange={oniInputChange}
                            type="text"
                            id="signup"
                            name="displayName"
                            placeholder="name"
                            value={data.displayName}
                            required
                        />
                        <SimpleLine/>
                        <InformativeField
                            className={false ? 'incorrectInput' : ''}
                            onChange={oniInputChange}
                            type="text"
                            id="signup-email"
                            name="email"
                            placeholder="email"
                            value={data.email}
                            required
                        />
                        <CustomButton type="submit" linear="true">Start</CustomButton>
                    </form>
                </div>
            </div>
            
        </>
    )
}

export default StuRegister;