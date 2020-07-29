import React from 'react';
import './App.css';
import {logoText, sloganText, informalFieldText, approveButtonText} from "./StaticContent";
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Feedback from './components/pages/Feedback/Feedback';

function App() {
  return (
    <>
       {/* <SignIn 
        logoText={logoText} 
        sloganText={sloganText} 
        informalFieldText={informalFieldText} 
        approveButtonText={approveButtonText} 
      /> */}
      {/* <SignUp 
        logoText={logoText} 
        sloganText={sloganText} 
        informalFieldText={informalFieldText} 
        approveButtonText={approveButtonText}
      />  */}
      {/* <Feedback 
        logoText={logoText} 
        sloganText={sloganText} 
        informalFieldText={informalFieldText}
        approveButtonText={approveButtonText}
      />  */}
    </>
  );
}

export default App;