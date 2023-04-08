import React, { useEffect, useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import { db } from "../Firebase";

import Home from "../pages/Home";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import DeleteBtn from "./DeleteBtn";
import LearnLang from "../pages/LearnLang";
import { useDispatch } from "react-redux";

function AddLangBtn() {
  const [getLangfromFB, setGetLangfromFB] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  let temp_data = [];

  const colRef = collection(db, "Language");

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      snapshot.forEach((doc) =>
        temp_data.push({ Language: doc.data()["Language"], id: doc.id })
      );
      console.log("temp data: " + temp_data);
      setGetLangfromFB(temp_data);
      temp_data = [];
    });
  }, [db]);

  const navigateLL = (id) => {
    console.log("id: " + id);
    dispatch({ type: "LangIDRedux", payload: id });
    navigate("/wordlist");
  };

  return (
    <>
      {console.log("*************In REURN*************")}
      {console.log("getLangfromFB: " + getLangfromFB)}
      {getLangfromFB &&
        getLangfromFB.map((element) => {
          return (
            <div className="d-flex justify-content-around" key={element.id}>
              <button
                type="button"
                className="btn mb-2 mb-md-0 btn-round btn-outline-light btn-block border-50 text-secondary "
                key={element.id}
                onClick={() => navigateLL(element.id)}
              >
                {element["Language"]}
              </button>
              <DeleteBtn Language={element["Language"]} id={element.id} />
            </div>
          );
        })}
    </>
  );
}

export default AddLangBtn;
