import { doc, updateDoc, collection, query, where, getDoc, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../Firebase';


function EditTag( {tag, index, parent_editBtn, set_parent_editBtn} ) {

    const LangID = useSelector(state => state.LangID)   // Redux
    const Words = useSelector(state => state.Words)       // Redux
    const TagID = useSelector(state => state.TagID)     // Redux
    const Tags = useSelector(state => state.Tags)         // Redux

    const [editBtn, setEditBtn] = useState(false)

    const [editTagInput, setEditTagInput] = useState(tag.Tag)

    const dispatch = useDispatch()

    const editTag = () => {
        console.log('Clciked: ');
        setEditBtn(!editBtn)
    }


    const getRefTag = async() => {
        // Get a refernce tag so that in later section can apply the refence into the where clause
        const thedocRef = doc(db, "Language/", LangID, "/tags", tag.TagID)

        const docSnap = await getDoc(thedocRef)

        console.log('docSnap: ' + JSON.stringify(docSnap.data()["tag"]));

        let wordID_list = []

        const filtered_Words = Words.filter(word => {
            console.log('Map: ' + word["Tag"]);
            if(word["Tag"] === docSnap.data()["tag"])
                {wordID_list.push(word["WordID"])};
            return word["Tag"] === docSnap.data()["tag"]}
            )

        console.log('filtered_Words: ' + JSON.stringify(filtered_Words));
        if (filtered_Words === []){

        }else{
            dispatch({type:"updateWordsTag", payload: {wordID_List: wordID_list, updateTagValue: editTagInput}})
        }


    }

    const editTaginDB = (e) => {
        e.preventDefault()

        const thedocRef = doc(db, "Language/", LangID, "/tags", tag.TagID)

        // console.log('thedocRef: '+ thedocRef);

        //Before it updates, get the YET-update data
        updateDoc(thedocRef, {tag:editTagInput})

        getRefTag()

        setEditTagInput("")
    }

  return (
    <div >
        <button onClick={editTag} key={"EditBtn-"+index} > Edit </button>
        {
            editBtn
        &&
            <div key={"editTagInput-"+tag.Tag}>
                <form onSubmit={(e) => editTaginDB(e)}>
                    <input type='text' value={editTagInput} onChange={ e => setEditTagInput(e.target.value)}></input>
                    <input type='submit' onClick={()=> set_parent_editBtn(!parent_editBtn)}></input>
                </form>
            </div>
        }
    </div>
  )
}

export default EditTag