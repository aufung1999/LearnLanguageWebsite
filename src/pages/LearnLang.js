import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, json } from "react-router-dom";

import { collection, getDocs, addDoc, setDoc } from "firebase/firestore";

import { db } from "../Firebase";

function LearnLang() {
  const navigate = useNavigate();

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <div className="">
        <div>LearnLang</div>
        {/* <div className='btn-toolbar' role="toolbar"> */}

        <div className="border justify-content-center p-5">
          <div className="border d-grid gap-3">
            <button
              className="btn mx-auto border"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </button>
            <button
              className="btn mx-auto border "
              onClick={() => {
                navigate("/wordlist");
              }}
            >
              WordList
            </button>
          </div>
        </div>

        <div className="border justify-content-center flex-wrap p-5">
          <div>Mini-game</div>
          <button
            className="btn mx-auto border"
            onClick={() => {
              navigate("/findword");
            }}
          >
            Find Word in a Picture
          </button>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
}

export default LearnLang;
