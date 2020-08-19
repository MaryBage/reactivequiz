import React,{useEffect, useContext, useState} from 'react'
import './Admin.css'
import axios from '../../../axios/axios-quiz'
import { DbContext } from "./context/database/dbContext"
import {UserContext} from './context/user/userContext'
import Modal from "react-modal";
import {PDFViewer} from '@react-pdf/renderer';
import ResultPdf from '../../pages/Pdf/Pdf'

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: 15,
      border: "none",
      boxShadow: "5px 5px 25px rgba(0,0,0,.5)",
    },
  };

const StuResults = () => {
    const { id } = useContext(UserContext)
    const {getStudents, students} = useContext(DbContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [res, setRes] = useState({res: []})
    const [changedStudents, setChangedStudents] = useState([])
    const [orderingName, setOrderingName] = useState(false)
    const [searchBy, setSearchBy] = useState('quizName')


  console.log(changedStudents)
    useEffect(() => {
        getStudents();
      // eslint-disable-next-line
 
    }, [])

    useEffect(() => {
      setChangedStudents(students)
    }, [students])


    const openPdf = (_,props) => {
        
           axios
            .post(`/calcResult.php`, btoa(JSON.stringify({...props, pdf: true})))
            .then(res => {
                setRes({res: res.data, ...props })
                setIsOpen(true)
            })

    }

    const sortingBy = (e, field) => {

        function compare(a, b, field, order = 1) {
            // Use toUpperCase() to ignore character casing
            const fldA = a[field].toUpperCase();
            const fldB = b[field].toUpperCase();
          
            let comparison = 0;
            if (fldA > fldB) {
              comparison = 1;
            } else if (fldA < fldB) {
              comparison = -1;
            }
            return comparison * order;
          }
        switch (field) {
            case 'name':
            case 'email':
            case 'quizName':
                setOrderingName(!orderingName)
                setChangedStudents(orderingName 
                                ? changedStudents.sort((a,b)=>compare(a,b,field,-1)).map(e => e) 
                                : changedStudents.sort((a,b) =>compare(a,b,field)).map(e => e))
            break;
            case 'percentage':
                const  orderBy =  changedStudents[0][field] >= changedStudents[changedStudents.length - 1 ][field];
                setChangedStudents(changedStudents.sort((a, b) => orderBy 
                                        ? a[field] - b[field] 
                                        : b[field] - a[field]).map(e => e))
            break;
            }

      }
 
      const searchHandler = (e) => {
        if(e.target.value)
        setChangedStudents(changedStudents.filter( el => el[searchBy].includes(e.target.value)))
          else
          setChangedStudents(students)
      }
  

return (
    <>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Pdf report"
          style={{width: '30%!important'}}
        >
            <div className="pointer red" style={{marginLeft: 20, marginBottom: 10}} onClick={() => setIsOpen(false)}>
                &#10008;
            </div>
            <PDFViewer style={{width: '100%', height: '100vh'}}>
                <ResultPdf {...res} />
             </PDFViewer>

      </Modal>
    {students.length ?
    <>
    
    <div className='quizesWrapper'>
    <input type="text" name='quiz' className='searchField' onInput={searchHandler} placeholder="search..."/>&nbsp;&nbsp; in &nbsp;&nbsp;
    <select onChange = {(e) => setSearchBy(e.target.value)}>
          <option value='quizName'>Quiz</option>
          <option value='name'>Name</option>
          <option value='email'>Email</option>
        </select>
    <hr/>
        <div className='quizesTableDiv'>
             <table className='quizTable'>
              <tbody>
                <tr key='quizHeader'>
                    <th>#</th>
                    <th><div className='sorting' name='questionsLength' onDoubleClick={(e) => sortingBy(e, 'quizName')}>Quiz</div></th>
                    <th><div className='sorting' name='questionsLength' onDoubleClick={(e) => sortingBy(e, 'name')}>Name</div></th>
                    <th><div className='sorting' name='questionsLength' onDoubleClick={(e) => sortingBy(e, 'email')}>Email</div></th>
                    <th><div className='sorting' name='questionsLength' onDoubleClick={(e) => sortingBy(e, 'percentage')}>Result</div></th>
                    <th>Pdf</th>
                </tr>


                {changedStudents.map((student, i) => (
                    <tr key={`1${i}`}>
                        <td>{i + 1}</td>
                        <td>{student.quizName}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td><div onDoubleClick={(e) => sortingBy(e, 'percentage')}>{student.score} ({student.percentage}%)</div></td>
                        <td><button className='getLinkBtn' onClick={(e)=>openPdf(e,{email : student.email ,
                                                            userName: student.name,
                                                            quiz_json:student.result_json,
                                                            quizId:student.quizId,
                                                            result:student.result,
                                                            quizName:student.quizName,
                                                            date:student.date,
                                                            score:student.score,
                                                            percentage:student.percentage,
                                                            creator: id
                             })}>
                            Open 
                            </button>
                         </td>
                    </tr>
                ))}

                 <tr key='quizHeader2'>
                    <td colSpan='7'>
                        {/* <div className='tablePaging'>
                            <div> show per page&nbsp;
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
                            {page + 1}-{rowperpage + page > quizes.length ? quizes.length : rowperpage + page} from {quizes.length}
                        </div> */}
                    </td>

                </tr> 

                </tbody>
            </table>
        </div>
        </div></>
        : 'There is no students yet.'
        }

        </>
    )

}
export default StuResults;