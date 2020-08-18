import React, {useContext, useState, useRef, useEffect} from 'react'
import {DbContext} from './context/database/dbContext';
import './Admin.css'
import {ArrowLeft, ArrowRight} from '@material-ui/icons';
import {updateQuizInfo} from "../../../redux/quizInfo/quizInfo.actions";
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Modal from "react-modal";
import { useForm } from "react-hook-form";

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

    function copyToClipboard(e, duration) {

        inptRef.current.value = `http://localhost:3000/start-quiz/${btoa(JSON.stringify({
            quiz: 'trainer',
            quizId: e.target.id
        }))}`
        inptRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess({id: e.target.id, copied: true});
        props.updateQuizInfo({duration: duration, quizId: e.target.id, quizName: e.target.name});
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
            {quizes.length ?
                <div className='quizesTableDiv'>
                    <input type='text'
                           ref={inptRef}
                           className='linkToCopyInpt'/>

                    <table className='quizTable'>
                      <tbody>
                        <tr key='quizHeader'>
                            <th>#</th>
                            <th></th>
                            <th>Quiz name</th>
                            <th>Questions<br/>quantity</th>
                            <th>Duration<br/>in minutes</th>
                            <th>Quiz link</th>
                            <th>Status</th>
                            <th></th>
                        </tr>


                        {quizes.slice(page, rowperpage + page).map((quiz, i) => (
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