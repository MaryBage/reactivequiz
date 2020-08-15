import React, {useContext, useState, useRef, useEffect} from 'react'
import { DbContext } from './context/database/dbContext';
import './Admin.css'
import PropTypes from 'prop-types';
import {ArrowLeft, ArrowRight} from '@material-ui/icons';

  
const Quizes = (props) => {
    const {deleteQuizes, quizes, updateQuizes} = useContext(DbContext)
    const [page,setPage] = useState(0)
    const [rowperpage, setRowperpage] = useState(5)
    const [copySuccess, setCopySuccess] = useState({id:'', copied: false});
    
    const inptRef = useRef(null);

    function copyToClipboard(e) {
        inptRef.current.value= `http://localhost:3000/quiz/${btoa(JSON.stringify({quiz:'trainer',quizId: e.target.id}))}`
        inptRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess({id:  e.target.id, copied: true});
        setTimeout(() => {
          setCopySuccess({...copySuccess, copied: false});
        },3000)
    };
  


    const filterByQuiz = (_, filterValue) => {
        props.history.push(`/admin/questions/${btoa(filterValue)}`);
    }

    const back = () => {
        page && setPage(page => page - rowperpage)
    }
    const next = () => {
            page + rowperpage < quizes.length  &&  setPage(page => page + rowperpage)
    }
    const onRowperpageChange = (e) => {
        console.log(e.target.value)
        setRowperpage(+e.target.value)

    }
  
 
  return (
    <> 
     {quizes.length ?
    <div className='quizesTableDiv'>
     <input type='text' 
            ref={inptRef}
            className ='linkToCopyInpt' />

    <table className='quizTable'>
      <tr key='quizHeader'>
        <th>#</th>
        <th>Quiz name</th>
        <th>Questions<br/>quantity</th>
        <th>Duration<br/>in minutes</th>
        <th>Quiz link</th>
        <th>Status</th>
        <th></th>
      </tr>


       {quizes.slice(page, rowperpage+page).map((quiz,i) => (
          <tr key={`1${quiz.dbId}`}>
            <td>{i + 1 + page}</td>
            <td>
          <div style={{cursor:'pointer'}} 
          onClick={(e) =>filterByQuiz(e,quiz.questions)} > {quiz.name} </div>
          </td>
            <td>{quiz.questions.length}</td>
            <td>{quiz.duration}</td>
            <td>
               
            
                 <input type='button'
                    style={(copySuccess.id == quiz.dbId && copySuccess.copied) ? {backgroundColor: 'rgba(60, 160, 60,.1)'} : {}}
                    value={(copySuccess.id == quiz.dbId && copySuccess.copied) ? 'Copied!': 'get link'}
                    id={quiz.dbId} 
                     className='getLinkBtn'
                    onClick={copyToClipboard} />
            </td>
            <td>
                <select style={quiz.status == 'enabled' ?  {backgroundColor: 'rgba(60, 160, 60,.1)'} : { backgroundColor: 'rgba(170,10,10, .1)'}} onChange={(e) => updateQuizes(quiz.dbId, 'status', e.target.value)}>
                    <option key={`1${quiz.dbId}`} value = {quiz.status}>{quiz.status}</option>
                    <option key={`2${quiz.dbId}`} value = 'enabled'>enabled</option>
                    <option key={`3${quiz.dbId}`} value = 'disabled' >disabled</option>
                </select>
             </td>
            <td>
                <div className="pointer red" 
                    onClick={() => deleteQuizes(quiz.dbId)}>
                    &#10008;
                </div> 
            </td>
          </tr>
        ))}
       
        <tr key='quizHeader'>
        <td colspan='7'>
            <div className='tablePaging'>
               <div> show per page
                <select onChange={onRowperpageChange}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                </select>
                </div>
                
                <div>
                <ArrowLeft onClick={back}/>
                <ArrowRight onClick={next}/> 
                </div>
                {page+1}-{rowperpage+page} from {quizes.length} 
             </div>
             </td>

      </tr>
        

      </table>
      </div>
      : 'There is no quizes yet.'}
      </>
  )

}


export default Quizes;