import React, { useState, useEffect, useRef } from 'react';
import QuizList from './QuizList';
import './Quiz.css';
import axios from 'axios';

export const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {

    axios
        .get(`https://reactivequiz.com/2mash/quiz.php?quiz=1`)
        .then(res => {
            console.log(res.data);
           setQuiz(res.data.map((questionItem, i) => {
                const answer = questionItem.correct_answers;
                const options = [
                    ...questionItem.incorrect_answers.map(a => decodeString(a)),
                    ...answer
                  ]
                return {
                    questionId: questionItem.questionId,
                    question: questionItem.question,
                    code: questionItem.code,
                    type: questionItem.type,
                    point: questionItem.point,
                    difficulty: questionItem.difficulty,
                    answer,
                    options: options.sort(() => Math.random()- .5)

                }
                
            }))
       
        }
                
            )
   
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }

  

  return (
    <>
     {}
      
        <QuizList quizes={quiz} />
      
    </>
  );
}