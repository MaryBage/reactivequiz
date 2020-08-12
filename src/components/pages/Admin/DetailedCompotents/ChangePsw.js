import React from "react";
import InformativeField from "../../DetailedComponents/Fields/InformativeField/InformativeField";

import   "./ChangePsw.css";

const ChangePsw=()=>{
   
 return (
<>
<br/><br/>
<h1>Change Password</h1>

<hr/>

 <form className="container">

      <div className="label">new password</div><InformativeField className={"cngpasswordlabel"}type="password" placeholder="new password" required/><br/>

      <div className="label">retype new</div><InformativeField className={"cngpasswordlabel"} type="password" placeholder="retype new"  required/><br/>

      <button>save changes</button>
</form>

</>
       )

}


export default ChangePsw