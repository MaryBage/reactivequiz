import React, { useContext, useEffect, useState } from 'react';
import '../Admin.css';
import s from "./Questions.module.css";
import { UserContext } from '../context/user/userContext';
import { DbContext } from '../context/database/dbContext';
import { Loader } from '../../DetailedComponents/Loader/Loader';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AnswersAndCode from '../DetailedCompotents/AnswersAndCode';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {withRouter} from 'react-router-dom'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      borderRadius          : 15,
      border                : 'none',
      boxShadow             : '5px 5px 25px rgba(0,0,0,.5)',


    } 
  };

const Questions = (props) => {

    const {deleteData, questions, addQuizes, getQuizes, updateData} = useContext(DbContext)
    const [selectedQstns,setSelectedQstns ] = useState([])
    const [modalIsOpen,setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const [quizFormControls, setFormControls] = useState({name:'', duration:''})
    const [copyLink, setCopyLink] = useState({value: '',  copied: false})
    const [showAnswers, setShowAnswers] = useState([]);

    const filterValue = props.match.params.detail
                        && atob(props.match.params.detail).split(',')
  

    const editInput = (e, id, table) => {
        e.preventDefault();
        if(e.target.value) {
            updateData(id, table, e.target.name, e.target.value);
        }
    }

    const editSelect = (e, id, table) => {
        if(e.target.value) {
            updateData(id, table, e.target.name, e.target.value);
        }
    }

    const makeToShow = (e, id) => {
        if (showAnswers.includes(id)) {
            setShowAnswers(showAnswers.filter(element => element !== id))
        }
        else {
            setShowAnswers([
                ...showAnswers,
                id,
            ]);
        }
    }

    function openModal() {
        if(selectedQstns.length)
           setIsOpen(true);
         else
           alert('Choose questions for quiz')
       }
     
       function afterOpenModal() {
         setCopyLink({value: '',  copied: false})
       }
     
       function closeModal(){
         setIsOpen(false);
       }
     
     
     const onchangeHandler = (e) => {
         if(selectedQstns.includes(e.target.value))
             setSelectedQstns(selectedQstns.filter((el) => el!= e.target.value))
         else
             setSelectedQstns([...selectedQstns,e.target.value]);
     }
     
     const sbmtHandler = async data => {
       console.log(data)
        if(data.name && data.duration) {
           const quizId = await addQuizes(data).then(res => res);
           setCopyLink({value:`http://localhost:3000/quiz/${btoa(JSON.stringify({quiz:'trainer',quizId: quizId}))}`, copied: false})
           getQuizes();
       }
       else setFormControls({
                       duration: data.duration || 'empty',
                       name: data.name || 'empty'});
     }








    return (
        <>
        <button className='createQuiz' name='createQuiz' onClick={openModal} >Create quiz</button>
        <hr />
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Quiz name"
        >

          {!copyLink.value && !copyLink.copied
            ?<form className='adminModalForm' onSubmit={handleSubmit(sbmtHandler)}>
                  <input type='hidden' value={selectedQstns} name='qstnId' ref={register}/>
                  <input type='text' 
                          placeholder='Put a name of quiz' 
                          style={quizFormControls.name == 'empty' ? {backgroundColor: 'rgba(170, 10, 10, 0.25)'} : {}} 
                          name='name' 
                          ref={register}/>
                   <input type='number' 
                            ref={register}  
                            name='duration' 
                            style={quizFormControls.duration == 'empty' ? {backgroundColor: 'rgba(170, 10, 10, 0.25)'} : {}} 
                            step='5'  
                            placeholder='duration'/> 
                  <select name='status' ref={register}  >
                   <option key='enabled' value = 'enabled'>enabled</option>
                    <option key='disabled' value = 'disabled' >disabled</option>
                    </select>
                 <div className='createCancelDiv'>
                   &nbsp;<input type='submit' value='Confirm' name='create'/>
                  &nbsp;<div className="pointer red" onClick={closeModal}>&#10008;</div>
                  </div>
              </form>
           : 
              <div className='copyLink'>
               
                &nbsp;<CopyToClipboard text={copyLink.value}
                        onCopy={() => setCopyLink({copied: true})}>
                         <button className='getLinkBtn'>&nbsp;&copy;&nbsp;Copy link</button>
                     </CopyToClipboard>

              {copyLink.copied ? <span style={{color: 'green'}}>&nbsp;&nbsp;&#10004;&nbsp; Copied</span> : null}
              &nbsp;<div className="pointer red" onClick={closeModal}>&#10008;</div>
              </div>
          }
        </Modal>
         <TransitionGroup component='ul' className={s.questions}>
                {(filterValue 
                    ? questions.filter(e => filterValue.includes(e.questionDbId))
                    :questions).map(currentQuestion => (
                    <CSSTransition
                        key={currentQuestion.questionId}
                        className={s.questionItem}
                        timeout={800}>
                        <div className={s.questionItemWrapper}>
                            <li className={s.questionItemLi}>
                                <div className={s.inputWrapper}> 
                                    <input type='checkbox' 
                                    value={currentQuestion.questionId} 
                                    checked = {selectedQstns.includes(currentQuestion.questionDbId)}
                                    value={currentQuestion.questionDbId} 
                                    onChange={onchangeHandler}
                                    /> 
                                    <div 
                                        className={s.tick} 
                                        onClick={(e) => makeToShow(e, currentQuestion.questionId)}
                                    >
                                    { !showAnswers.includes(currentQuestion.questionId) ? <ArrowDropDownIcon style={{color:"#757575"}}/> : <ArrowDropUpIcon style={{color:"#757575"}} /> }
                                </div>
                                    <input 
                                        type="text" 
                                        name="question"
                                        placeholder={currentQuestion.question} 
                                        className={s.questionItemInput} 
                                        onBlur={(e) => editInput(e, currentQuestion.questionDbId, "questions")}
                                    />
                                </div>
                                <div>
                                    <select name="difficulty" onChange={(e) => editSelect(e, currentQuestion.questionDbId, "questions")}>
                                        <option 
                                            value={currentQuestion.difficulty} 
                                            className={s.selected}
                                        >
                                            {currentQuestion.difficulty}
                                        </option>
                                        <option value="easy">easy</option>
                                        <option value="medium">medium</option>
                                        <option value="hard">hard</option>
                                    </select>
                                </div>
                                <div>
                                    <select name="type" onChange={(e) => editSelect(e, currentQuestion.questionDbId, "questions")}>
                                       <option 
                                            value={currentQuestion.type} 
                                            className={s.selected}
                                        >
                                            {currentQuestion.type}
                                        </option>
                                        <option value="single">single</option>
                                        <option value="multiple">multiple</option>
                                    </select>
                                </div>
                                <div className="pointer red" onClick={() => deleteData(currentQuestion.questionDbId)}>&#10008;</div>
                            </li>
                            <div className={s.answersWrapper}>
                                { showAnswers.includes(currentQuestion.questionId) &&
                                        <AnswersAndCode 
                                        id={currentQuestion.questionId} 
                                        dbid={currentQuestion.questionDbId}
                                        questions={questions}/>
                                }
                            </div>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            
        </>
    )
}

export default withRouter(Questions);