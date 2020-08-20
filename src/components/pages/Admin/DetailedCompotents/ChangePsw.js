import React, { useState, useContext } from "react";
import s from "./ChangePsw.module.css";
import { useForm } from "react-hook-form";
import axios from '../../../../axios/axios-quiz';
import { UserContext } from '../context/user/userContext';

const ChangePsw = () => {

       const { id } = useContext(UserContext);
       const { register, handleSubmit } = useForm();
       const [match, setMatch] = useState(false);
       const [success, setSuccess] = useState(false);

       const sbmtHandler = data => {
               
              if (!data.psw) {
                    return;
              }
              if (data.psw != data.confirmed) {
                     setMatch(true);
              }
              else {
                  axios.post(`/reset.php`, btoa(JSON.stringify({action: 'change', newPsw: data.psw, creator: id})))
                     .then(res => setSuccess(res.data.success));
                     setMatch(false);
              }
       }

       return (
              <>
                     <div className={s.changePassWrapper}>
                            <div>
                                   <h1>Change password</h1>
                            </div>
                            <hr />
                            <div style={{height: 25}}>
                                   {match && <span style={{color:'red'}}>Passwords don't match</span>}
                                   {success && <span  style={{color: 'green', fontWeight: 'bold'}}>Your password has been successfully changed!</span>}
                            </div>
                            <form className={s.formWrapper} onSubmit={handleSubmit(sbmtHandler)}>
                                   <div className={s.inputWrapper}>
                                          <div>new password</div>
                                          <input type="password" ref={register} name='psw' />
                                   </div>
                                   <div className={s.inputWrapper}>
                                          <div>retype new</div>
                                          <input type="password" ref={register} name='confirmed' />
                                   </div>
                                   <div className={s.submitWrapper}>
                                          <div></div>
                                          <input type="submit" value="save changes" className={s.changePswSubmit} />
                                   </div>
                            </form>
                            <hr />
                     </div>
              </>
       )
}

export default ChangePsw;