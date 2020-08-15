import React, { usestae, useState } from "react";
import InformativeField from "../../DetailedComponents/Fields/InformativeField/InformativeField";
import "./ChangePsw.css";
import { CSSTransition } from "react-transition-group";


const ChangePsw=()=>{
const [toggle,settoggle]=useState(false);

const onClickHandler=()=>(settoggle(!toggle))  


 return (
<>
<br/><br/>
 <button type="button" className='changePswBtn' onClick={onClickHandler}>Change password</button>

<hr/>
<CSSTransition
  in={toggle}
  timeout={10}
  classNames="formanimation"
   unmountOnExit
>
<form className="container">

<div className="label">new password</div><InformativeField className={"cngpasswordlabel"}type="password" placeholder="new password" required/><br/>

<div className="label">retype new</div><InformativeField className={"cngpasswordlabel"} type="password" placeholder="retype new"  required/><br/>

<button  type="button">save changes</button>
</form>

</CSSTransition>

</>
       )

}

export default ChangePsw;