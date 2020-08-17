import React, {useState, useEffect} from 'react';
import axios from '../../../axios/axios-quiz';
import {Loader} from '../DetailedComponents/Loader/Loader';
import ActiveQuiz from './ActiveQuiz';
import './Quiz.css';
import Popup from '../../popups/Popup';
import {withRouter} from "react-router-dom";
import Countdown, {zeroPad} from 'react-countdown';
import {connect} from "react-redux";

const Quiz = (props) => {
    const params = props.match.params.detail
        ? atob(props.match.params.detail)
        : JSON.stringify(props)
    const duration = props.quizInfo.duration


    const [quiz, setQuiz] = useState([])
    const [conds, setConds] = useState({trasition: false, loader: true, result: []})
    useEffect(() => {

        axios
            .post(`/quiz.php`, params)
            .then(res => {
                console.log(res.data)
                if (res.data.message) {
                    props.history.push('/unavailable/')
                } else {
                    setQuiz(res.data.map((questionItem, i) => {
                        return {
                            questionId: questionItem.questionId,
                            questionDbId: questionItem.questionDbId,
                            question: questionItem.question,
                            code: questionItem.code,
                            type: questionItem.type,
                            difficulty: questionItem.difficulty,
                            options: questionItem.options.sort(() => Math.random() - .5),
                            userAnswer: [],
                            isActive: (i === 0),
                            isSubmitted: false
                        }
                    }));
                    setConds({...conds, loader: false, trasition: true})
                }
            })
            .catch((e) => console.log(e.message))
    }, [])


    const onBackClickHandler = (e, singleQuiz, activeQuestion) => {
        e.preventDefault();

        setQuiz(quiz.map((questionItem, i) => {
            return {
                ...questionItem,
                userAnswer: (i === activeQuestion) ? singleQuiz.userAnswer : questionItem.userAnswer,
                isActive: (i === activeQuestion - 1) ? true : false,
            }
        }));
    }

    const onNextClickHandler = (e, singleQuiz, activeQuestion) => {
        e.preventDefault();
        setQuiz(quiz.map((questionItem, i) => {
            return {
                ...questionItem,
                userAnswer: (i === activeQuestion) ? singleQuiz.userAnswer : questionItem.userAnswer,
                isActive: (i === activeQuestion + 1) ? true : false,
            }
        }));
    }

    const sbmtHandler = (e, singleQuiz, activeQuestion) => {
        e.preventDefault();
        setQuiz(quiz.map((questionItem, i) => {
            return {
                ...questionItem,
                userAnswer: (i === activeQuestion) ? singleQuiz.userAnswer : questionItem.userAnswer,
                isActive: activeQuestion < quiz.length - 1 ? (i === activeQuestion + 1 || (activeQuestion + 1) == quiz.length ? true : false) : questionItem.isActive,
                isSubmitted: (i === activeQuestion) ? true : questionItem.isSubmitted
            }
        }));
    }

    const changeQuestion = (e) => {
        e.preventDefault();
        setQuiz(quiz.map((questionItem, i) => {
            return {
                questionId: questionItem.questionId,
                questionDbId: questionItem.questionDbId,
                question: questionItem.question,
                code: questionItem.code,
                type: questionItem.type,
                difficulty: questionItem.difficulty,
                options: questionItem.options,
                userAnswer: questionItem.userAnswer,
                isActive: (i === +e.target.id) ? true : false,
                isSubmitted: questionItem.isSubmitted
            }
        }));
    }

    const finishQuiz = (e) => {
        e.preventDefault();
        const params = {
            quiz: {},
            ...props.quizInfo
        };
        quiz.forEach(questionItem => {
            params.quiz[questionItem.questionDbId] = questionItem.userAnswer.join();
        })
        axios
            .post(`/calcResult.php`, btoa(JSON.stringify(params)))
            .then(res => {
                setConds({...conds, result: res.data})
            })
    }

    return (
        <>
            {(conds.loader && <Loader/>) || (conds.result.length &&
                <Popup quizInfo={props.quizInfo} res={conds.result}/>) ||
            <div className="quizBody">
                <div className='quizLayout'>
                    <div className='sidenav'>

                        <Countdown renderer={({hours, minutes, seconds}) => (
                            <span style={{color: '#fff', marginLeft: 15, paddingBottom: 25}}>
                                      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                                    </span>
                        )}
                                   date={Date.now() + duration * 60000} style={{color: '#fff'}}/>
                        <hr/>
                        {
                            quiz.map((el, i) => {
                                return <a href="#"
                                          className={(i == quiz.findIndex(item => item.isActive)) ? 'activeQstn' : (el.isSubmitted ? 'passedQuestion' : null)}
                                          id={i} onClick={changeQuestion}>{el.isSubmitted ?
                                    <span>&#10004;</span> : null} Question {i + 1}</a>
                            })
                        }
                        <input type='button'
                               className='finishBtn'
                               value='finish'
                               key='finish'
                               disabled={!quiz.every(e => e.userAnswer.length)}
                               onClick={finishQuiz}/>
                    </div>

                    <ActiveQuiz
                        activeQuestion={quiz.findIndex(item => item.isActive)}
                        lastQuestion={quiz.length}
                        quiz={quiz[quiz.findIndex(item => item.isActive)]}
                        onBackClickHandler={onBackClickHandler}
                        onNextClickHandler={onNextClickHandler}
                        onSbmtHandler={sbmtHandler}
                    />
                </div>
            </div>
            }
        </>
    )
}


const mapStateToProps = state => ({
    quizInfo: state.quizInfo
});
export default withRouter(connect(mapStateToProps)(Quiz));
