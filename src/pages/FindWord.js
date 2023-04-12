import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClockScript from "../component_FindWord/ClockScript";
import EachOption from "../component_FindWord/EachOption";
import { findWords_action, selectWords_action } from "../store/actions/actions";

function FindWord() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const Words = useSelector((state) => state.Words);
  const findWords = useSelector((state) => state.findWords);

  const [words, setWords] = useState(null);
  const [wordsNo, setWordsNo] = useState(null);

  const [totalWords, setTotalWords] = useState(null);
  const [randomWords, setRandomWords] = useState(null);

  const [selectWords, setSelectWords] = useState([]);
  const [countDown, setCountDown] = useState(1000); // Time COUNT here

  const [isStart, setIsStart] = useState(false);

  const getWords = () => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++");

    console.log("Words: " + JSON.stringify(Words.length, null, 1));

    const min = 1;
    const max = Words.length;

    let array = [];
    let rand = min + Math.random() * (max - min);

    console.log("array: " + array.length);

    if (rand > 10) {
      rand = 10;
    }

    console.log("rand: " + Math.floor(rand));
    while (array.length <= Math.floor(rand)) {
      let index = Math.floor(Math.random() * (max - min));
      console.log("=============================");
      console.log("index: " + index);
      if (array.includes(Words[index])) {
        break;
      }

      array.push(Words[index]);
      console.log("=============================");
    }
    console.log("array LENGTH: " + JSON.stringify(array, null, 1));
    console.log("+++++++++++++++++++++++++++++++++++++++++++++ ");

    setWords(array);
    setWordsNo(array.length);
  };
  const getRandomWords = async () => {
    setTotalWords(null);

    const data = await (
      await fetch("https://random-word-api.vercel.app/api?words=10")
    ).json();

    // console.log("data: " + JSON.stringify(data, null, 1));
    if (words) {
      setTotalWords([...data, ...words]);
    }
  };

  const Randomize = () => {
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    const randomed_array = shuffle(totalWords);
    setRandomWords(randomed_array);
  };

  //------------------------(FOR the Randomized Words)-------------------------------------------------------

  useEffect(() => {
    getWords();
    getRandomWords();
    dispatch(findWords_action(words));
  }, [isStart]);

  useEffect(() => {
    if (totalWords !== null) {
      Randomize();
    }
  }, [totalWords]);

  //-------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------
  useEffect(() => {
    console.log("countDown: " + countDown);
    if (countDown === 0) {
      dispatch(selectWords_action(selectWords));
      navigate("/find-word-result");
    }
  }, [countDown]);
  //-------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------
  //for Console.log CHECK
  useEffect(() => {
    console.log("selectWords: " + JSON.stringify(selectWords, null, 1));
  }, [selectWords]);
  //-------------------------------------------------------------------------------

  return (
    <div className="container">
      <div className="h2 border border-5 border-top-0 border-end-0 mt-2 mb-4">
        <div className="ms-3">Find the Word</div>
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

      <button
        className="col-2 btn border me-5 shadow bg-gradient-primary rounded p-1"
        onClick={() => setIsStart(true)}
      >
        Start
      </button>

      {findWords && (
        <div>
          <div>You need to find {findWords.length} word(s)</div>
          <ClockScript setCountDown={setCountDown} countDown={countDown} />
        </div>
      )}

      <div className="container border d-flex flex-row">
        {randomWords?.map((each, index) =>
          index % 3 === 0 ? (
            <div key={index} className="row">
              <EachOption
                randomWords={randomWords}
                index={index + 0}
                VARIANT={0}
                setSelectWords={setSelectWords}
                selectWords={selectWords}
                // checkTheSelection={checkTheSelection}
              />
              <EachOption
                randomWords={randomWords}
                index={index + 1}
                VARIANT={1}
                setSelectWords={setSelectWords}
                selectWords={selectWords}
                // checkTheSelection={checkTheSelection}
              />
              <EachOption
                randomWords={randomWords}
                index={index + 2}
                VARIANT={2}
                setSelectWords={setSelectWords}
                selectWords={selectWords}
                // checkTheSelection={checkTheSelection}
              />
              <EachOption
                randomWords={randomWords}
                index={index + 3}
                VARIANT={3}
                setSelectWords={setSelectWords}
                selectWords={selectWords}
                // checkTheSelection={checkTheSelection}
              />
            </div>
          ) : null
        )}
      </div>

      <div>
        {selectWords?.map((each, index) =>
          index < wordsNo ? (
            typeof selectWords.at((index + 1) * -1) === "object" ? (
              <div>{selectWords.at((index + 1) * -1).Word}</div>
            ) : (
              <div>{selectWords.at((index + 1) * -1)}</div>
            )
          ) : null
        )}
      </div>
    </div>
  );
}

export default FindWord;
