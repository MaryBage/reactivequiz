import React from 'react';
import './App.css';
import {Redirect, BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';
import {logoutUser} from './redux/user/user.actions';
import StartPage from "./components/pages/StartPage/StartPage";
import About from "./components/pages/About/About";
import StartTest from "./components/pages/StartTest/StartTest";
import SignIn from "./components/pages/SignIn/SignIn";
import SignUp from "./components/pages/SignUp/SignUp";
import ResetPasswordPopup from "./components/popups/ResetPasswordPopup/ResetPasswordPopup";
import Feedback from "./components/pages/Feedback/Feedback";


const App = ({currentUser, logoutUser}) => {

    const handleLogout = () => {
        logoutUser();
    }
    return (
        <Router>
            {
                currentUser ?
                <Switch>
                    <Route exact path="/" component={StartPage}/>
                    <Route path="/about" component={About}/>
                    <Route path="/start-test" component={StartTest}/>
                    <Route path="/feedback" component={Feedback}/>
                    <Redirect to='/'/>

                 </Switch>
                :
                <Switch>
                    <Route exact path="/" component={StartPage}/>
                    <Route path="/about" component={About}/>
                    <Route path="/start-test" component={StartTest}/>
                    <Route exact path="/signIn" component={SignIn}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route path="/reset_password" component={ResetPasswordPopup}/>
                    <Route path="/feedback" component={Feedback}/>
                    <Redirect to='/'/>
                </Switch>

            }
        </Router>
    )
}

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
});
const mapStateToProps = state => ({
    currentUser: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(App);