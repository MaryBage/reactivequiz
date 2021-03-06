import React, { useState, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, useHistory } from "react-router-dom";
import axios from "../../../axios/axios-quiz";
import { Loader } from "../DetailedComponents/Loader/Loader";
import ActiveQuiz from "./ActiveQuiz";
import "./Quiz.css";
import Popup from "../../popups/Popup";

const Quiz = (props) => {
    const history = useHistory()
    const [ locationKeys, setLocationKeys ] = useState([])

  const params = props.match.params.detail
    ? atob(props.match.params.detail)
    : JSON.stringify(props);
  const { start, duration, creator } = props.quizInfo;

  const [quiz, setQuiz] = useState([]);

  const [conds, setConds] = useState({
    trasition: false,
    loader: true,
    result: [],
    creator,
  });
  useEffect(() => {
    return history.listen(location => {
      console.log(location)

      if (history.action === 'PUSH') {
        setLocationKeys([ location.key ])
      }
  
      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([ _, ...keys ]) => keys)
  
          // Handle forward event
  
        } else {
          setLocationKeys((keys) => [ location.key, ...keys ])
            history.push('http://localhost:3000/');
          }
      }
    })
  }, [ locationKeys ])
  useEffect(() => {
    axios
      .post(`/quiz.php`, params)
      .then((res) => {
             if (res.data.message) {
            history.push("/unavailable/");
            } 
            else {
                setQuiz(
                    res.data.quiz.map((questionItem, i) => {
                      return {
                        questionId: questionItem.questionId,
                        questionDbId: questionItem.questionDbId,
                        question: questionItem.question,
                        code: questionItem.code,
                        type: questionItem.type,
                        difficulty: questionItem.difficulty,
                        options: questionItem.options.sort(() => Math.random() - 0.5),
                        userAnswer: [],
                        isActive: i === 0,
                        isSubmitted: false,
                };
            }))
            setConds({...conds, loader: false});
        }
     })
     .catch(e => console.log(e.message))
}, [])

    const onBackClickHandler = (e, singleQuiz, activeQuestion) => {
        e.preventDefault();

        setQuiz(quiz.map((questionItem, i) => {
            return {
                ...questionItem,
                userAnswer: (i === activeQuestion) ? singleQuiz.userAnswer : questionItem.userAnswer,
                isActive: (i === activeQuestion - 1) ? true : false,
                isSubmitted: (i === activeQuestion) ? singleQuiz.isSubmitted : questionItem.isSubmitted
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
                isSubmitted: (i === activeQuestion) ? singleQuiz.isSubmitted : questionItem.isSubmitted
            }
        }));
    }

    const sbmtHandler = (e, singleQuiz, activeQuestion) => {
        e.preventDefault();
        setQuiz(quiz.map((questionItem, i) => {
            return {
                ...questionItem,
                userAnswer: (i === activeQuestion) ? singleQuiz.userAnswer : questionItem.userAnswer,
                isActive: activeQuestion < quiz.length - 1 ? (i === activeQuestion + 1 || (activeQuestion + 1) === quiz.length ? true : false) : questionItem.isActive,
                isSubmitted: (i === activeQuestion) ? true : questionItem.isSubmitted
            }
        }));
    }

    const changeQuestion = (e) => {
        e.preventDefault();
        setQuiz(quiz.map((questionItem, i) => {
            return {
                ...questionItem,
                isActive: (i === +e.target.id) ? true : false,
                isSubmitted: questionItem.isSubmitted
            }
        }));
    }

    const finishQuiz = () => {
        
        const params = {
            quiz: {},
            start: !!start,
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
                        {duration &&
                            <>
                                <Countdown renderer={({hours, minutes, seconds}) => (
                                <span style={{color: '#fff', marginLeft: 15, paddingBottom: 25}}>
                                        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                                        </span>
                                )}
                                    date={+start + duration * 60000} 
                                    onComplete = {finishQuiz}
                                    style={{color: '#fff'}}/>
                                <hr/>
                            </>}
                            <input type='button'

                               value='finish'
                               key='finish'
                               className = {quiz.every(e => e.isSubmitted) ? 'finishBtn blink' : 'finishBtn'}
                               disabled={!quiz.every(e => e.isSubmitted)}
                               onClick={finishQuiz}/>
                               
                        {quiz.map((el, i) => {
                                return <a href="#"
                                          className={(i === quiz.findIndex(item => item.isActive)) ? 'activeQstn' : (el.isSubmitted ? 'passedQuestion' : null)}
                                          id={i} onClick={changeQuestion}>{el.isSubmitted ?
                                    <span>&#10004;</span> : null} Question {i + 1}</a>
                            })
                        }
                        
                    </div>

                    <ActiveQuiz
                        activeQuestion={quiz.findIndex(item => item.isActive)}
                        lastQuestion={quiz.length}
                        quiz={quiz[quiz.findIndex(item => item.isActive)]}
                        onBackClickHandler={onBackClickHandler}
                        onNextClickHandler={onNextClickHandler}
                        onSbmtHandler={sbmtHandler}
                    />
                    <hr />
   
                
            </div>
          </div>
        }
    </>
  );
};

const mapStateToProps = (state) => ({
  quizInfo: state.quizInfo,
});

Quiz.propTypes = {
  quiz: PropTypes.string,
  category: PropTypes.string,
  level: PropTypes.string,
};
export default withRouter(connect(mapStateToProps)(Quiz));
