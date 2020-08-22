import React, { useContext, useEffect, useState, useRef } from "react";
import "../Admin.css";
import s from "./Questions.module.css";
import { DbContext } from "../context/database/dbContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import AnswersAndCode from "../DetailedCompotents/AnswersAndCode";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import Filters from "../DetailedCompotents/Filter";

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

const Questions = (props) => {
  const { deleteData, questions, addQuizes, updateData, } = useContext(DbContext);
  const [selectedQstns, setSelectedQstns] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [quizFormControls, setFormControls] = useState({name: "", duration: ""});
  const [showAnswers, setShowAnswers] = useState([]);
  const [disappear, setDisappear] = useState({ disappear: false, index: null });
  const [hint, setHint] = useState({hint : false, index : null});
  const [filteredValue, setFilteredValue] = useState(questions);
  const [qstnInptValue, setQstnInptValue] = useState(questions.reduce((txt, value, key) => ({ ...txt, [`question${key}`]: value.question}), {}));
  const [searching, setSearching] = useState({ question: '', category: '', difficulty: '', type: '', timeout: 0 });
  const [checkAll, setCheckAll] = useState(false);
  const [valToDelete, setValToDelete] = useState('')


  useEffect(() => {

    const filtArr = Object.keys(searching).filter(el => searching[el])
    let filtered = [];
    if (props.match.params.detail) {
      const filterByQuiz = atob(props.match.params.detail).split(",")
      filtered = questions.filter(e => filterByQuiz.includes(e.questionDbId))
    }
    else filtered = [...questions]

    for (let key of filtArr) {
      filtered = filtered.filter(el => el[key].includes(searching[key]))
    }
    setFilteredValue(filtered)
    setQstnInptValue(filtered.reduce((txt, value, key) => ({ ...txt, [`question${key}`]: value.question}), {}));

  }, [searching, props])


    useEffect(() => {

    checkAll 
        && setSelectedQstns(filteredValue.map(e => e. questionDbId))
 
    }, [checkAll])

     useEffect(() => {

        if (selectedQstns.length > 0 && selectedQstns.length < filteredValue.length) setCheckAll(false)
        if (selectedQstns.length === filteredValue.length) setCheckAll(true)

     }, [selectedQstns])

     useEffect (() => {
         deleteData(valToDelete)
     },[valToDelete])

      

  const makeToDisappear = (e, id) => {
    setDisappear({
      ...disappear,
      disappear: true,
      index: id
    })
  }

  const makeToShowHint = (e, id) => {
    setHint(
      {
        ...hint,
        hint : true,
        index : id
      }
    )
  }

  const editInput = (e, id, table) => {
    e.preventDefault();
    if (e.target.value) {
      updateData(id, table, e.target.name, e.target.value);
            setDisappear({
                ...disappear,
                disappear: false,
                index: id
            })
    }
  };

  const editSelect = (e, id, table) => {
    if (e.target.value) {
      updateData(id, table, e.target.name, e.target.value);
    }
  };

  const makeToShow = (e, id) => {
    if (showAnswers.includes(id)) {
      setShowAnswers(showAnswers.filter((element) => element !== id));
    } else {
      setShowAnswers([...showAnswers, id]);
    }
  };

  function openModal() {
    if (selectedQstns.length) setIsOpen(true);
    else alert("Choose questions for quiz");
  }

  function afterOpenModal() {
    //setCopyLink({ value: "", copied: false });
  }

  function closeModal() {
    setIsOpen(false);
  }
 

  const onchangeHandler = (e) => {
        if (selectedQstns.includes(e.target.value))
        setSelectedQstns(selectedQstns.filter((el) => el != e.target.value));
        else setSelectedQstns([...selectedQstns, e.target.value]);
  };

  const sbmtHandler = async (data) => {
    //console.log(data);
    if (data.name && data.duration) {
      addQuizes(data)
      closeModal()
      setSelectedQstns([]);
      setCheckAll(false)
    } else
      setFormControls({
        duration: data.duration || "empty",
        name: data.name || "empty",
      });
  };

  const onChangeHandler = (e) => {
    setSearching({ ...searching, [e.target.name]: e.target.value })
  }

  const selectAll = () => {
    // setCheckAll(!checkAll)
    //console.log('checkAll 1',checkAll)
    if(checkAll){
     setCheckAll(false)
     setSelectedQstns([])
    }
    else {
        setCheckAll(true)
    }
  }

  const deleteAll = () => {
      console.log(selectedQstns)
   selectedQstns.map(e => deleteData(e));
   setSelectedQstns([]);
  }

  const onKeyPressHandler = (e) => {

    if(e.key === 'Enter'){
        editInput(e, e.target.id, "questions")
        e.target.blur();
    }
  
  }
  const deleteHandler =  (e) => {
    setFilteredValue(filteredValue.filter(el => el.questionDbId != e.target.id))
    setValToDelete(e.target.id)
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
              <input
                type="hidden"
                value={selectedQstns}
                name="qstnId"
                ref={register}
              />
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
              />
              <select name="status" ref={register}>
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
      {props.location.hash && <div className='filterBy'>Filtered by quiz : {props.location.hash.slice(1)}</div>}
      <div className={s.questionWrapper}>
        <div className={s.buttonsWrapper}>
          <button className={s.createQuiz} name="createQuiz" onClick={openModal}>compose quiz</button>
          <button className={s.selectAll}  name="selectAll" onClick={selectAll}>{checkAll ? 'un' : null}select all</button>
          <button className={s.deleteAll}  name="deleteAll" onClick={deleteAll}>delete</button>
        </div>
        <hr />
        <div className="filterDiv">
          <Filters
            onChangeHandler={onChangeHandler}
            options={questions
              .map((e) => e.category)
              .filter((e, i, arr) => i === arr.lastIndexOf(e))
              .sort()}
            values={searching}
          />
          {/* <button className='resetBtn' onClick={() => setSearching({question: '', category:'', difficulty:'', type: '', timeout: 0})}>&#8634;</button> */}
        </div>
        <hr />
        <TransitionGroup component="ul" className={s.questions}>
          {filteredValue.map((currentQuestion,i) => (
            <CSSTransition
              key={currentQuestion.questionDbId}
              classNames='questionItemAnim'
              timeout={800}
            ><li className={s.questionItem}>
              <div className={s.questionItemWrapper}>
                <li className={s.questionItemLi}>
                  <div className={s.inputWrapper}>
                    <input
                      type="checkbox"
                      value={currentQuestion.questionId}
                      checked={checkAll || selectedQstns.includes(
                        currentQuestion.questionDbId 
                      )}
                      value={currentQuestion.questionDbId}
                      onChange={onchangeHandler}
                    />
                    <div
                      className={s.tick}
                      onClick={(e) => makeToShow(e, currentQuestion.questionId)}
                    >
                      {!showAnswers.includes(currentQuestion.questionId) ? (
                        <ArrowDropDownIcon style={{ color: "#757575" }} />
                      ) : (
                          <ArrowDropUpIcon style={{ color: "#757575" }} />
                        )}
                    </div>
                    <div
                      className={currentQuestion.questionId == disappear.index && disappear.disappear? s.disappeared : s.appeared }
                      onDoubleClick={(e) => makeToDisappear(e, currentQuestion.questionId)}
                      onMouseOver={(e) => makeToShowHint(e, currentQuestion.questionId)}
                      onMouseOut={() => makeToShowHint(false)}
                    >
                      {currentQuestion.question}
                      {hint && hint.index == currentQuestion.questionId ? <div className={s.hint}>Double-click and edit the question!</div> : null}
                    </div>
                    {disappear.disappear && currentQuestion.questionId == disappear.index &&
                      <input
                        type="text"
                        name="question"
                        id={currentQuestion.questionDbId}
                        value ={qstnInptValue[`question${i}`]}
                        className={`${s.questionItemInput}`}
                        onKeyPress={onKeyPressHandler}
                        onChange = {e => setQstnInptValue(e.target.value)}
                        
                      />
                    }
                  </div>
                  <div>
                    <select
                      name="difficulty"
                      onChange={(e) =>
                        editSelect(e, currentQuestion.questionDbId, "questions")
                      }
                    >
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
                  {/* <div>
                    <select
                      name="type"
                      onChange={(e) =>
                        editSelect(e, currentQuestion.questionDbId, "questions")
                      }
                    >
                      <option value={currentQuestion.type} className={s.selected}>
                        {currentQuestion.type}
                      </option>
                      <option value="single">single</option>
                      <option value="multiple">multiple</option>
                    </select>
                    </div>*/ }
                  <div
                  id={currentQuestion.questionDbId}
                    className="pointer red"
                    onClick={() => deleteData(currentQuestion.questionDbId)}
                  >
                    &#10008;
                  </div>
                </li>
                <div className={s.answersWrapper}>
                  {showAnswers.includes(currentQuestion.questionId) && (
                    <AnswersAndCode
                      id={currentQuestion.questionId}
                      dbid={currentQuestion.questionDbId}
                      questions={questions}
                    />
                  )}
                </div>
              </div>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </>
  );
};

export default withRouter(Questions);