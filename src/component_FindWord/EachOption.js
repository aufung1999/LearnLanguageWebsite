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
            className="border p-3"
            style={{
              boxShadow: "0 0 5px rgba(0,255,255, 0.5)",
              backgroundColor: "rgba(0,255,255, 0.05)",
            }}
          >
            {randomWords[index + VARIANT].Word}
          </button>
        ) : (
          <button
            onClick={() =>
              setSelectWords((prev) => [...prev, randomWords[index + VARIANT]])
            }
            className="border p-3"
            style={{
              boxShadow: "0 0 5px rgba(0,255,255, 0.5)",
              backgroundColor: "rgba(0,255,255, 0.05)",
            }}
          >
            {randomWords[index + VARIANT]}
          </button>
        )}
      </div>
    )
  );
}

export default EachOption;
