import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDatamuseAPIData } from '../store/actions/actions'
import useRandomWords from './customHooks/useRandomWords'

import DisplayDatamuse from './DisplayDatamuse'

function FetchDatamuse( ) {
    const Words = useSelector(state => state.Words)       // Redux
    const selected = useSelector(state => state.Selected.selected)
    const Random_Words = useSelector(state => state.Random_Words)

    const dispatch = useDispatch()

    const urls_array = []

    Random_Words?.map(word => {
        urls_array.push("https://api.datamuse.com/words?rel_jja="+word.Word)
    })

    const hint = () => {
      dispatch(addDatamuseAPIData(urls_array))
    }

  return (
    <div key="FetchDatamuse">
      <button onClick={hint}>Hint</button>
        <DisplayDatamuse/>
    </div>
  )
}

export default FetchDatamuse