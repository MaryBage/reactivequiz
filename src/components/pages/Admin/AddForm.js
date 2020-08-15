import React, { useState, useContext} from 'react'
import { DbContext } from './context/database/dbContext';
import './Admin.css'
import { useForm } from "react-hook-form";
import {withRouter} from 'react-router-dom'


const AddForm = (props) => {

    const answers = new Array(5).fill(1);
    const {addData} = useContext(DbContext);

    const { register, handleSubmit } = useForm();
    const [addValidation, setAddValidation] = useState({ validation: false, error:'', success: false})
    const [qstnType, setQstnType] = useState('single')
    const [qstnPoint, setQstnPoint] = useState('')

    const qstnTypeChangeHandler = (e) => {
        setQstnType(e.target.value);
        setAddValidation({...addValidation,success: false })
    }
    const pointChangeHandler = e => {
        setQstnPoint(e.target.value)
        setAddValidation({...addValidation,success: false })
    }
    const sbmtHandler = data => {
 
        const myData = {
            question: data.question, 
            code: data.code, 
            qstnType: data.qstnType, 
            category: data.category,
            difficulty: data.difficulty,
            answers: []
        }

        let validation = true;
        let error = '';
        let myType = new Array(data.answer.length).fill(false)
        let myPoint = new Array(data.answer.length).fill(0)

        if(typeof data.type == 'string') {
            myType[+data.type] = !!data.type;
        }
        else {
            myType = data.type.map(e => !!e);
        }

        if(typeof data.point == 'string' ) {
            if(data.qstnType == 'multiple'){
               const cnt =  myType.filter(e => e).length
               myPoint = myType.map(e => !!e * data.point/cnt)
            }
            else {
             myPoint[+data.type] = parseFloat(data.point)
            }
        }
        else {
            myPoint = data.point
        }


        if(!data.question){
            error += 'Question field is empty.\n'
            validation = false;
         } 
        if(data.answer.filter(e => e).length < 2){
            error += 'It should be minimum 2 answers.\n'
            validation = false;
        }
        if(!myType.some(e => e) ){
            error += 'There is no right answer.\n'
            validation = false;
        }
        if(myPoint.every(e => !e)){
            error += 'There is bo point for this question.\n'
            validation = false;
        }

        if(!myType.map((e,i) => e ? i : null).filter(e => e!=null).every(e => data.answer[e])){
            error += 'Right answer text is empty.\n'
            validation = false;
        }
 
        setAddValidation({...addValidation, validation, error})

        if(validation) {
            data.answer.map((e,i) => {
                myData.answers.push({answer: e, point: myPoint[i], type: myType[i] })
            })
            addData(myData);

            setAddValidation({...addValidation, validation, error, success: true})
        }
    } 

    

return (
        <div className='addForm'>
                <div className='centerAdm'>   <h3>Add question</h3></div>
                <form  onSubmit={handleSubmit(sbmtHandler)} onReset={() => {
                    setAddValidation({...addValidation, success: false})
                    setQstnPoint(1)
                    setQstnPoint('')}}>
                    
                    { addValidation.error 
                    ? addValidation.error.split ('\n').map ((item, i) => (
                              <span style={{color:'red'}} key={i}>{item}</span>))
                    : addValidation.success
                       ? <span className='successAnim' style={{color:'green'}}>Question is successfully added! Click to reset&nbsp;<input type='reset' value='&#8634;' name='reset' /></span>
                        : null } 
                    
                 
                <div className='row'> <input ref={register} className='wideRow' type='text' name='question' placeholder='Enter a question' onChange={() => setAddValidation({...addValidation,success: false })}  /></div>
                <div className='row'> <textarea  ref={register} cols='50' rows='4' name='code' placeholder='Code here' onChange={() => setAddValidation({...addValidation,success: false })} /></div>
                <div className='row'> <input ref={register} type='text' name='category' placeholder='Enter a category' onChange={() => setAddValidation({...addValidation,success: false })} />
                <select name='difficulty' ref={register} onChange={qstnTypeChangeHandler}>
                        <option value='Easy'>easy</option>
                        <option value='Medium'>medium</option>
                        <option value='Hard'>hard</option>
                    </select>
       
                 <select name='qstnType' ref={register} onChange={qstnTypeChangeHandler} >
                        <option value='single'>single</option>
                        <option value='multiple'>multiple</option>
                    </select>
         
  <input type='number' ref={register}  name='point'  step='1' onChange={pointChangeHandler} placeholder='Score'/> 
                  </div>
                    {answers.map((_, i) => <div className='row'> 
                    {qstnType ==='single' ? 
                            <input ref={register} 
                            type='radio' 
                            key={`2${i}`} 
                            name='type'
                            value={i}
                            onChange={() => setAddValidation({...addValidation,success: false })}
                                /> 
                            :
                            <input ref={register} 
                            type='checkbox'
                            key={`3${i}`} 
                            name={`type[${i}]`}
                            value={i}
                            onChange={() => setAddValidation({...addValidation,success: false })}
                                /> 
                    }
                        
                        
                        &nbsp;
                        <input type='text' className='wideRow' ref={register}  key={`1${i}`} name={`answer[${i}]`}  onChange={() => setAddValidation({...addValidation,success: false })}/> &nbsp;
                        {qstnPoint ? null : <input type='number'  ref={register} key={`4${i}`} size='1' name={`point[${i}]`}   step='0.2' onChange={() => setAddValidation({...addValidation,success: false })} />} 
                        </div>) }

                        <div className='centerAdm'><input value='Add question' type='submit' 
                        name='submit'
                         /> </div>
    
                </form>
            
        </div>

    )

}
export default withRouter(AddForm);