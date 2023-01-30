import React, { useEffect, useState } from 'react'
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
import { Sapling } from "@saplingai/sapling-js/observer";
import { useDispatch, useSelector } from 'react-redux';
import { temp_WordsAssociation } from '../store/actions/actions';

function CheckSentence( {selected} ) {

    const Trigger = useSelector(state => state.Temp_WA["Trigger"])
    const Popular_Nouns = useSelector(state => state.Temp_WA["Popular_Nouns"])
    const Similar_Meaning = useSelector(state => state.Temp_WA["Similar_Meaning"])
    const Left_Context = useSelector(state => state.Temp_WA["Left_Context"])
    const sentence_accept = useSelector(state => state.sentence_accept)

    const dispatch = useDispatch()

    const [displayValue, setDisplayValue] = useState("")

    const [result, setResult] = useState("")

    const [globalSentence, setGlobalSentence] = useState(null)

    const sentence = []

    useEffect(() => {

        selected?.map((word, index) => {
            sentence.push(word.Word)

            if( selected[index+1] != undefined){
                // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:  '+ JSON.stringify(selected[index+1]["Word"][0]));
                dispatch( temp_WordsAssociation(word.Word, selected[index+1]["Word"][0]) )
            }else{
                console.log('-----------------------------------  ');
                dispatch( temp_WordsAssociation(word.Word, undefined) )
            }

        })

        const concat_sentence = sentence.join(" ")
        console.log('---sentence---' + concat_sentence);

        setDisplayValue(concat_sentence)
        setGlobalSentence(sentence)

    }, [selected])

    const checkSentence = (e) => {
        e.preventDefault()

        const Array_Trigger = Object.values(Trigger)                 //convert object to array
        const Array_Popular_Nouns = Object.values(Popular_Nouns)    //convert object to array
        const Array_Similar_Meaning = Object.values(Similar_Meaning)    //convert object to array
        const Array_Left_Context = Object.values(Left_Context)    //convert object to array

        globalSentence.filter((word) => word != globalSentence[0]).map((filtered_globalSentence_word, index) =>{

            console.log('Array_Trigger: '+ Array_Trigger[index], index);

            const isTriggerIncluded = Array_Trigger[index].includes(filtered_globalSentence_word)
            const isPopular_NounsIncluded = Array_Popular_Nouns[index].includes(filtered_globalSentence_word)
                                                                    /**********/
            const isSimilar_MeaningIncluded = Array_Similar_Meaning[index+1].includes(filtered_globalSentence_word)
                                                                    /**********/
            const isLeft_Context = Array_Left_Context[index].includes(filtered_globalSentence_word)

            const union_APN_ASM = Array_Popular_Nouns[index].filter(value => Array_Similar_Meaning[index+1].includes(value));

            console.log('filteredArray: '+ union_APN_ASM);
            console.log(index + '   isTriggerIncluded: ' + isTriggerIncluded);
            console.log(index + '   isPopular_NounsIncluded: ' + isPopular_NounsIncluded);
            // console.log(index + '   isSimilar_MeaningIncluded: ' + Array_Similar_Meaning[index+1]);
            console.log(index + '   isLeft_Context: ' + isLeft_Context);

            if(union_APN_ASM.length !=0 || isTriggerIncluded == true || isPopular_NounsIncluded == true || isLeft_Context == true){
                setResult(true)
                dispatch( { type: "sentence_accept", payload: "accept"})
                // .then(dispatch( {type:"removeWord_accepted", payload: filtered_globalSentence_word} ) )
            }else{
                setResult(false)
                dispatch( { type: "sentence_accept", payload: "reject"})
            }
        })
        // console.log('   result inside check function: ' + result)
    }

    useEffect(() => {
        console.log('result: ' + sentence_accept)
        if(sentence_accept == "accept"){
            selected?.map(word => {
                console.log('   word: ' + word)
                dispatch( {type:"removeWord_accepted", payload: word} )
                dispatch( {type:"removeDatamuseWord_accepted", payload: word} )
            })
            dispatch( {type:"Remove_all_selected"} )
        }
        else if(sentence_accept == "reject"){
            dispatch( {type:"Remove_all_selected"} )
        }
    }, [sentence_accept])

  return (
    <div>
        <form onSubmit={checkSentence}>

            <GrammarlyEditorPlugin clientId="client_R4q5cLZtGpLoz2LPgg8x4Q" config={{ documentDialect: "british" }} >
                <textarea value={displayValue}></textarea>
            </GrammarlyEditorPlugin>
            <input type="submit"></input>

        </form>



    </div>
  )
}

export default CheckSentence