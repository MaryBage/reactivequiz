import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartPage from "./components/pages/StartPage/StartPage";
import About from './components/pages/About/About';
import StartTest from './components/pages/StartTest/StartTest';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from "./components/pages/SignUp/SignUp";
import ResetPasswordPopup from "./components/popups/ResetPasswordPopup/ResetPasswordPopup";
import Feedback from './components/pages/Feedback/Feedback';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={StartPage} />
          <Route path="/about" component={About} />
          <Route path="/passtest" component={StartTest} />
          <Route path="/signin" component={SignIn} />
          <Route path="/resetpassword" component={ResetPasswordPopup} />
          <Route path="/register" component={SignUp} />
          <Route path="/feedback" component={Feedback} />
        </Switch>
    </BrowserRouter>
  )
}

export default App;