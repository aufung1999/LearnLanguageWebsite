import { Dropdown, DropdownButton } from "react-bootstrap";
import { addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ShowTags from "../component_WordList/ShowTags";

import { db } from "../Firebase";
import { useNavigate } from "react-router";
import ShowWords from "../component_WordList/ShowWords";

function WordList() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const [isClicked, setIsClicked] = useState(false);

  const LangID = useSelector((state) => state.LangID);
  const Tags = useSelector((state) => state.Tags);

  localStorage.setItem("LangID", LangID);

  async function addTagstoDB(e) {
    e.preventDefault();

    const docRef = collection(db, "Language/" + LangID + "/tags");
    await addDoc(docRef, { tag: tagValue }); //        ** can edit in the future

    console.log("Tag: ", tagValue);
  }

  const addWordstoDB = async (e) => {
    e.preventDefault();

    const docRef = collection(db, "Language/" + LangID + "/words");
    await addDoc(docRef, { word: inputValue, tag: selectedTag, count: 0, createdAt: serverTimestamp() }); //        ** can edit in the future

    console.log(selectedTag, inputValue);
  };

  return (
    <div className="container">
      <div className="h1">WordList</div>

      <div className="row justify-content-center">
        <button
          className="col-2 btn border"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <button
          className="col-2 btn border"
          onClick={() => {
            navigate("/makesentence");
          }}
        >
          Make Sentence
        </button>
      </div>

      <br />

      <div className="row justify-content-center">
        <form onSubmit={(e) => addTagstoDB(e)}>
          <input
            type="text"
            className="col"
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
          ></input>
          <input
            type="submit"
            className="col btn mb-2 mb-md-0 btn-outline-light btn-block border-50 text-secondary"
            onClick={() => {
              setIsClicked(!isClicked);
            }}
          ></input>
        </form>
      </div>

      <div className="row">
        <ShowTags isClicked={isClicked} />
      </div>

      <br />

      <div className="row">
        <form className="d-flex " onSubmit={(e) => addWordstoDB(e)}>
          <input
            type="text"
            className=""
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>

          <DropdownButton title="Tags">
            {Tags?.map((Tag) => {
              return (
                <Dropdown.Item
                  value={Tag.Tag}
                  onClick={() => setSelectedTag(Tag.Tag)}
                  key={Tag.TagID}
                >
                  {Tag.Tag}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>

          <input
            type="submit"
            className="btn mb-2 mb-md-0 btn-outline-light btn-block border-50 text-secondary "
          ></input>
        </form>
      </div>

      <div className="row row-cols-auto">
        <ShowWords isClicked={isClicked} />
      </div>
    </div>
  );
}

export default WordList;
