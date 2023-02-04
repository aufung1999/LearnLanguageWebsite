import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDatamuseAPIData } from "../store/actions/actions";
import useRandomWords from "./customHooks/useRandomWords";

import DisplayDatamuse from "./DisplayDatamuse";

function FetchDatamuse() {
  const Words = useSelector((state) => state.Words); // Redux
  const selected = useSelector((state) => state.Selected.selected);
  const Random_Words = useSelector((state) => state.Random_Words);

  const dispatch = useDispatch();

  const urls_array = [];
  const [isClicked, SetIsClicked] = useState(false)

  Random_Words?.map((word) => {
    urls_array.push("https://api.datamuse.com/words?rel_jja=" + word.Word);
  });

  const hint = () => {
    dispatch(addDatamuseAPIData(urls_array));
    SetIsClicked(!isClicked)
  };

  return (
    <div className="border" key="FetchDatamuse">
      <div className="">
        <button onClick={hint}>Hint</button>
      </div>

      <div className="col-auto border">
        {isClicked && <DisplayDatamuse />}
      </div>
    </div>
  );
}

export default FetchDatamuse;
