import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { temp_addData } from "../store/actions/actions";

import * as uuid from "uuid";

function ExtraWords({ element, index }) {
  const LangID = useSelector((state) => state.LangID);
  const selected = useSelector((state) => state.Selected.selected); //      \ C   m   i   a   i   n

  const dispatch = useDispatch(); // Redux

  let this_uuid = uuid.v4(); // need to adjust although its not affectin the whole system now THE uuid

  const selected_words = selected?.map((word) => {
    return word.Word;
  });
  // console.log('this_uuid: '+ selected_words);

  const addToSelected = async (e) => {
    e.preventDefault();

    dispatch({
      type: "Add_selected",
      payload: { Word: element["word"], WordID: "ExtraWord" },
    }); // need to adjust although its not affectin the whole system now

    // dispatch( {type:"Add_selectedArrayID", payload: this_uuid } )                // need to adjust although its not affectin the whole system now
  };

  return (
    <div
      key={"extra-words-" + element["word"] + "-" + index}
      className="col h-100"
    >
      <button
        style={{
          boxShadow: "0 0 5px rgba(0,255,255, 0.5)",
          backgroundColor: "rgba(0,255,255, 0.05)",
        }}
        className={
          selected_words.includes(element["word"])
            ? "invisible"
            : "visible border"
        }
        onClick={(e) => addToSelected(e)}
      >
        {element["word"]}
      </button>
    </div>
  );
}

export default ExtraWords;
