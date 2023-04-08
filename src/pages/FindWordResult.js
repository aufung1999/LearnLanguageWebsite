import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FindWordResult() {
  const navigate = useNavigate();
  const findWords = useSelector((state) => state.findWords);
  const selectWords = useSelector((state) => state.selectWords);

  const [result, setResult] = useState("");

  console.log("findWords: " + findWords);

  useEffect(() => {
    const findWordsID = findWords.map((each) => each.WordID);
    const selectWordsID = selectWords.map((each) => each.WordID);

    console.log("findWordsID: " + findWordsID);
    console.log("selectWordsID: " + selectWordsID);

    function arrayEquals(a, b) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }

    if (arrayEquals(findWordsID, selectWordsID)) {
      setResult("Correct");
    } else {
      setResult("Wrong");
    }
  }, []);

  return (
    <div className="container border">
      <div class="row">
        <div className="col">
          <button
            className="col-2 btn border me-5"
            onClick={() => {
              navigate("/wordlist");
            }}
          >
            Word List
          </button>
        </div>
      </div>
      <div class="row border">
        <div className="col">
          {result === "Correct" && <div>Congratulations! You Found Them!</div>}
        </div>
      </div>
      <div class="row border">
        <div className="col">
          {result === "Wrong" && <div>You could not find the Words</div>}
        </div>
      </div>
    </div>
  );
}

export default FindWordResult;
