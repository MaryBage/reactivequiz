import React from 'react'
import Flashcard from './QuizItem';

export default function FlashcardList({ flashcards }) {
   // console.log(flashcards);
  return (
    <div>
      {flashcards.map(flashcard => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />
      })}
    </div>
  )
}