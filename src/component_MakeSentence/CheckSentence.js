import React, { useEffect, useState } from 'react'
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
import { Sapling } from "@saplingai/sapling-js/observer";



// import $ from 'jquery';
// import * as LanguageTool from 'languagetool-api'

// const languagetool  = require("languagetool-api");

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

    const checkSentence = async(e) => {
        e.preventDefault()
        console.log('event.target: '+ displayValue);

    }



  return (
    <div>
        <form onSubmit={checkSentence}>
            {/* <div>{sentence}</div> */}
            <input value={displayValue} hidden="false"></input>
            <GrammarlyEditorPlugin clientId="client_R4q5cLZtGpLoz2LPgg8x4Q" config={{ documentDialect: "british" }} >
                <textarea value={displayValue}></textarea>
            </GrammarlyEditorPlugin>
            <input type="submit"></input>
        </form>

    </div>
  )
}

export default CheckSentence