import React, {useEffect} from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom"
import {connect} from 'react-redux';
import {setCurrentUser,logoutUser} from './redux/user/user.actions';
import StartPage from "./components/pages/StartPage/StartPage";
import SignIn from "./components/pages/SignIn/SignIn";
import StartTest from "./components/pages/StartTest/StartTest";


const App = ({ setCurrentUser,currentUser,logoutUser}) => {
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
        <Switch>
            {/*<Route exact path="/signIn" render={() => currentUser ?*/}
            {/*    <Redirect to="/"/> :*/}
            {/*    <SignIn handleSubmit={handleSubmit}/>*/}
            {/*}/>*/}
            <Route exact path="/" component={StartPage}/>
            <Route exact path="/start-test" component={StartTest}/>
            <Route exact path="/signIn" component={SignIn}/>
        </Switch>


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


