import React from 'react';
import './App.css';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Feedback from './components/pages/Feedback/Feedback';
import ResetPasswordPopup from './components/popups/ResetPasswordPopup/ResetPasswordPopup';
import Popup from './components/popups/Popup';
import StartPage from "./components/pages/StartPage/StartPage";
import About from './components/pages/About/About';

function App() {
  return (
    <>
<<<<<<< HEAD
        <StartPage/>
        <About/>
      <SignIn
        logoText={logoText}
        sloganText={sloganText}
        informalFieldText={informalFieldText}
        approveButtonText={approveButtonText}
      />
      <SignUp
        logoText={logoText}
        sloganText={sloganText}
        informalFieldText={informalFieldText}
        approveButtonText={approveButtonText}
      />
      <Feedback
        logoText={logoText}
        sloganText={sloganText}
        informalFieldText={informalFieldText}
        approveButtonText={approveButtonText}
      />
      <Popup />
      <ResetPasswordPopup />
=======
      {/* <StartPage/> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <Feedback /> */}
      {/* <Popup /> */}
      {/* <ResetPasswordPopup /> */}
>>>>>>> 67fe2ad71120aa5a01c1a2003ef01b8a3ed99e1c
    </>
  );
}

export default App;