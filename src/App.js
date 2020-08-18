import React from 'react';
import './App.css';
import {Redirect, BrowserRouter as Router, Route, Switch,withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {logoutUser} from './redux/user/user.actions';
import StartPage from "./components/pages/StartPage/StartPage";
import About from "./components/pages/About/About";
import StartTest from "./components/pages/StartTest/StartTest";
import SignIn from "./components/pages/SignIn/SignIn";
import SignUp from "./components/pages/SignUp/SignUp";
import Quiz from "./components/pages/Quiz/Quiz";
import ResetPasswordPopup from "./components/popups/ResetPasswordPopup/ResetPasswordPopup";
import Feedback from "./components/pages/Feedback/Feedback";
import Admin from "./components/pages/Admin/Admin";
import { UserContext } from './components/pages/Admin/context/user/userContext';
import { DbState } from './components/pages/Admin/context/database/dbState';
import { ThemeState } from './components/pages/Admin/context/theme/themeState';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';
import StuRegister from './components/pages/StuRegister/StuRegister';

const App = ({currentUser, logoutUser}) => {
    

    return (
        
        
        <Router>
            <Switch>
                <Route exact path="/" component={StartPage}/>
                <Route path="/about" component={About}/>
                <Route path="/start-test" component={StartTest}/>
                <Route path="/quiz/:detail" component={Quiz}/>
                <Route path="/unavailable" component={PageNotFound}/>
                <Route path="/start-quiz/:detail" component={StuRegister}/>
                {/* <Route path='/pdf' render={() => <PDFViewer style={{width:'100%', height:'100vh'}}><ResultPdf value='80'/></PDFViewer>} /> */}
                {!currentUser ? <Route exact path="/signIn" component={SignIn}/> : null}
                {!currentUser ? <Route exact path="/signup" component={SignUp}/> : null}
                {!currentUser ? <Route path="/reset_password" component={ResetPasswordPopup}/> : null}
                <Route path="/feedback" component={Feedback}/>
                {currentUser ?
                    <UserContext.Provider value={{...currentUser, logoutUser}}>
                            <DbState>
                                <ThemeState>
                                    <Route path="/admin" component={Admin} />
                                    <Redirect to='/admin'/>
                                </ThemeState>
                            </DbState>
                    </UserContext.Provider> : null
                }
                <Redirect to='/'/>
            </Switch>
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