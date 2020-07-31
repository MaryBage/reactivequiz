import React, { useState, useEffect, useRef } from 'react'
import {RadioGroup, Radio, FormControl, FormControlLabel,FormLabel} from '@material-ui/core';
import Highlight, { defaultProps } from "prism-react-renderer";
//import theme from "prism-react-renderer/themes/nightOwl";
import ApproveButton from '../DetailedComponents/Buttons/ApproveButton/ApproveButton';


export default function Flashcard({ flashcard }) {
console.log(flashcard);
    const exampleCode = `
    var x = new Array();

    function foo(){
        x++;
        this.x = x;
        let y = 0;
        return foo;
    }
    var bar = new new foo;
    console.log(bar.x);
`;
 




  return (
    <div className="main">
      <div className="question" value={flashcard.questionId} >
        {flashcard.question}
        {flashcard.code?
                <Highlight {...defaultProps} code={flashcard.code} language="javascript">
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

        <FormControl component="fieldset">
                    
                    <RadioGroup aria-label="quiz" name="quiz" >
                    {flashcard.options.map(option => {
            return <FormControlLabel value={option} control={<Radio />} key={option} label={option} />
          })}
                    </RadioGroup>
                </FormControl>
       
        </div>
      
     
    </div>
  )
}