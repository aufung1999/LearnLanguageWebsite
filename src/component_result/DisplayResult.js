import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../Firebase'

import {
    getFirestore, collection, getDocs,
    addDoc, onSnapshot
  } from "firebase/firestore"

import { store_accepted_phrase } from '../store/actions/actions'
import Fetch_firebase from './customHooks/Fetch_firebase'

// import { db } from '../../Firebase'
// import { addDoc, getDoc, collection, doc, setDoc, updateDoc, firebase } from 'firebase/firestore'

function DisplayResult() {
    const store_accepted_phrases = useSelector(state => state.store_accepted_phrases)
    const LangID = useSelector(state => state.LangID)





  return (
    <div>
        {
            store_accepted_phrases.map((sentence, index) =>
                {
                    let form_sentence = []

                    store_accepted_phrase(sentence, LangID)

                    sentence.map(word => form_sentence.push(word["Word"], " ") )

                    return <div key={"accepted-"+index}> {form_sentence} </div>
                }
            )
        }
    </div>
  )
}

export default DisplayResult