import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { getDocs, collection, doc, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import CheckSentence from "./CheckSentence";
import FetchDatamuse from "./FetchDatamuse";
import { random_Words } from "../store/actions/actions";
// import useRandomWords from './customHooks/useRandomWords';

function ShowWords_MS() {
  const LangID = useSelector((state) => state.LangID); // Redux
  const Words = useSelector((state) => state.Words); // Redux

  const Random_Words = useSelector((state) => state.Random_Words);

  localStorage.setItem("Random_Words", Random_Words);

  const selected = useSelector((state) => state.Selected.selected); //      \ C   m   i   a   i   n
  // const selectedArrayID = useSelector(state => state.Selected.selectedArrayID)    //      /   o   b   n   t   o

  const dispatch = useDispatch(); // Redux

  useEffect(() => {
    // Generate random number from the Words

    dispatch({ type: "reload_RandomWords" });

    Words?.map((word) => {
      dispatch(random_Words(word)); //do not only add the word.Word, but also the firebase document ID   change from word.Word --> word (which is the whole object including the fireBase document ID)
    });

    console.log("Random_Words: " + JSON.stringify(Random_Words));
  }, []);

  const selectedWord = (e, word) => {
    e.preventDefault();

    dispatch({ type: "Add_selected", payload: word });

    // dispatch( {type: 'Add_selectedArrayID', payload: word.WordID} )
  };

  const unselectedWord = (e, unselected_word) => {
    e.preventDefault();

    dispatch({ type: "Remove_selected", payload: unselected_word });

    // dispatch( {type: 'Remove_selectedArrayID', payload: unselected_word.WordID} )

    dispatch({ type: "-----Temp_wordsAssociation-----" });
  };

  useEffect(() => {
    console.log("selected: " + JSON.stringify(selected));
    // console.log('selectedArray*****ID: ' +JSON.stringify(selectedArrayID));
    console.log("++++++++++++++++++++++++++++++++++");
  }, [selected]);

  const selected_words = selected?.map((word) => {
    return word.Word;
  });

  return (
    <div className="container">
      <div className="row m-5 border-bottom d-flex justify-content-center">
        {Random_Words?.map((word, index) => {
          // Can edit here in the future

          return (
            <div className="col-auto mb-3">
              <div key={"Random_Words" + { index }}>
                <button
                  type="button"
                  // className="row rounded-pill d-flex justify-content-center p-3 mb-3"
                  style={{
                    boxShadow: "0 0 5px rgba(0,255,255, 0.5)",
                    backgroundColor: "rgba(0,255,255, 0.05)",
                  }}
                  className={
                    selected_words.includes(word.Word)
                      ? "invisible"
                      : "visible border d-flex justify-content-center p-3 me-3"
                  }
                  value={word.Word}
                  onClick={(e) => selectedWord(e, word)}
                  key={"Random_Words" + { index }}
                >
                  {word.Word}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row m-5">
        <FetchDatamuse Random_Words={Random_Words} />
      </div>

      <div className="row m-5 border-bottom">
        {selected?.map((selectedWord, index) => {
          console.log("selectedWord: " + selectedWord);

          return (
            <div className="col-auto" key={"selected" + index}>
              <button
                type="button"
                style={{
                        boxShadow: "0 0 12px rgba(255,165,0, 0.5)",
                        backgroundColor: "rgba(255,165,0, 0.1)",
                      }}
                className={
                  selected_words.includes(selectedWord.Word)
                    ? "visible border p-3"
                    : "invisible"
                }
                onClick={(e) => unselectedWord(e, selectedWord)}
                key={"selected" + index}
              >
                {selectedWord.Word}
              </button>
            </div>
          );
        })}
      </div>

      <div className="row m-5 ">
        <CheckSentence selected={selected} />
      </div>
    </div>
  );
}

export default ShowWords_MS;
