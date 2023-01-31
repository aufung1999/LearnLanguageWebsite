import React, { useState, useEffect, useRef } from "react";
import Clock from "./Clock";
import { useDispatch, useSelector } from "react-redux";

function ClockScript() {
    // const Random_Words = useSelector(state => {
    //     return state.Random_Words.map(word => {
    //         if (word.random_value > 50){
    //           return word
    //         }
    //       }).filter(word => word != null)
    //   })

    const dispatch = useDispatch()

    const [countDown, setCountDown] = useState();
    const timerId = useRef()


    useEffect(() => {
        // dispatch( { type: "initialize_count_down", payload: 10})

        timerId.current = setInterval(() =>{
            setCountDown(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timerId)
    }, [])

  return (
    <div >
        {countDown}
    </div>
  );
}

export default ClockScript;
