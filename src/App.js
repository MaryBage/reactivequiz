import React from 'react';
import './App.css';
import {logoText, sloganText, popupText} from "./StaticContent";
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Feedback from './components/pages/Feedback/Feedback';
import Popup from './components/popups/Popup';
import PageIntro from "./components/pages/PageIntro/PageIntro";
import StartPage from "./components/pages/StartPage/StartPage";
import Buttons from "./components/pages/Buttons/Button";

function App() {
    return (
        <>
            <StartPage logoText={"logoTex"} sloganText={"sloganText"} />

            {/*<SignIn logoText={logoText} sloganText={sloganText} />*/}
            {/*<SignUp logoText={logoText} sloganText={sloganText} />*/}
            {/*<Feedback logoText={logoText} sloganText={sloganText} />*/}
            {/*<Popup popupText={popupText} />*/}
            {/*<PageIntro sloganAndLogo={{logoText:"logotext",sloganText:'slogan'}} />*/}

        </>
    );
}

export default App;