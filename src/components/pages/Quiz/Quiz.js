import React, { useState, useEffect } from 'react';
import axios from '../../../axios/axios-quiz'
import { Loader } from '../DetailedComponents/Loader/Loader';
import ActiveQuiz from './ActiveQuiz';
import './Quiz.css'
import Popup from '../../popups/Popup'

export const Quiz = (props) => {
  const [quiz, setQuiz] = useState([]);
  const [conds,setConds] = useState({trasition: false, loader:true, totalPoint:0, resultPoint:0})

  useEffect(() => {
    
    axios
       .post(`/quiz.php`, JSON.stringify(props))
     
        .then(res => {
           
              setQuiz(res.data.map((questionItem, i) => {
                return {
                    questionId: questionItem.questionId,
                    questionDbId: questionItem.questionDbId,
                    question: questionItem.question,
                    code: questionItem.code,
                    type: questionItem.type,
                    difficulty: questionItem.difficulty,
                    options: questionItem.options.sort(() => Math.random()- .5),
                    userAnswer: [],
                    isActive: (i === 0),
                    isSubmitted: false
                }
            }));
           setConds({...conds, loader: false, trasition: true})
        })
        .catch((e) => console.log(e.message))
  }, [])

  

   const onBackClickHandler = (e, singleQuiz, activeQuestion) => {
    e.preventDefault();
      //console.log('back',quiz, activeQuestion);
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

  const finishQuiz =  (e) => {
    e.preventDefault();
    const params = {};

    quiz.forEach(questionItem => {
      params[questionItem.questionDbId] = questionItem.userAnswer.join();
     })

    axios 
     .post(`/calcResult.php`, JSON.stringify(params))
     .then(res => {
       console.log(res.data);
        setConds({...conds, ...res.data})
      })


  }

  return (
    <>
      { (conds.loader && <Loader />) || (conds.totalPoint && <Popup totalPoint = {conds.totalPoint} resultPoint = {conds.resultPoint} />) || 
             <div className="quizBody">
            <div className='quizLayout'>
                   <div className='sidenav'>
                      {
                        quiz.map((el,i) => {
                        return <a href="#" className={(i == quiz.findIndex(item => item.isActive)) ? 'activeQstn' : (el.isSubmitted ?  'passedQuestion' : null)} id={i} onClick={changeQuestion}>{el.isSubmitted ? <span>&#10004;</span> : null} Question {i+1}</a>
                        })
                        }
                      <input type='button' 
                            className='paging' 
                            value='finish' 
                            key='finish'
                            disabled = {!quiz.every(e => e.userAnswer.length)}
                            onClick = {finishQuiz} />
   
                    </div>
                             
                      <ActiveQuiz 
                          activeQuestion = {quiz.findIndex(item => item.isActive)}
                          lastQuestion = {quiz.length}
                          quiz={quiz[quiz.findIndex(item => item.isActive)]} 
                          onBackClickHandler = {onBackClickHandler} 
                          onNextClickHandler = {onNextClickHandler}
                          onSbmtHandler = {sbmtHandler} 
                        /> 
                    
                  </div>    </div>                    
        }
         </>
  )
}