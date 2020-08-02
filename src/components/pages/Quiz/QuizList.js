import React from 'react'
import QuizItem from './QuizItem';

export default function QuizList({ quizes }) {
   // console.log(flashcards);
  return (
    <div>
      {quizes.map(quiz => {
        return <QuizItem quiz={quiz} key={quiz.id} />
      })}
    </div>
  )
}