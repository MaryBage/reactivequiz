import React, {useState} from "react";
import {logoText, sloganText, approveButtonText} from "../../../StaticContent";
import image from "../../../images/pages/studentRegister.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";
import {connect} from "react-redux";


import {updateQuizInfo} from "../../../redux/quizInfo/quizInfo.actions";

const StuRegister = (props) => {
    const [data, setData] = useState({displayName: '', email: ''});
    const oniInputChange = (e) => {
        const {name} = e.target;
        setData({...data, [name]: e.target.value});
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        props.updateQuizInfo({userName: data.displayName, email: data.email})
        props.history.push({
            pathname: `/quiz/${props.match.params.detail}`,

        })
    }
    return (
        <>

            <div className="wrapper">
                <StaticImage image={image} anim='fromBelow'/>
                <div className="changable-wrapper fromAbove">
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


const mapDispatchToProps = dispatch => ({
    updateQuizInfo: (info) => dispatch(updateQuizInfo(info)),
});


export default connect(null, mapDispatchToProps)(StuRegister);