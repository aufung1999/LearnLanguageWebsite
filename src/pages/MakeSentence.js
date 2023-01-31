import React from 'react'
import { useNavigate } from 'react-router'
import ClockScript from '../component_MakeSentence/ClockScript';
import ShowWords_MS from '../component_MakeSentence/ShowWords_MS';

function MakeSentence() {
    const navigate = useNavigate();

  return (
    <div>
        <button className="btn mx-auto border" onClick={()=>{navigate("/wordlist")}}>Word List</button>
        <ClockScript/>
        <ShowWords_MS/>
    </div>
  )
}

export default MakeSentence