import { doc, deleteDoc } from "firebase/firestore";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase";

function DeleteWord({ Word, index, parent_editBtn, set_parent_editBtn }) {
  const LangID = useSelector((state) => state.LangID); // Redux

  const [deleteBtn, setDeleteBtn] = useState(false); // Only exist here, Local Variable

  const deleteWord = () => {
    console.log("-----------Delete Btn Clicked-----------");
    setDeleteBtn(!deleteBtn);
    set_parent_editBtn(!parent_editBtn);
    console.log("deleteWordBtn: " + deleteBtn);
  };

  useEffect(() => {
    if (deleteBtn) {
      const thedocRef = doc(db, "Language/", LangID, "/words/", Word.WordID);
      // console.log("delete BTN docREF: " + JSON.stringify(thedocRef))

      deleteDoc(thedocRef);
    }
  }, [deleteBtn]);

  return (
    <div className="col m-1 p-2 border border-0">
      <button
        style={{
          borderColor: "rgba(0,0,0, 0.1)",
          boxShadow: "0 0 5px rgba(255,0,0, 0.5)",
          backgroundColor: "rgba(255,0,0, 0.1)",
        }}
        onClick={deleteWord}
        key={"DeleteBtn-" + index}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteWord;
