import React, {useEffect} from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom"
import {connect} from 'react-redux';
import {setCurrentUser,logoutUser} from './redux/user/user.actions';
import StartPage from "./components/pages/StartPage/StartPage";
import SignIn from "./components/pages/SignIn/SignIn";


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
            <Route exact path="/signIn" render={() => currentUser ?
                <Redirect to="/"/> :
                <SignIn handleSubmit={handleSubmit}/>
            }/>
            <Route exact path="/" component={StartPage}/>
        </Switch>


    </>)


};
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    logoutUser: () => dispatch(logoutUser()),
});
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});
export default connect(mapStateToProps, mapDispatchToProps)(App)
