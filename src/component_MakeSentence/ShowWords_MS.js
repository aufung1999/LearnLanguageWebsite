import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { getDocs, collection, doc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import CheckSentence from './CheckSentence';
import FetchDatamuse from './FetchDatamuse';



function ShowWords_MS() {

    const LangID = useSelector(state => state.LangID)   // Redux
    const Words = useSelector(state => state.Words)       // Redux

    const selected = useSelector(state => state.Selected.selected)                  //      \ C   m   i   a   i   n
    const selectedArrayID = useSelector(state => state.Selected.selectedArrayID)    //      /   o   b   n   t   o

    const dispatch = useDispatch()       // Redux

    const selectedWord = (e, word) => {
      e.preventDefault()

      dispatch( {type: 'Add_selected', payload: word} )

      dispatch( {type: 'Add_selectedArrayID', payload: word.WordID} )
    }


    const unselectedWord = (e, unselected_word)=> {
      e.preventDefault()

      dispatch( {type: 'Remove_selected', payload: unselected_word} )

      dispatch( {type: 'Remove_selectedArrayID', payload: unselected_word.WordID} )
    }


    useEffect(() => {
      console.log('selected: ' +JSON.stringify(selected));
      console.log('selectedArray*****ID: ' +JSON.stringify(selectedArrayID));
      console.log('++++++++++++++++++++++++++++++++++');
    }, [selected, selectedArrayID])

  return (
    <div>
      <p>
      {Words?.map(word => {         // Can edit here in the future


        return <>

          <button type='button'
            className={selectedArrayID.includes(word.WordID)? "invisible": "visible"}
            value={word.Word} key={word.WordID}
            onClick={(e) => selectedWord(e, word)}>
              {word.Word} | {word.WordID}
          </button>

          </>
        })
      }
      </p>

      <p>
        <FetchDatamuse selected={selected}/>
      </p>

      <p>
      {
        selected?.map(selectedWord => {
          console.log('selectedWord: '+ selectedWord);
          return <>
            <button type='button'
              className={selectedArrayID.includes(selectedWord.WordID)? "visible": "invisible"}
              onClick={(e) => unselectedWord(e, selectedWord)}>
                {selectedWord.Word}
            </button>
          </>
        })
      }
      </p>

      <CheckSentence selected={selected}/>
    </div>

  )
}

export default ShowWords_MS