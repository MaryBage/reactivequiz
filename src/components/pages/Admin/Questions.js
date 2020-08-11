import React, { useContext, useEffect } from 'react';
import './Admin.css';
import s from "./Questions.module.css";
import { UserContext } from './context/user/userContext';
import { DbContext } from './context/database/dbContext';
import { Loader } from '../DetailedComponents/Loader/Loader';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DoneIcon from '@material-ui/icons/Done';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const Questions = () => {
    const { id } = useContext(UserContext);
    const { getData, deleteData, loading, /*questions*/ } = useContext(DbContext);

    const questions = ["what is it 1", "what is it 2", "what is it 3"]

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {loading ? <Loader />
            : <TransitionGroup component='ul' className={s.questions}>
                {questions.map(questionItem => (
                    <CSSTransition
                        key={questionItem.questionId}
                        className={s.questionItem}
                        timeout={800}>
                        <li className={s.questionItem}>
                            <div className={s.inputWrapper}> 
                                <input type='checkbox' value={questionItem.questionId} /> 
                                <input type="text" value={questionItem} className={s.questionItemInput}/>
                            </div>
                            <div className={s.tick}><ArrowDropDownIcon style={{color:"#555555"}} /></div>
                            <div className={s.tick}><DoneIcon style={{color:"#009900"}} /></div>
                            <div className="pointer red" onClick={() => deleteData(questionItem.questionDbId)}>&#10008;</div>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            }
        </>
    )
}

export default Questions;