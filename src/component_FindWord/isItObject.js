import React from "react";

function isItObject({ selectWords, VARIANT }) {
  return (
    <div>
      {selectWords.at(VARIANT) &&
        (typeof selectWords.at(VARIANT) === "object" ? (
          <div>{selectWords.at(VARIANT).Word}</div>
        ) : (
          <div>{selectWords.at(VARIANT)}</div>
        ))}
    </div>
  );
}

export default isItObject;
