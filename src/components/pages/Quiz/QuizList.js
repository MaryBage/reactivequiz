import React from 'react'
import QuizItem from './QuizItem';
import {Switch,BrowserRouter} from 'react-router-dom'

export default function QuizList({ quizes }) {
  
  return (
    <BrowserRouter>
    
      {quizes.map(quiz => {
        return <QuizItem quiz={quiz} key={quiz.id} />
      })}
      
    </BrowserRouter>
  )
}