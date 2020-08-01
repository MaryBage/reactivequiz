import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Feedback from './components/pages/Feedback/Feedback';
import ResetPasswordPopup from './components/popups/ResetPasswordPopup/ResetPasswordPopup';
import Popup from './components/popups/Popup';
import StartPage from "./components/pages/StartPage/StartPage";
import About from './components/pages/About/About';

function App() {
  return (
    <BrowserRouter>
      <>
        <Route path="/home" component={StartPage} />
        <StartPage/>
        <Route path="/about" component={About} />
        {/* <About /> */}
        <Route path="/for-trainees" component={SignIn} />
        {/* <SignIn /> */}
        {/* <SignUp /> */}
        <Route path="/feedback" component={Feedback} />
        {/* <Feedback /> */}
        {/* <Popup /> */}
        {/* <ResetPasswordPopup /> */}
      </>
    </BrowserRouter>
  )
}

export default App;