import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
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
    await addDoc(docRef, {
      word: inputValue,
      tag: selectedTag,
      count: 0,
      createdAt: serverTimestamp(),
    }); //        ** can edit in the future

    console.log(selectedTag, inputValue);
  };

  return (
    <div className="container">
      <div className="h2 border border-5 border-top-0 border-end-0 mt-2 mb-4">
        WordList
      </div>

      <div className="row border border-0 justify-content-center mb-4">
        <button
          className="col-2 btn border me-5 shadow bg-gradient-primary rounded p-2"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <button
          className="col-2 btn border me-5 shadow bg-gradient-primary rounded p-2"
          onClick={() => {
            navigate("/makesentence");
          }}
        >
          Make a Phrase
        </button>
        <button
          className="col-2 btn border me-5 shadow bg-gradient-primary rounded p-2"
          onClick={() => {
            navigate("/find-word");
          }}
        >
          Find the Words
        </button>
      </div>

      <br />

      <div className="border border-5 p-5 shadow">
        <form
          className="row justify-content-center"
          onSubmit={(e) => addTagstoDB(e)}
        >
          <div className="col"></div>
          <div className="col form-floating mb-3">
            <input
              type="text"
              className="form-control border-0 shadow-sm "
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
            ></input>
            <label
              htmlFor="floatingInput"
              className="d-flex justify-content-center"
            >
              Word Tag
            </label>
          </div>
          <div className="col">
            <input
              type="submit"
              className="col btn mb-2 mb-md-0 btn-outline-light btn-block border-50 text-secondary"
              onClick={() => {
                setIsClicked(!isClicked);
              }}
            />
          </div>
          <div className="col"></div>
        </form>

        <div className="row">
          <ShowTags isClicked={isClicked} />
        </div>
      </div>

      <br />

      <div className="border border-5 p-4 shadow">
        <div className="row mb-3">
          <form
            className="d-flex justify-content-center mb-3"
            onSubmit={(e) => addWordstoDB(e)}
          >
            <div className="col"></div>
            <div className="col form-floating border-bottom d-flex align-items-center shadow me-3">
              <input
                type="text"
                className="form-control border-0 shadow-sm "
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <label
                htmlFor="floatingInput"
                className="d-flex justify-content-center"
              >
                Vocabulary
              </label>
            </div>

            {/* <div className="col"> */}
            <DropdownButton
              className="border border-0  d-flex align-items-center me-3"
              title="Tags"
            >
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
            {/* </div> */}

            <input
              type="submit"
              className="border border-0 shadow-sm d-flex align-items-center btn mb-2 mb-md-0 btn-outline-light btn-block border-50 text-secondary "
            ></input>

            <div className="col"></div>
          </form>
        </div>

        <div className="row row-cols-auto">
          <ShowWords isClicked={isClicked} />
        </div>
      </div>
    </div>
  );
}

export default WordList;
