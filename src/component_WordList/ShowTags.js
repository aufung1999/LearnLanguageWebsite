import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { getDocs, collection, doc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import EditTag from './EditTag';                    //      ShowTags(Parent) -> EditTag (Child)

function ShowTags({isClicked}) {
    const [getTagsfromFB, setGetTagsfromFB] = useState(null)
    const [parent_editBtn, set_parent_editBtn] = useState(false) //        Originally, it shoukd not be in this layer(Parent) because of the NOT-rendering situation if it stays in Child layer

    const LangID = useSelector(state => state.LangID)   // Redux

    const dispatch = useDispatch()                      // Redux

    let temp_data = []

    useEffect(()=>{

        async function getsomething(){
            const docsSnap = await getDocs(collection(db, "Language/", LangID, "/tags"))

            docsSnap.forEach((doc) => {

                console.log('TagID: ' + doc.id);

                temp_data.push({Tag:doc.data()['tag'], TagID:doc.id})           //        ** can edit in the future

                console.log('temp data: '+ temp_data)       //        ** can edit in the future
            });

            setGetTagsfromFB(temp_data)
            dispatch({type: 'AddTagsRedux', payload: temp_data})
            temp_data = []
        }

        getsomething()

    }, [isClicked, parent_editBtn])


  return (
    <div >
        {getTagsfromFB?.map((tag, index) => {       //This step I did some redundant work, which I could have directly acces, look at ShowWords.js
            console.log('index: ', index);
            return <>
                    <li key={"ShowTags-"+index} >{tag.Tag}</li>
                    <EditTag tag={tag} index={index} parent_editBtn={parent_editBtn} set_parent_editBtn={set_parent_editBtn}/>
                   </>
            })
        }
    </div>
  )
}

export default ShowTags