import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { getDocs, collection, doc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import CheckSentence from './CheckSentence';

function ShowWords_MS() {

    const LangID = useSelector(state => state.LangID)   // Redux
    const Words = useSelector(state => state.Words)       // Redux

    const dispatch = useDispatch()       // Redux

    const [selected, setSelected] = useState([])                  //      \ C   m   i   a   i   n
    const [selectedArrayID, setSelectedArrayID] = useState([])    //      /   o   b   n   t   o



    const selectedWord = (e, word) => {
      e.preventDefault()
      setSelected([...selected, word])
      setSelectedArrayID([...selectedArrayID, word.WordID])
    }


    const unselectedWord = (e, unselected_word)=> {
      e.preventDefault()

      const unselected = selected.filter(word => {
        if( unselected_word.WordID !== word.WordID){
          return word
        }
      })

      const unselected_wordID = unselected?.map(word =>{
        if( unselected_word.WordID !== word.WordID){
          return word.WordID
          }
        })

      setSelected(unselected)
      setSelectedArrayID(unselected_wordID)
    }


    useEffect(() => {
      console.log('selected: ' +JSON.stringify(selected));
      console.log('selectedArray*****ID: ' +JSON.stringify(selectedArrayID));
      console.log('++++++++++++++++++++++++++++++++++');
    }, [selected, selectedArrayID])

  return (
    <div>
      <p>
      {Words?.map(word => {


        return <>

          <button type='button' className={selectedArrayID.includes(word.WordID)? "invisible": "visible"} value={word.Word} key={word.WordID} onClick={(e) => selectedWord(e, word)}>{word.Word} | {word.WordID}</button>

          </>
        })
      }
      </p>

      <p>
        
      </p>

      <p>
      {
        selected?.map(selectedWord => {
          return <>
            <button type='button' className={selectedArrayID.includes(selectedWord.WordID)? "visible": "invisible"}  onClick={(e) => unselectedWord(e, selectedWord)}>{selectedWord.Word} </button>
          </>
        })
      }
      </p>

      <CheckSentence selected={selected}/>
    </div>

  )
}

export default ShowWords_MS