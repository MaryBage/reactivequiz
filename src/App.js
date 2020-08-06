import React from 'react';
import './App.css';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Feedback from './components/pages/Feedback/Feedback';
import { Quiz } from './components/pages/Quiz/Quiz';

import ResetPasswordPopup from './components/popups/ResetPasswordPopup/ResetPasswordPopup';
import Popup from './components/popups/Popup';
import StartPage from "./components/pages/StartPage/StartPage";
import About from './components/pages/About/About';


function App() {
  return (
    <>


      
       {/* <SignIn 
        logoText={logoText} 
        sloganText={sloganText} 
        informalFieldText={informalFieldText} 
        approveButtonText={approveButtonText} 
      />*/}
      {/* <SignUp 
        logoText={logoText} 
        sloganText={sloganText} 
        informalFieldText={informalFieldText} 

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

      />  */}
      <Quiz/>

    
     {/* <Popup />
      <ResetPasswordPopup />*/}


      {/* <StartPage/> */}
      {/* <SignIn />*/}
      {/* <SignUp /> */}
      {/* <Feedback /> */}
      {/* <Popup /> */}
      {/* <ResetPasswordPopup /> */}

    </>
  );
}

export default App;