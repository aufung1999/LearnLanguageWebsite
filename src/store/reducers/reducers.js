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

//######################################################################################################

const reducers = combineReducers({
    isEditLangBtn: isEditLangBtnReducer,
    isDeleteLangBtn: isDeleteLangBtnReducer,

    LangID: LangIDReducer,

    Tags: TagsReducer,

})

export default reducers