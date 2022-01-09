import React from "react";

const ButtonClear = ({handleCompleted}) => {
  return(
    <button style={{margin: '20px'}} onClick={handleCompleted}>Clear Completed</button>
  )
}

export default ButtonClear;