import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { getDocs, collection, doc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

function ShowWords() {

    const LangID = useSelector(state => state.LangID)   // Redux
    const Words = useSelector(state => state.Words)       // Redux
    const Tags = useSelector(state => state.Tags)         // Redux

    const dispatch = useDispatch()

    let temp_data = []

    useEffect(() => {

        async function getsomething(){

            onSnapshot( collection(db, "Language/", LangID, "/words"), snapshot=>{
                    snapshot.forEach((doc) => {

                    console.log('Tag: '+ doc.data()['tag']);

                    temp_data.push({Tag: doc.data()['tag'], Word:doc.data()['word'], WordID:doc.id})           //        ** can edit in the future

                    console.log('temp data: '+ JSON.stringify(temp_data))       //        ** can edit in the future
                });

                // setGetTagsfromFB(temp_data)
                dispatch({type: 'CopyWordsinGame', payload: temp_data})
                temp_data = []

                }
            )}

        getsomething()

    }, [])

  return (
    <div>ShowWords</div>
  )
}

export default ShowWords