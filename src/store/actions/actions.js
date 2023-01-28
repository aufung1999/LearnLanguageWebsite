import { useSelector, useDispatch } from 'react-redux'

import { db } from '../../Firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

const isEditLangBtn = () => ({
    type: 'Clicked',
    // payload:  data
})

const isDeleteLangBtn = () => ({
    type: 'Clicked',
    // payload:  data
})

const LangID = (data) => ({
    type: 'LangIDRedux',
    payload:  data
})

const Tags = (data) => ({
    type: 'AddTagsRedux',
    payload:  data
})

const TagID = (data) => ({
    type: 'AddTagIDRedux',
    payload:  data
})

const Words = (data) => ({
    type: 'AddWordsRedux',
    payload:  data
})

const updateTag = (data) => ({
    type: 'updateWordsTag',
    payload:  data
})

const selected = (data) => ({
    type: 'Add_selected',
    payload:  data
})

const remove_selected = (data) => ({
    type: 'Remove_selected',
    payload:  data
})

const selectedArrayID = (data) => ({
    type: 'Add_selectedArrayID',
    payload:  data
})

const remove_selectedArrayID = (data) => ({
    type: 'Remove_selectedArrayID',
    payload:  data
})

export const addDatamuseAPIData  = (urls_array)=>{

    // Thunk Function
    return async (dispatch)=>{
        dispatch( {type:'remove_DatamuseAPIDATA'} )
        // Fetching results from an API : asynchronous action
        Promise.all(urls_array.map(url =>
            fetch(url)
            .then(resp =>
                resp.json()
            )
            .then(texts => {
              const sliced = Object.entries(texts).slice(0,5).map(entry => entry[1])
              dispatch( {type : 'ADD_DatamuseAPIDATA',payload : sliced, url: url} )
            //   console.log('result_array inside Promise: '+ JSON.stringify(sliced));
            })
            )
        )

        // Dispatching the action when async
        // action has completed.
    }
}


export const temp_addData  = (data, LangID) => {
    // console.log('data: ' + LangID);
    return async (dispatch)=>{
        const docRef = collection(db, "Language/" + LangID + "/temp")
        await addDoc(docRef, {word: data})
        .then( dispatch( {type : 'Temp_addData',payload : data} ) )
    }

}

