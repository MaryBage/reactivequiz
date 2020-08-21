import React, {useContext, useState, useRef, useEffect} from 'react'
import {DbContext} from './context/database/dbContext';
import './Admin.css'
import {ArrowLeft, ArrowRight} from '@material-ui/icons';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {updateQuizInfo} from "../../../redux/quizInfo/quizInfo.actions";
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import {UserContext} from './context/user/userContext'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 15,
    border: "none",
    boxShadow: "5px 5px 25px rgba(0,0,0,.5)",
  },
};


const Quizes = (props) => {
    const { id } = useContext(UserContext)
    const {deleteQuizes, quizes, updateQuizes} = useContext(DbContext)
    const [page, setPage] = useState(0)
    const [rowperpage, setRowperpage] = useState(5)
    const [copySuccess, setCopySuccess] = useState({id: '', copied: false});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [quizFormControls, setFormControls] = useState({
      dbId: "",
      name: "",
      duration: "",
      status: ""
    });
    const { register, handleSubmit } = useForm();
    const inptRef = useRef(null);
    const [changedQuizes, setChangedQuizes] = useState([])
    const [orderingName, setOrderingName] = useState(false)
    const [orderingDuration, setOrderingDuration] = useState(false)
    const [orderingQuestions, setOrderingQuestions] = useState(false)
    
    useEffect(()=>{

      setChangedQuizes(quizes)
    },[quizes])

    function copyToClipboard(e, duration) {

        inptRef.current.value = `http://localhost:3000/start-quiz/${btoa(JSON.stringify({
            quiz: 'trainer',
            quizId: e.target.id
        }))}`
        inptRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess({id: e.target.id, copied: true});
        props.updateQuizInfo({duration: duration, quizId: e.target.id, quizName: e.target.name, creator:id});
        setTimeout(() => {
            setCopySuccess({...copySuccess, copied: false});
        }, 1500)
    };


    const filterByQuiz = (_, filterValue, filterName) => {

        props.history.push({
            pathname: `/admin/questions/${btoa(filterValue)}`,
            hash: filterName
        });
    }

    const back = () => {
        page && setPage(page => page - rowperpage)
    }
    const next = () => {
        page + rowperpage < quizes.length && setPage(page => page + rowperpage)
    }
    const onRowperpageChange = (e) => {
        console.log(e.target.value)
        setRowperpage(+e.target.value)

    }
    const changeQuizInfo = (e) => {
      setFormControls({...quizFormControls,[e.target.name]:e.target.value})
    }

    function openModal(props) {
        console.log(props);
        setFormControls({...props})
        setIsOpen(true)
    }
  
    function afterOpenModal() {
      //setCopyLink({ value: "", copied: false });
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    const sbmtHandler = async (data) => {
      console.log(data);
      if (data.name && data.duration) {
        updateQuizes(data)
        closeModal()
        setIsOpen(false)
      } else
        setFormControls({
          duration: data.duration || "empty",
          name: data.name || "empty",
        });
    };

    const sortingBy = (e, field) => {
      let orderBy = true ;

      function compare(a, b, order = 1) {
        // Use toUpperCase() to ignore character casing
        const quizA = a.name.toUpperCase();
        const quizB = b.name.toUpperCase();
      
        let comparison = 0;
        if (quizA > quizB) {
          comparison = 1;
        } else if (quizA < quizB) {
          comparison = -1;
        }
        return comparison * order;
      }

      switch (field) {
          case 'name':
                setOrderingName(!orderingName)
                setChangedQuizes(orderingName 
                                  ? changedQuizes.sort((a,b)=>compare(a,b,-1)) 
                                  : changedQuizes.sort(compare))
          break;
          case 'duration':
            setOrderingDuration(!orderingDuration)
            setChangedQuizes(changedQuizes.sort((a, b) => orderingDuration 
                              ? a[field] - b[field] 
                              : b[field] - a[field]))
          break;
          case 'questions':
            setOrderingQuestions(!orderingQuestions)
            setChangedQuizes(changedQuizes.sort((a, b) => orderingQuestions 
                              ? a[field].length - b[field].length 
                              : b[field].length - a[field].length))
          break;
      }
    }
    const searchHandler = (e) => {
      if(e.target.value)
        setChangedQuizes([...changedQuizes.filter( el => el.name.includes(e.target.value))])
        else
          setChangedQuizes(quizes)
    }

    return (
      <>
      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Quiz name"
        >
            <div className="pointer red" style={{marginLeft: 270}} onClick={closeModal}>
                  &#10008;
                </div>
            <form className="adminModalForm" onSubmit={handleSubmit(sbmtHandler)}>
            
              <input ref={register} type='hidden' name='id' value={quizFormControls.dbId} />
              
              <input
                type="text"
                placeholder="Put a name of quiz"
                style={
                  quizFormControls.name == "empty"
                    ? { backgroundColor: "rgba(170, 10, 10, 0.25)" }
                    : {}
                }
                name="name"
                className = 'modalInptName'
                onChange = {changeQuizInfo}
                value={quizFormControls.name}
                ref={register}
              />
              <input
                type="number"
                ref={register}
                name="duration"
                style={
                  quizFormControls.duration == "empty"
                    ? { backgroundColor: "rgba(170, 10, 10, 0.25)" }
                    : {}
                }
                step="5"
                placeholder="duration"
                onChange = {changeQuizInfo}
                value={quizFormControls.duration}
              />
              <select name="status" 
              value={quizFormControls.status} 
              ref={register}
              onChange = {changeQuizInfo}>
                <option key="enabled" value="enabled">
                  enabled
                </option>
                <option key="disabled" value="disabled">
                  disabled
                </option>
              </select>
              <div className="createCancelDiv">
                &nbsp;
                <input type="submit" value="Confirm" name="create" />
             </div>
            </form>

      </Modal>

        
        <div className='quizesWrapper'>
        <input type="text" name='quiz' className='searchField' onInput={searchHandler} placeholder="search..."/>
        
        <hr style={{margin:'25px 0px'}}/>

            {changedQuizes.length ?
                <div className='quizesTableDiv'>
                    <input type='text'
                           ref={inptRef}
                           className='linkToCopyInpt'/>

                    <table className='quizTable'>
                      <tbody>
                        <tr key='quizHeader'>
                            <th>#</th>
                            <th></th>
                            <th style={{width: 200}}>
                              <div className='sorting' 
                                    name='questionsLength' 
                                    onDoubleClick={(e) => sortingBy(e, 'name')}>
                                Quiz name 
                                {!orderingName && <ArrowDropUpIcon />}
                                {orderingName && <ArrowDropDownIcon />}
                                </div>
                              </th>
                            <th>
                              <div className='sorting' 
                              name='questionsLength' 
                              onDoubleClick={(e) => sortingBy(e, 'questions')}>
                                Questions<br/>quantity
                                {orderingQuestions && <ArrowDropUpIcon />}
                                {!orderingQuestions && <ArrowDropDownIcon />}
                              </div>
                            </th>
                            <th>
                                <div className='sorting' 
                                  name='duration' 
                                  onDoubleClick={(e) => sortingBy(e, 'duration')}>
                                  Duration<br/>in minutes
                                  {orderingDuration && <ArrowDropUpIcon />}
                                  {!orderingDuration && <ArrowDropDownIcon />}
                                </div>
                             </th>
                            <th>Quiz link</th>
                            <th>Status</th>
                            <th></th>
                        </tr>


                        {changedQuizes.slice(page, rowperpage + page).map((quiz, i) => (
                            <tr key={`1${quiz.dbId}`}>
                                <td>{i + 1 + page}</td>
                                <td><FontAwesomeIcon id='editQuiz' icon={faEdit} 
                                onClick={() => openModal({
                                  dbId:quiz.dbId, 
                                  name:quiz.name, 
                                  duration: quiz.duration,
                                  status: quiz.status
                                  })} /></td>
                                <td>
                                    <div style={{cursor: 'pointer'}}
                                         onClick={(e) => filterByQuiz(e, quiz.questions, quiz.name)}> {quiz.name} </div>
                                </td>
                                <td>{quiz.questions.length}</td>
                                <td>{quiz.duration}</td>
                                <td>


                                    <input type='button'
                                           style={(copySuccess.id == quiz.dbId && copySuccess.copied) ? {backgroundColor: 'rgba(60, 160, 60,.1)'} : {}}
                                           value={(copySuccess.id == quiz.dbId && copySuccess.copied) ? 'Copied!' : 'get link'}
                                           id={quiz.dbId}
                                           name={quiz.name}
                                           className='getLinkBtn'
                                           onClick={(e) => copyToClipboard(e, quiz.duration)}/>
                                </td>
                                <td>
                                    <select
                                        style={quiz.status == 'enabled' ? {backgroundColor: 'rgba(60, 160, 60,.1)'} : {backgroundColor: 'rgba(170,10,10, .1)'}}
                                        onChange={(e) => updateQuizes({id:quiz.dbId, status: e.target.value})}>
                                        <option key={`1${quiz.dbId}`} value={quiz.status}>{quiz.status}</option>
                                        <option key={`2${quiz.dbId}`} value='enabled'>enabled</option>
                                        <option key={`3${quiz.dbId}`} value='disabled'>disabled</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="pointer red"
                                         onClick={() => deleteQuizes(quiz.dbId)}>
                                        &#10008;
                                    </div>
                                </td>
                            </tr>
                        ))}

                        <tr key='quizHeader2'>
                            <td colSpan='7'>
                                <div className='tablePaging'>
                                    <div> show per page&nbsp;
                                        <select onChange={onRowperpageChange}>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='15'>15</option>
                                        </select>
                                    </div>

                                    <div>
                                        <ArrowLeft onClick={back}/>
                                        <ArrowRight onClick={next}/>
                                    </div>
                                    {page + 1}-{rowperpage + page > quizes.length ? quizes.length : rowperpage + page} from {quizes.length}
                                </div>
                            </td>

                        </tr>

                        </tbody>
                    </table>
                </div>
                : 'There is no quizes yet.'}
        </div>
        </>
    )

}

const mapDispatchToProps = dispatch => ({
    updateQuizInfo: (info) => dispatch(updateQuizInfo(info)),
});

export default connect(null, mapDispatchToProps)(Quizes);