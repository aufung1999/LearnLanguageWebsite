import React from "react";
import { useNavigate } from "react-router";
import ClockScript from "../component_FindWord/ClockScript";
import ShowWords_MS from "../component_MakeSentence/ShowWords_MS";

function MakeSentence() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="h2 border border-5 border-top-0 border-end-0 mt-2 mb-4">
        <div className="ms-3">Make a Phrase</div>
      </div>

      <div className="row border border-0 justify-content-center mb-4">
        <button
          className="col-2 btn border me-5 shadow bg-gradient-primary rounded p-2"
          onClick={() => {
            navigate("/wordlist");
          }}
        >
          Word List
        </button>
      </div>

      {/* <ClockScript/> */}
      <ShowWords_MS />
    </div>
  );
}

export default MakeSentence;
