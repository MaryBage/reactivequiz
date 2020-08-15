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

const Questions = () => {

    const { id } = useContext(UserContext);
    const { getData, updateData, deleteData, loading, questions } = useContext(DbContext);
    const [showAnswers, setShowAnswers] = useState([]);


    useEffect(function () {
        getData();
    }, [])

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

    return (
        <>
            {loading ? <Loader />
            : <TransitionGroup component='ul' className={s.questions}>
                {questions.map(currentQuestion => (
                    <CSSTransition
                        key={currentQuestion.questionId}
                        className={s.questionItem}
                        timeout={800}>
                        <div className={s.questionItemWrapper}>
                            <li className={s.questionItemLi}>
                                <div className={s.inputWrapper}> 
                                    <input type='checkbox' value={currentQuestion.questionId} /> 
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
            }
        </>
    )
}

export default Questions;