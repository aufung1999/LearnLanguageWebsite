import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase";
import { DropdownButton, Dropdown } from "react-bootstrap";

function EditWord({ Word, index, parent_editBtn, set_parent_editBtn }) {
  console.log(
    "================================================================"
  );

  const LangID = useSelector((state) => state.LangID); // Redux
  const TagID = useSelector((state) => state.TagID); // Redux
  const Tags = useSelector((state) => state.Tags); // Redux

  const dispatch = useDispatch(); // Redux

  const [editBtn, setEditBtn] = useState(false);

  const [editTagInput, setEditTagInput] = useState(Word.Word);

  const editWord = () => {
    console.log("editWord Clciked");
    setEditBtn(!editBtn);
  };

  const editWordinDB = (e) => {
    e.preventDefault();

    console.log("editTagInput: " + editTagInput);

    const thedocRef = doc(db, "Language/", LangID, "/words/", Word.WordID);

    // console.log('thedocRef: '+ JSON.stringify(thedocRef,null,1));

    updateDoc(thedocRef, { word: editTagInput });
  };

  const updateTaginWord = (selectedTag) => {
    let wordID_list = [];

    const thedocRef = doc(db, "Language/", LangID, "/words/", Word.WordID);
    updateDoc(thedocRef, { tag: selectedTag });

    wordID_list.push(Word.WordID);

    if (wordID_list === []) {
    } else {
      console.log("wordID_list: " + wordID_list);
      dispatch({
        type: "updateWordsTag",
        payload: { wordID_List: wordID_list, updateTagValue: selectedTag },
      });
    }
  };

  return (
    <div className="col m-1 p-2 border border-0">
      <button
        style={{
          //   padding: "auto",
          //   margin: "auto",
          borderColor: "rgba(0,0,0, 0.1)",
          boxShadow: "0 0 5px rgba(0,255,0, 0.5)",
          backgroundColor: "rgba(0,255,0, 0.1)",
        }}
        onClick={editWord}
        key={"EditBtn-" + index}
      >
        Edit
      </button>
      {editBtn && (
        <div key={"editWordInput-" + Word.Tag} className="shadow w-100">
          <form onSubmit={(e) => editWordinDB(e)} className="mb-2">
            <input
              type="text"
              value={editTagInput}
              onChange={(e) => setEditTagInput(e.target.value)}
              className="mb-2"
            />
            <input
              type="submit"
              onClick={() => set_parent_editBtn(!parent_editBtn)}
            />
          </form>
          <DropdownButton title={Word.Tag ? Word.Tag : ""}>
            {Tags?.map((Tag) => {
              return (
                <Dropdown.Item
                  value={Tag.Tag}
                  onClick={() => updateTaginWord(Tag.Tag)}
                  key={"Dropdown-" + Tag.TagID}
                >
                  {Tag.Tag}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      )}
    </div>
  );
}

export default EditWord;
