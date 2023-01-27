import React from 'react'
import { useNavigate } from 'react-router'
import ShowWords_MS from '../component_MakeSentence/ShowWords_MS';

function MakeSentence() {
    const navigate = useNavigate();

  return (
    <div>
        <button className="btn mx-auto border" onClick={()=>{navigate("/wordlist")}}>Word List</button>
        <ShowWords_MS/>
    </div>
  )
}

export default MakeSentence