import React  from "react";

import { DbContext } from '../context/database/dbContext';



 const Filters = (props) => {



  return (
    <>
      <form action="" className=''>
        <input type="text" onChange={props.onSearch}/>
        <select name="category" id="">
        {props.options.map(e=><option  value={e}>{e}</option>)}
        </select>
        <select name="" id="">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      
      </form>
    </>
  );
};

export default Filters;
