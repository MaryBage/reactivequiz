import React from "react";
import s from "../Question/Questions.module.css";

const Filters = (props) => {

  return (
    <>
      <form action="" className={s.filters}>
        <input type="text" className={s.search} onChange={props.onSearch} placeholder="search" />
        <div className={s.selectsWrapper}>
          <select name="category" id="">
            {props.options.map(e => <option value={e}>{e}</option>)}
          </select>
          <select name="" id="">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </form>
    </>
  )
}

export default Filters;
