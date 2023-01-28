import React from 'react'
import {combineReducers} from 'redux'



//######################################################################################################

const isEditLangBtnReducer = (state = false, action) => {
    switch (action.type) {
        case 'EditLangBtnClicked':
            return !state
        default:
            return state
    }
}

const isDeleteLangBtnReducer = (state = false, action) => {
    switch (action.type) {
        case 'DeleteLangBtnClicked':
            return true
        default:
            return state
    }
}

//######################################################################################################

const LangIDReducer = (state = null, action) => {
    switch (action.type) {
        case 'LangIDRedux':
            return action.payload
        case 'resetLangIDRedux':
            return ''
        default:
            return state
    }
}

//######################################################################################################

const TagsReducer = (state = null, action) => {
    switch (action.type) {
        case 'AddTagsRedux':
            return action.payload
        case 'resetTagsRedux':
            return ''
        default:
            return state
    }
}

const TagIDReducer = (state = null, action) => {
    switch (action.type) {
        case 'AddTagIDRedux':
            return action.payload
        case 'resetTagIDRedux':
            return ''
        default:
            return state
    }
}

//######################################################################################################

const WordsReducer = (state = null, action) => {
    switch (action.type) {
        case 'AddWordsRedux':
            return action.payload
        case 'updateWordsTag':
            action.payload && console.log("action.payload: "+ JSON.stringify(action.payload))
            state && console.log('state: '+ JSON.stringify(state));

            // break
            return state.map((element) => (
                action.payload['wordID_List'].includes(element['WordID'])
                ?
                    {
                        ...element,
                        Tag: action.payload['updateTagValue']
                    }
                    :element
                )
            )
        case 'resetWordsRedux':
            return ''
        default:
            return state
    }
}
//######################################################################################################

const selectedReducer = (state = {selected:[], selectedArrayID: []}, action) => {
    switch (action.type){
        case 'Add_selected':
            return {...state, selected: [...state.selected, action.payload]}
        case 'Remove_selected':
            return {...state, selected: state.selected.filter(word => word.Word !== action.payload.Word)}

        case 'Add_selectedArrayID':
            return {...state, selectedArrayID: [...state.selectedArrayID, action.payload]}

        case 'Remove_selectedArrayID':
            return {...state, selectedArrayID: state.selectedArrayID.filter(id => id !== action.payload )}

        default:
            return state
    }
}

//######################################################################################################

const fetchDatabase = (state = [], action) => {
    switch (action.type){
        case 'ADD_DatamuseAPIDATA':
            action.payload && console.log("action.payload: "+ JSON.stringify(action.payload ))

            // [...state, ...action.payload]
            return [...state, ...action.payload]
            case 'remove_DatamuseAPIDATA':
                return ''
        default:
            return state
    }
}

//######################################################################################################

const tempWordsReducer = (state = [], action) => {
    switch (action.type){
        case 'Temp_addData':
            action.payload && console.log("action.payload: "+ JSON.stringify(action.payload ))
            // [...state, ...action.payload]
            return [...state, action.payload]

            case 'Temp_removeData':
                return ''
        default:
            return state
    }
}
//######################################################################################################

const reducers = combineReducers({
    isEditLangBtn: isEditLangBtnReducer,
    isDeleteLangBtn: isDeleteLangBtnReducer,

    LangID: LangIDReducer,

    Tags: TagsReducer,
    TagID: TagIDReducer,

    Words: WordsReducer,

    Selected: selectedReducer,

    DatamuseAPIData: fetchDatabase,

    Temp: tempWordsReducer

})

export default reducers