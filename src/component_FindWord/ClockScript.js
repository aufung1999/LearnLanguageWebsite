import React, { useState, useEffect, useRef } from "react";
import Clock from "../component_MakeSentence/Clock";
import { useDispatch, useSelector } from "react-redux";

function ClockScript({ setCountDown, countDown }) {
  const dispatch = useDispatch();

  const timerId = useRef();

  useEffect(() => {
    // dispatch( { type: "initialize_count_down", payload: 10})

    timerId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <div className="shadow p-2"  style={{fontSize:"35px"}}>{countDown}</div>;
}

export default ClockScript;
