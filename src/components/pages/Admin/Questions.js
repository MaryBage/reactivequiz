import React, {useContext, useState, useEffect} from 'react'
import './Admin.css'
import { DbContext } from './context/database/dbContext';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import {TransitionGroup, CSSTransition} from 'react-transition-group'
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

 const filterValue = props.match.params.detail
                    && atob(props.match.params.detail).split(',')
           
  
const {deleteData, questions, addQuizes, getQuizes} = useContext(DbContext)
const [selectedQstns,setSelectedQstns ] = useState([])
const [modalIsOpen,setIsOpen] = useState(false);
const { register, handleSubmit } = useForm();
const [quizFormControls, setFormControls] = useState({name:'', duration:''})
const [copyLink, setCopyLink] = useState({value: '',  copied: false})

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

return (<>
<input type='button' value='Create quiz' name='createQuiz' onClick={openModal} />

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
                   &nbsp;<input type='submit' value='Create' name='create'/>
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




               <TransitionGroup component='ul' className='questions'>
                    {(filterValue 
                    ? questions.filter(e => filterValue.includes(e.questionDbId))
                    :questions)
                    .map(questionItem => (
                        <CSSTransition 
                        key={questionItem.questionId}
                        classNames={'questionItem'}
                        timeout={800}>
                            <li className='questionItem'> 
                                
                                <div> <input type='checkbox' 
                                    checked = {selectedQstns.includes(questionItem.questionDbId)}
                                    value={questionItem.questionDbId} 
                                    onChange={onchangeHandler}
                                /> 
                                    <strong>{questionItem.question}</strong>
                                </div>
                                <div className="pointer red" 
                                onClick={() => deleteData(questionItem.questionDbId)}>
                                    &#10008;
                                 </div>
                               
                            </li>
                        </CSSTransition>
                    )) }
                    
             </TransitionGroup>

             </>
     )

}
export default withRouter(Questions);