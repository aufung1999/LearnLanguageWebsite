import React from 'react'
import { useSelector } from 'react-redux';
import {Routes, Route, useNavigate, json} from 'react-router-dom';

import {
    collection, getDocs,
    addDoc, setDoc
  } from "firebase/firestore"

import { db } from '../Firebase';

function LearnLang() {
    const navigate = useNavigate();

    const LangID = useSelector(state => state.LangID)

  return (
    <>
        <div>LearnLang</div>
        {/* <div className='btn-toolbar' role="toolbar"> */}
            <div className="d-grid gap-3" >
                <button className="btn mx-auto border" onClick={()=>{navigate("/")}}>Home</button>
                <button className="btn mx-auto border" onClick={()=>{navigate("/wordlist")}}>WordList</button>
            </div>



        {/* </div> */}
    </>

  )
}

export default LearnLang