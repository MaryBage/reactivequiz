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
import BackButton from "../DetailedComponents/Buttons/BackButton/BackButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import CheckField from "../DetailedComponents/Fields/CheckField/CheckField";
import ApproveButton from "../DetailedComponents/Buttons/ApproveButton/ApproveButton";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from "@material-ui/core/SvgIcon/SvgIcon";


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
                    <InformativeField onChange={oniInputChange} value={data.email} fieldType={informativeFieldType[0]}
                                      fieldId={informativeFieldId[0]}
                                      informativeText={informativeFieldText[0]}/>
                    <InformativeField onChange={oniInputChange} value={data.password}
                                      fieldType={informativeFieldType[1]} fieldId={informativeFieldId[0]}
                                      informativeText={informativeFieldText[2]}/>
                    <ApproveButton approveButtonText={approveButtonText[0]}/>
                    <CheckField/>
                    <ApproveButton approveButtonText={approveButtonText[1]}/>
                </form>
            </div>
        </div>
    )
}

export default SignIn;