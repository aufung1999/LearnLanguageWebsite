import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { getDocs, collection, doc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import EditWord from './EditWord';

function ShowWords({isClicked}) {
    const LangID = useSelector(state => state.LangID)   // Redux
    const Words = useSelector(state => state.Words)       // Redux
    const Tags = useSelector(state => state.Tags)         // Redux

    const [parent_editBtn, set_parent_editBtn] = useState(false) //        Originally, it shoukd not be in this layer(Parent) because of the NOT-rendering situation if it stays in Child layer

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
                dispatch({type: 'AddWordsRedux', payload: temp_data})
                temp_data = []

                }
            )}

        getsomething()

    }, [isClicked, parent_editBtn, Tags])

    // useEffect(() => {

    //     async function getsomething(){
    //         const docsSnap = await getDocs(collection(db, "Language/", LangID, "/words"))

    //         docsSnap.forEach((doc) => {

    //             console.log('Tag: '+ doc.data()['tag']);

    //             temp_data.push({Tag: doc.data()['tag'], Word:doc.data()['word'], WordID:doc.id})           //        ** can edit in the future

    //             console.log('temp data: '+ JSON.stringify(temp_data))       //        ** can edit in the future
    //         });

    //         // setGetTagsfromFB(temp_data)
    //         dispatch({type: 'AddWordsRedux', payload: temp_data})
    //         temp_data = []
    //     }

    //     getsomething()

    // }, [isClicked, parent_editBtn, Tags])


  return (
    <div>
        {Words?.map((Word, index) => {
            console.log('word: ' + Word.Word);
            return <>
                    <li > Word: {Word.Word} | Tag: {Word.Tag}</li>
                    <EditWord Word={Word} index={index} parent_editBtn={parent_editBtn} set_parent_editBtn={set_parent_editBtn}/>
                   </>

            })
        }
    </div>
  )
}

export default ShowWords