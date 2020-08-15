import React, { useState, useContext } from "react";
import "./ChangePsw.css";
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";
import axios from '../../../../axios/axios-quiz'
import {UserContext} from '../context/user/userContext'

const ChangePsw=()=>{
const { id } = useContext(UserContext)
const [toggle,settoggle]=useState(false);
const { register, handleSubmit } = useForm();
const onClickHandler=()=>(settoggle(!toggle)) 
const [match, setMatch] = useState(false)
const [success, setSuccess] = useState(false)

const sbmtHandler = data => {
       console.log(data);
       if(data.psw != data.confirmed)
              setMatch(true)
       else{
           axios.post(`/reset.php`, btoa(JSON.stringify({action: 'change', newPsw: data.psw, creator: id})))
              .then(res => setSuccess(res.data.success))
              
       }

}

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
> </CSSTransition>
{match && <span>Passwords don't match</span>}
{success && <span>Your password is successfully changed!</span>}
<form className="container" onSubmit={handleSubmit(sbmtHandler)}>

<input ref={register} name='psw' className={"cngpasswordlabel"} key='1' type="password" placeholder="new password" /><br/>

<input ref={register} name='confirmed' className={"cngpasswordlabel"} key='2' type="password" placeholder="retype new" /><br/>

<input value="save changes" type="submit" />
</form>



</>
       )

}

export default ChangePsw