import React from "react";

import { useDispatch, useSelector } from "react-redux";

// import {GrEdit}
import { FiEdit2 } from "react-icons/fi";

function EditLangBtn() {
  const dispatch = useDispatch();

  return (
    <div
      className="btn border  rounded p-1"
      // data-mdb-ripple-color="light"
      style={{
        // borderColor: "rgba(0,255,0, 0.1)",
        boxShadow: "0 0 10px rgba(255,255,255, 1)",
        // backgroundColor: "rgba(0,255,0, 0)",
      }}
      onClick={() => {
        dispatch({ type: "EditLangBtnClicked" });
      }}
    >
      <FiEdit2 style={{ color: "grey", fontSize: "20px" }} />
    </div>
  );
}

export default EditLangBtn;
