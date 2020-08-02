import React, {useEffect} from 'react';
import './App.css';
import {Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import {connect} from 'react-redux';
import {setCurrentUser, logoutUser} from './redux/user/user.actions';
import StartPage from "./components/pages/StartPage/StartPage";
import About from "./components/pages/About/About";
import StartTest from "./components/pages/StartTest/StartTest";
import { Quiz } from "./components/pages/Quiz/Quiz";
import SignIn from "./components/pages/SignIn/SignIn";
import SignUp from "./components/pages/SignUp/SignUp";
import ResetPasswordPopup from "./components/popups/ResetPasswordPopup/ResetPasswordPopup";
import Feedback from "./components/pages/Feedback/Feedback";
import Popup from "./components/popups/Popup";


const App = ({setCurrentUser, currentUser, logoutUser}) => {
    useEffect(() => {
        const payload = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(payload);
    }, []);

    const handleSubmit = (data) => {
        setCurrentUser(data);
    };
    const handleLogOut = () => {
        logoutUser();
    };
    return (
        <Router>
            <>
                {/*<Route exact path="/signIn" render={() => currentUser ?*/}
                {/*    <Redirect to="/"/> :*/}
                {/*    <SignIn handleSubmit={handleSubmit}/>*/}
                {/*}/>*/}
                <Route exact path="/"><StartPage /></Route>
                <Route path="/about"><About /></Route>
                <Route path="/start_test"><StartTest /></Route>
                {/* <Route path="/quiz"><Quiz /></Route> */}
                {/* <Route path="/result"><Popup /></Route> */}
                <Route path="/signin" component={(props) => <SignIn handleSubmit={handleSubmit}/>}/>
                <Route path="/signup"><SignUp /></Route>
                {/* <Route path="/current_user"><User /></Route> */}
                <Route path="/reset_password"><ResetPasswordPopup /></Route>
                <Route path="/feedback"><Feedback /></Route>
            </>
        </Router>
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    logoutUser: () => dispatch(logoutUser()),
});
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


