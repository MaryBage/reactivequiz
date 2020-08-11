import React, {useContext,useEffect} from 'react'
import './Admin.css'
import { UserContext } from './context/user/userContext';
import { DbContext } from './context/database/dbContext';
import { Loader } from '../DetailedComponents/Loader/Loader';
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const Questions = () => {
    const {id} = useContext(UserContext)
    const {getData, deleteData, loading, questions} = useContext(DbContext);

    useEffect(() => {
        getData();
        console.log('sadasd')
      // eslint-disable-next-line
    }, [])

return (
        <>
         { loading
        ? <Loader />
        :    <TransitionGroup component='ul' className='questions'>
            
                    {questions.map(questionItem => (
                        <CSSTransition 
                        key={questionItem.questionId}
                        classNames={'questionItem'}
                        timeout={800}>
                            <li className='questionItem'> 
                                
                                <div> <input type='checkbox' value={questionItem.questionId} /> <strong>{questionItem.question}</strong></div>
                                <div  className="pointer red" onClick={() => deleteData(questionItem.questionDbId)}>&#10008;</div>
                               
                            </li>
                        </CSSTransition>
                    )) }
                    
             </TransitionGroup>
      }
        </>

    )

}
export default Questions;