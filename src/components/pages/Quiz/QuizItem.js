import React, { useState, useEffect, useRef } from 'react'
import {RadioGroup, Radio, FormControl, FormControlLabel,FormLabel} from '@material-ui/core';
import Highlight, { defaultProps } from "prism-react-renderer";
//import theme from "prism-react-renderer/themes/nightOwl";
import ApproveButton from '../DetailedComponents/Buttons/ApproveButton/ApproveButton';


export default function Quiz({ quiz }) {
console.log(quiz);
  return (
    <div className="main">
      <div className="question" value={quiz.questionId} >
        {quiz.question}
        {quiz.code?
                <Highlight {...defaultProps} code={quiz.code} language="javascript">
                    {({ className, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className}>
                        {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => {
                                const updatedTokenProps = {...getTokenProps({ token, key })};
                            return <span children ={updatedTokenProps.children} className = {updatedTokenProps.className} key = {updatedTokenProps.key} />
                            })}
                        </div>
                        ))}
                    </pre>
                    )}
                </Highlight>
                : ''}
            
        </div>
        <div className="answer">
            
            {quiz.options.map((option,i) => {
            return <div>
              <input type={quiz.type=='single' ? 'radio' : 'checkbox'} name={`answrOf${quiz.questionId}`} value={option} key={option} id={quiz.questionId+i} />
              <label for={quiz.questionId+i}>{option}</label>
            </div>
          })}
        </div>
    </div>
  )
}