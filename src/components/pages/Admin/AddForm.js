import React from 'react'
import './Admin.css'

const AddForm = () => {

    const answers = new Array(5).fill(1);

    const sbmtHandler = (e) => {
        e.preventDefault();
        console.log('form submit')
    }
    

return (
        <>
            <form className='addForm' onSubmit={sbmtHandler}>
            <div className='row'> question &nbsp; <input size='100' type='text' name='question' /></div>
            <div className='row'>  code &nbsp; <textarea   cols='50' rows='7' name='code' /></div>
                {answers.map((_, i) => <div className='row'> answer #{i+1}   &nbsp;
                    <input type='text' size='100' name='answer[]' /> &nbsp;
                    <input type='checkbox'  name='answerChk[]' /> &nbsp;
                    <input type='number' size='1' name={`point${i+1}`} step='0.2' /> 
                    </div>) }

            <div className='row'>  <input value='Add question' type='submit' name='question' /></div> 
 
            </form>
        </>

    )

}
export default AddForm;