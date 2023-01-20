import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { getDocs, collection, doc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

function ShowTag({tagValue, isClicked}) {
    const [getTagsfromFB, setGetTagsfromFB] = useState(null)

    const LangID = useSelector(state => state.LangID)

    const dispatch = useDispatch()

    let temp_data = []

    useEffect(()=>{

        async function getsomething(){
            const docsSnap = await getDocs(collection(db, "Language/", LangID, "/tag"))

            docsSnap.forEach((doc) => {

                temp_data.push(doc.data()['tag']) //        ** can edit in the future

                console.log('temp data: '+ temp_data)
            });

            setGetTagsfromFB(temp_data)
            dispatch({type: 'AddTagsRedux', payload: temp_data})
            temp_data = []
        }

        getsomething()

    }, [isClicked])


  return (
    <div>
        {getTagsfromFB?.map(tag => {return <li>{tag}</li>} )}
    </div>
  )
}

export default ShowTag