import React from "react";

function EachOption({
  index,
  randomWords,
  VARIANT,
  selectWords,
  setSelectWords,
  //   checkTheSelection
}) {
  return (
    randomWords[index + VARIANT] && (
      <div key={index + VARIANT} className="col my-4 mx-2">
        {typeof randomWords[index + VARIANT] === "object" ? (
          <button
            onClick={() =>
              setSelectWords((prev) => [...prev, randomWords[index + VARIANT]])
            }
          >
            {randomWords[index + VARIANT].Word}
          </button>
        ) : (
          <button
            onClick={() =>
              setSelectWords((prev) => [...prev, randomWords[index + VARIANT]])
            }
          >
            {randomWords[index + VARIANT]}
          </button>
        )}
      </div>
    )
  );
}

export default EachOption;
