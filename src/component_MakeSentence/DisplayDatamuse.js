import React from "react";
import { useSelector } from "react-redux";
import ExtraWords from "./ExtraWords";

function DisplayDatamuse() {
  const DatamuseAPIData = useSelector((state) => state.DatamuseAPIData);
  // console.log('   DatamuseAPIData: ' + JSON.stringify(DatamuseAPIData));

  return (
    <div className="container">
      <div className="row">
        {Object.entries(DatamuseAPIData)
          .map((entry) => entry[1])
          ?.map((element, index) => {
            console.log("   element: " + JSON.stringify(element));
            return (
              <div className="col-auto m-2 p-1 border">
                <ExtraWords element={element} index={index} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DisplayDatamuse;
