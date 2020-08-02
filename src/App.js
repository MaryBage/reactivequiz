import React, {useEffect} from 'react';
import './App.css';
import {Redirect, BrowserRouter, Route, Switch} from "react-router-dom"
import {connect} from 'react-redux';
import {setCurrentUser, logoutUser} from './redux/user/user.actions';
import StartPage from "./components/pages/StartPage/StartPage";
import About from "./components/pages/About/About";
import StartTest from "./components/pages/StartTest/StartTest";
import SignIn from "./components/pages/SignIn/SignIn";
import SignUp from "./components/pages/SignUp/SignUp";
import ResetPasswordPopup from "./components/popups/ResetPasswordPopup/ResetPasswordPopup";
import Feedback from "./components/pages/Feedback/Feedback";


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
    return (<>
        <BrowserRouter>
            <Switch>
                {/*<Route exact path="/signIn" render={() => currentUser ?*/}
                {/*    <Redirect to="/"/> :*/}
                {/*    <SignIn handleSubmit={handleSubmit}/>*/}
                {/*}/>*/}
                <Route exact path="/home" component={StartPage}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/start_test" component={StartTest}/>
                <Route exact path="/signin" component={(props) => <SignIn handleSubmit={handleSubmit}/>}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/reset_password" component={ResetPasswordPopup}/>
                <Route exact path="/feedback" component={Feedback}/>
            </Switch>
        </BrowserRouter>
    </>)

// function App() {
//   return (
//     <BrowserRouter>
//       <>
//         <Route path="/home" component={StartPage} />
//         {/* <StartPage/> */}
//         <Route path="/about" component={About} />
//         {/* <About /> */}
//         <Route path="/for-trainees" component={SignIn} />
//         {/* <SignIn /> */}
//         {/* <SignUp /> */}
//         <Route path="/feedback" component={Feedback} />
//         {/* <Feedback /> */}
//         {/* <Popup /> */}
//         {/* <ResetPasswordPopup /> */}
//       </>
//     </BrowserRouter>
//   )
// }


};
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    logoutUser: () => dispatch(logoutUser()),
});
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});
export default connect(mapStateToProps, mapDispatchToProps)(App)


