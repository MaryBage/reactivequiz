import React from "react"

const Slogan = (props) => {
    const text = props.sloganText;  // "becoming reactive experts", "it’s great to see you here", "a quiz, test your skills", 
                                    // "a quiz, share your experience", "us, motivate and inspire", "us how we are doing"
    return (
        <div className="slogan">{text}</div>
    )
}

export default Slogan;