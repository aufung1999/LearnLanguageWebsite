import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDatamuseAPIData } from '../store/actions/actions'

import DisplayDatamuse from './DisplayDatamuse'

function FetchDatamuse( {selected} ) {
    const Words = useSelector(state => state.Words)       // Redux
    const dispatch = useDispatch()

    let urls_array = []

    Words?.map(word => {
        console.log('word.Word '+ word.Word)
        urls_array.push("https://api.datamuse.com/words?rel_jja="+word.Word)

    })

    useEffect(() => {
        dispatch(addDatamuseAPIData(urls_array))
        // console.log('DatamuseAPIData: ' + JSON.stringify(DatamuseAPIData));
    }, [])

  return (
    <div>
        <DisplayDatamuse/>
    </div>
  )
}

export default FetchDatamuse