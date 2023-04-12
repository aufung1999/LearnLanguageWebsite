import { useState } from "react";
import AddLangBtn from "../component/AddLangBtn";
import EditLangBtn from "../component/EditLangBtn";

import { colRef } from "../Firebase";

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// import styles from "./Home.css";
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
    <div className="vh-100 border border-secondary  d-flex justify-content-center flex-column">
      <div className="container">
        <div className="row  ">
          <div className="col-4 d-flex justify-content-end  border-5 ">
            <h2 className="border border-bottom-0 border-start-0 d-inline-flex justify-content-end ">
              <div className="font-italic">Welcome to</div>
            </h2>
          </div>
          <div className="col-8 d-flex justify-content-start  border-2">
            <div className="border border-start-0 border-top-0 border-end-0">
              <h1>Self-Learning Website</h1>
            </div>
          </div>
          {/* <div className="col-2 align-self-end"></div> */}
        </div>
      </div>

      <div className="border border-0 container ">
        <div className="row border  border-0 my-5">
          <div className="col border border-0 d-flex justify-content-end ">
            <EditLangBtn />
          </div>
          <div className="col-2"></div>
        </div>

        <div className="row border border-0 my-5">
          <div className="border border-0  d-flex justify-content-center flex-wrap">
            <AddLangBtn />
          </div>
        </div>

        <div className="row border border-0 my-5">
          <div className="border border-0  d-flex justify-content-center">
            <div className="z-n1 shadow bg-gradient-primary rounded-circle p-1">
              <button
                type="button"
                style={{
                  padding: "auto",
                  margin: "auto",
                  // borderColor: "rgba(0,255,0, 0.1)",
                  boxShadow: "0 0 10px rgba(255,255,255, 0.5)",
                  backgroundColor: "rgba(0,255,0, 0)",
                }}
                className="z-1 btn mb-2 mb-md-0 btn-light btn-block border-50 text-secondary rounded-circle btn-lg "
                onClick={() => setIsBtnClicked(true)}
              >
                +
              </button>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default Home;
