import React from "react";

const Filters = (props) => {
  return (
    <>
      <form action="" className="filterForm" style={{ flexGrow: 1 }}>
        <input
          type="text"
          name="question"
          onInput={props.onChangeHandler}
          placeholder="search..."
        />
        <select name="category" onChange={props.onChangeHandler}>
          <option value="">category</option>
          {props.options.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select name="difficulty" onChange={props.onChangeHandler}>
          <option value="">level</option>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <select name="type" onChange={props.onChangeHandler}>
          <option value="">type</option>
          <option value="single">single</option>
          <option value="multiple">multiple</option>
        </select>
      </form>
    </>
  );
};

export default Filters;
