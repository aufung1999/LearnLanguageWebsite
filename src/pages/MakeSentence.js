import React from 'react'
import { useNavigate } from 'react-router'
import ShowWords from '../component_MakeSentence/ShowWords';

function MakeSentence() {
    const navigate = useNavigate();

  return (
    <div>
        <button className="btn mx-auto border" onClick={()=>{navigate("/wordlist")}}>Word List</button>
        <ShowWords/>
    </div>
  )
}

export default MakeSentence