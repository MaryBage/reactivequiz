import React, {useEffect} from 'react';
import './App.css';
import {Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {connect} from 'react-redux';
import {setCurrentUser, logoutUser} from './redux/user/user.actions';
import StartPage from "./components/pages/StartPage/StartPage";
import About from "./components/pages/About/About";
import StartTest from "./components/pages/StartTest/StartTest";
import SignIn from "./components/pages/SignIn/SignIn";
import SignUp from "./components/pages/SignUp/SignUp";
import ResetPasswordPopup from "./components/popups/ResetPasswordPopup/ResetPasswordPopup";
import Feedback from "./components/pages/Feedback/Feedback";
import { Quiz } from './components/pages/Quiz/Quiz';
//import PageNotFound from "./components/pages/PageNotFound/PageNotFound";


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
<<<<<<< HEAD
   
        <Router>
            <Switch>
                    <Route exact path="/" component={StartPage} />
                    <Route path="/about" component={About} />
                    <Route path="/start_test" component={StartTest} />
                    {/* <Route path="/quiz" component={Quiz} /> */}
                    {/* <Route path="/result" component={Popup} /> */}
                    {/* <Route exact path="/signin" render={() => currentUser ? <Redirect to="/"/> : <SignIn handleSubmit={handleSubmit}/> */}
                    <Route path="/signin" component={(props) => <SignIn handleSubmit={handleSubmit}/>}/>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/reset_password" component={ResetPasswordPopup} />
                    <Route path="/feedback" component={Feedback} />
                    <Redirect to="/" />
                    {/* <Route render={() => <PageNotFound />} /> */}
            </Switch>
        </Router>

=======
        // <Router>
        //     <Switch>
        //             <Route exact path="/" component={StartPage} />
        //             <Route path="/about" component={About} />
        //             <Route path="/start_test" component={StartTest} />
        //             {/* <Route exact path="/signin" render={() => currentUser ? <Redirect to="/"/> : <SignIn handleSubmit={handleSubmit}/> */}
        //             <Route path="/signin" component={(props) => <SignIn handleSubmit={handleSubmit}/>}/>
        //             <Route path="/signup" component={SignUp} />
        //             <Route path="/reset_password" component={ResetPasswordPopup} />
        //             <Route path="/feedback" component={Feedback} />
        //             <Redirect to="/" />
        //             {/* <Route render={() => <PageNotFound />} /> */}
        //     </Switch>
        // </Router>

        <Quiz />
>>>>>>> 7dea1227fe4fe4ee07a084080d7df81a0ebbc682
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