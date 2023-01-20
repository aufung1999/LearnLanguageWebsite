import React from 'react'
import './DeleteBtn.css'

import {
    getFirestore, collection, getDocs,
    addDoc, onSnapshot, deleteDoc, doc
  } from "firebase/firestore"

import { useDispatch, useSelector } from 'react-redux'

import { db } from '../Firebase'



function DeleteBtn( {Language, id} ) {
    const isEditLangBtn = useSelector(state => state.isEditLangBtn)

    const dispatch = useDispatch()

    const delete_from_FB = () => {
        deleteDoc(doc(db, "Language", id));
    }

  return (
    <>
        {isEditLangBtn &&
                <button style={{padding: 'auto',margin:'auto', borderColor: 'rgba(255,0,0, 0.1)', boxShadow: '0 0 5px rgba(255,0,0, 1)', backgroundColor: 'rgba(255,0,0, 0.1)'}}
                    onClick={delete_from_FB} key={id}
                >
                -
                </button>}
    </>
  )
}

export default DeleteBtn