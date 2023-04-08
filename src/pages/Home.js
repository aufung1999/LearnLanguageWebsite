import { useState } from "react";
import AddLangBtn from "../component/AddLangBtn";
import EditLangBtn from "../component/EditLangBtn";

import { colRef } from "../Firebase";

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

import "./Home.css";
import { FrameRootRootRoot1 } from "./FrameRootRootRoot1";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const sendData = (e) => {
    e.preventDefault();
    console.log(inputValue);
    addDoc(colRef, {
      Language: inputValue,
    });
    setIsBtnClicked(false);
    setInputValue("");
  };

  return (
    <>
      <h1>Home</h1>

      <EditLangBtn />

      <div className="d-flex justify-content-center flex-wrap">
        <AddLangBtn />
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn mb-2 mb-md-0 btn-outline-light btn-block border-50 text-secondary rounded-circle btn-lg"
          onClick={() => setIsBtnClicked(true)}
        >
          +
        </button>
      </div>

      {isBtnClicked && (
        <form
          className="d-flex justify-content-center"
          onSubmit={(e) => sendData(e)}
        >
          <input
            type="text"
            className="form-control"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <input
            type="submit"
            className="btn mb-2 mb-md-0 btn-outline-light btn-block border-50 text-secondary "
          ></input>
        </form>
      )}

      {/* <FrameRootRootRoot1 /> */}
    </>
  );
};

export default Home;
