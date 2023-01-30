import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { getDocs, collection, doc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import CheckSentence from './CheckSentence';
import FetchDatamuse from './FetchDatamuse';
import { random_Words } from '../store/actions/actions';



function ShowWords_MS() {

    const LangID = useSelector(state => state.LangID)   // Redux
    const Words = useSelector(state => state.Words)       // Redux

    const Random_Words = useSelector(state => {
      return state.Random_Words.map(word => {
          if (word.random_value > 50){
            return word
          }
        }).filter(word => word != null)

    })

    const selected = useSelector(state => state.Selected.selected)                  //      \ C   m   i   a   i   n
    // const selectedArrayID = useSelector(state => state.Selected.selectedArrayID)    //      /   o   b   n   t   o

    const dispatch = useDispatch()       // Redux

    useEffect(() => {     // Generate random number from the Words

      dispatch({type:"reload_RandomWords"})

      Words?.map(word => {
        dispatch(random_Words(word.Word))
      })

      console.log('Random_Words: ' + JSON.stringify(Random_Words))

    }, [])

    const selectedWord = (e, word) => {
      e.preventDefault()

      dispatch( {type: 'Add_selected', payload: word} )

      // dispatch( {type: 'Add_selectedArrayID', payload: word.WordID} )
    }


    const unselectedWord = (e, unselected_word)=> {
      e.preventDefault()

      dispatch( {type: 'Remove_selected', payload: unselected_word} )

      // dispatch( {type: 'Remove_selectedArrayID', payload: unselected_word.WordID} )

      dispatch( {type:"-----Temp_wordsAssociation-----"} )
    }


    useEffect(() => {
      console.log('selected: ' +JSON.stringify(selected));
      // console.log('selectedArray*****ID: ' +JSON.stringify(selectedArrayID));
      console.log('++++++++++++++++++++++++++++++++++');
    }, [selected])

    const selected_words = selected?.map(word => {
      return word.Word
  })

  return (
    <div>
      <p>
      {Random_Words?.map(word => {         // Can edit here in the future


        return <>

          <button type='button'
            className={selected_words.includes(word.Word)? "invisible": "visible"}
            value={word.Word}
            onClick={(e) => selectedWord(e, word)}>
              {word.Word}
          </button>

          </>
        })
      }
      </p>

      <p>
        <FetchDatamuse Random_Words={Random_Words}/>
      </p>

      <p>
      {
        selected?.map(selectedWord => {
          console.log('selectedWord: '+ selectedWord);
          return <>
            <button type='button'
              className={selected_words.includes(selectedWord.Word)? "visible": "invisible"}
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