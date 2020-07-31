import React from 'react';
import   "./About.css"

import  welcome from "../../../images/pages/welcome.png";
import BackButton from '../DetailedComponents/Buttons/BackButton/BackButton';
const About=()=>{

return (

    <div className="welcome">
      <div>
          <img src={welcome} alt="welcome"/>
      </div>
      <div className="content">
      <BackButton/>
      <h1 className="hello">hello,</h1>
      <p className="paragrafh"><strong>

      This environment was created to motivate an enthusiastic,<br/>
      active, curios people, who never stop going forward and developing own skills.<br/>
       Also, this platform aims to gather the people, <br/>
       who want to share own experience or direct the others to become reactive experts<br/> 
       climbing higher and higher up to their learning “mountain”. <br/>
      <span className="importanttext"> 
      So, the best of luck to you on your way to the top!
        </span> 

      </strong>
      </p>
      </div>
  
     
       
 
    </div>

)

}

export default About;