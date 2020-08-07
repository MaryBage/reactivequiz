import React, {useEffect, useState} from 'react';
import './App.css';
import {Redirect, BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import {connect} from 'react-redux';
import {setCurrentUser, logoutUser} from './redux/user/user.actions';
import StartPage from "./components/pages/StartPage/StartPage";
import About from "./components/pages/About/About";
import StartTest from "./components/pages/StartTest/StartTest";
import {Quiz} from "./components/pages/Quiz/Quiz";
import SignIn from "./components/pages/SignIn/SignIn";
import SignUp from "./components/pages/SignUp/SignUp";
import ResetPasswordPopup from "./components/popups/ResetPasswordPopup/ResetPasswordPopup";
import Feedback from "./components/pages/Feedback/Feedback";
import { Quiz } from './components/pages/Quiz/Quiz';
//import PageNotFound from "./components/pages/PageNotFound/PageNotFound";
import axios from "axios"
import {makePost} from "./api";

const App = ({setCurrentUser, currentUser, logoutUser}) => {
    useEffect(() => {
        const payload = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(payload);
    }, []);

        }
        axios.post(`https://cors-anywhere.herokuapp.com/https://reactivequiz.com/api/auth.php`,
            btoa(JSON.stringify(params)))
            .then(res => {
                console.log(res.data);
                setCurrentUser(res.data);
            }).catch(e => console.log(e));
    };


    const handleLogOut = () => {
        logoutUser();
    };
    return (
        <Router>
            {
                currentUser ?
                    <Switch>
                        <Route path="/start-test" component={StartTest}/>
                        {/* <Route path="/quiz" component={Quiz} /> */}
                        {/* <Route path="/result" component={Popup} /> */}
                        {/* <Route exact path="/signin" render={() => currentUser ? <Redirect to="/"/> : <SignIn handleSubmit={handleSubmit}/> */}
                        <Route path="/reset_password" component={ResetPasswordPopup}/>
                        <Route exact path="/" component={StartPage}/>
                        <Route path="/about" component={About}/>
                        <Route path="/feedback" component={Feedback}/>
                        <Redirect to='/'/>
                        {/* <Route render={() => <PageNotFound />} /> */}
                    </Switch>
                    :
                    <Switch>
                        <Route exact path="/signIn" component={(props) => <SignIn handleSubmit={handleSubmit}/>}/>
                        <Route exact path="/signup" component={(props) => <SignUp handleRegister={handleRegister}/>}/>
                        <Route exact path="/" component={StartPage}/>
                        <Route path="/about" component={About}/>
                        <Route path="/feedback" component={Feedback}/>
                    </Switch>

            }


        </Router>
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    logoutUser: () => dispatch(logoutUser()),
});
const mapStateToProps = state => ({
    currentUser: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(App);