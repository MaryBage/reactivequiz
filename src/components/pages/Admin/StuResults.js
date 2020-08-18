import React,{useEffect, useContext} from 'react'
import './Admin.css'
import { DbContext } from "./context/database/dbContext"

const StuResults = () => {

    const {getStudents, students} = useContext(DbContext);

    useEffect(() => {
        getStudents();
      // eslint-disable-next-line
    }, [])

return (
    <>
    {students.length ?
    <div className='quizesWrapper'>
        <div className='quizesTableDiv'>
             <table className='quizTable'>
              <tbody>
                <tr key='quizHeader'>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Result</th>
                    <th>Pdf link</th>
                   
                </tr>


                {students.map((student, i) => (
                    <tr key={`1${i}`}>
                        <td>{i + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.result}</td>
                        <td>{student.result_json}</td>
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
        </div>
        : 'There is no students yet.'
        }

        </>
    )

}
export default StuResults;