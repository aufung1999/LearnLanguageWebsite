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

