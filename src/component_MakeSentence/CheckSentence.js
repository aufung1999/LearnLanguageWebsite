import React, { useEffect, useState } from 'react'

function CheckSentence( {selected} ) {
    const [displayValue, setDisplayValue] = useState("")

    let sentence = []

    selected?.map(word => {
        sentence.push(word.Word)
        // sentence.push(" ")
    })

    useEffect(() => {
        // console.log('---sentence---' + sentence);
        const concat_sentence = sentence.join(" ")
        console.log('---sentence---' + concat_sentence);
        setDisplayValue(concat_sentence)
    }, [selected])

    const checkSentence = (e) => {
        e.preventDefault()
        console.log('event.target: '+ displayValue);
    }

  return (
    <div>
        <form onSubmit={checkSentence}>
            {/* <div>{sentence}</div> */}
            <input value={displayValue} hidden="true"></input>
            <input type="submit"></input>
        </form>
    </div>
  )
}

export default CheckSentence