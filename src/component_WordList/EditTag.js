import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase";

function EditTag({ tag, index, parent_editBtn, set_parent_editBtn }) {
  const LangID = useSelector((state) => state.LangID); // Redux
  const Words = useSelector((state) => state.Words); // Redux
  const TagID = useSelector((state) => state.TagID); // Redux
  const Tags = useSelector((state) => state.Tags); // Redux

  const [editBtn, setEditBtn] = useState(false);

  const [editTagInput, setEditTagInput] = useState(tag.Tag);

  const dispatch = useDispatch();

  const editTag = () => {
    console.log("Clciked: ");
    setEditBtn(!editBtn);
    dispatch({ type: "click-editBtn" });
  };

  const getRefTag = async () => {
    // Get a refernce tag so that in later section can apply the refence into the where clause
    const thedocRef = doc(db, "Language/", LangID, "/tags/", tag.TagID);

    const docSnap = await getDoc(thedocRef);

    console.log("docSnap: " + JSON.stringify(docSnap.data()["tag"]));

    let wordID_list = [];

    const filtered_Words = Words.filter((word) => {
      console.log("Map: " + word["Tag"]);
      if (word["Tag"] === docSnap.data()["tag"]) {
        wordID_list.push(word["WordID"]);
      }
      return word["Tag"] === docSnap.data()["tag"];
    });

    console.log("filtered_Words: " + JSON.stringify(filtered_Words));
    if (filtered_Words === []) {
    } else {
      dispatch({
        type: "updateWordsTag",
        payload: { wordID_List: wordID_list, updateTagValue: editTagInput },
      });
    }
  };

  const editTaginDB = (e) => {
    e.preventDefault();

    const thedocRef = doc(db, "Language/", LangID, "/tags/", tag.TagID);

    // console.log('thedocRef: '+ thedocRef);

    //Before it updates, get the YET-update data
    updateDoc(thedocRef, { tag: editTagInput });

    getRefTag();

    setEditTagInput("");
  };

  return (
    <p className="col m-1 p-2 ">
      {editBtn === false && (
        <button
          onClick={editTag}
          key={"EditBtn-" + index}
          style={{
            //   padding: "auto",
            //   margin: "auto",
            borderColor: "rgba(0,0,0, 0.1)",
            boxShadow: "0 0 5px rgba(0,255,0, 0.5)",
            backgroundColor: "rgba(0,255,0, 0.1)",
          }}
          className="mb-2"
        >
          Edit
        </button>
      )}
      {editBtn && (
        <div className="shadow w-100" key={"editTagInput-" + tag.Tag}>
          <button
            onClick={editTag}
            key={"EditBtn-" + index}
            style={{
              //   padding: "auto",
              //   margin: "auto",
              borderColor: "rgba(0,0,0, 0.1)",
              boxShadow: "0 0 5px rgba(0,255,0, 0.5)",
              backgroundColor: "rgba(0,255,0, 0.1)",
            }}
            className="mb-2"
          >
            Hide
          </button>
          <form onSubmit={(e) => editTaginDB(e)}>
            <input
              type="text"
              value={editTagInput}
              className="border-bottom mb-2"
              onChange={(e) => setEditTagInput(e.target.value)}
            />
            <input
              type="submit"
              onClick={() => set_parent_editBtn(!parent_editBtn)}
            ></input>
          </form>
        </div>
      )}
    </p>
  );
}

export default EditTag;
