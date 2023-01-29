import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { temp_addData } from '../store/actions/actions'

import * as uuid from "uuid";

function ExtraWords( {element} ) {

    const LangID = useSelector(state => state.LangID)
    const selected = useSelector(state => state.Selected.selected)                  //      \ C   m   i   a   i   n

    const dispatch = useDispatch()       // Redux

    let this_uuid = uuid.v4()                                               // need to adjust although its not affectin the whole system now THE uuid


    const selected_words = selected?.map(word => {
        return word.Word
    })
    // console.log('this_uuid: '+ selected_words);

    const addToSelected = async(e) => {
        e.preventDefault()

        dispatch( {type:"Add_selected", payload: {Word: element["word"], WordID: this_uuid}} )                // need to adjust although its not affectin the whole system now

        dispatch( {type:"Add_selectedArrayID", payload: this_uuid } )                // need to adjust although its not affectin the whole system now
    }

    return (
    <button className={selected_words.includes(element["word"])? "invisible": "visible"} onClick={(e) => addToSelected(e) }>{element["word"]}</button>
  )
}

export default ExtraWords