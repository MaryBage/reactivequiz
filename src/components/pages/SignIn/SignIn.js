import React, {useState} from "react";
import {logoText, sloganText} from "../../../StaticContent";
import image from "../../../images/pages/signin.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import CheckField from "../DetailedComponents/Fields/CheckField/CheckField";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";
import {Link} from 'react-router-dom';
import axios from "axios";
import {connect} from 'react-redux';
import {setCurrentUser} from "../../../redux/user/user.actions";
import {Loader} from '../DetailedComponents/Loader/Loader';

const SignIn = ({setCurrentUser}) => {
    const [data, setData] = useState({email: '', password: ''});
    const [error, setError] = useState({error: ''});
    const [loader, setLoader] = useState({loader: false});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader({loader: true})
        const params = {
            ...data,
            action: 'logIn'
        }
        axios.post(`https://cors-anywhere.herokuapp.com/https://reactivequiz.com/api/auth.php`,
            btoa(JSON.stringify(params)))
            .then(res => {
                if (res.data.message) {
                    setError({error: res.data.message})
                } else {
                    setCurrentUser(res.data);
                }
            }).catch(e => console.log(e)).finally(() => setLoader({loader: false}));
    };

    const oniInputChange = (e) => {
        const {name} = e.target;
        setData({...data, [name]: e.target.value});
    };


    return (
        <>
            {(loader.loader && <Loader/>) ||
            <div className="wrapper">
                <StaticImage image={image} anim='fromLeft'/>
                <div className="changable-wrapper fromRight">
                    <CustomButton small="true" component={Link} to="/"><KeyboardBackspaceIcon/>back</CustomButton>
                    <PageIntro logoText={logoText[2]} sloganText={sloganText[2]}/>
                    <form onSubmit={handleSubmit} className="informativeDivision">
                        <p className="error-message">{error.error}</p>
                        <InformativeField  className={error.error ? 'incorrectInput' : ''} required
                                          onChange={oniInputChange}
                                          id="email"
                                          type="email"
                                          name="email"
                                          placeholder="email"
                                          value={data.email}
                        />
                        <SimpleLine/>
                        <InformativeField required id="password"
                                          type="password"
                                          name="password"
                                          placeholder="password"
                                          onChange={oniInputChange} value={data.password}
                        />
                        <CustomButton type="submit" linear="true">sign in</CustomButton>
                        <CheckField id="remember-me" type="checkbox"/>
                        <CustomButton type="button" component={Link} to="/signup">sign up</CustomButton>
                    </form>
                </div>
            </div>
            }
        </>

    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (data) => dispatch(setCurrentUser(data)),
});


export default connect(null, mapDispatchToProps)(SignIn);