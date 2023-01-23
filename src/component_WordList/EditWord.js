import { doc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../Firebase';
import { DropdownButton, Dropdown } from 'react-bootstrap';



function EditWord({Word, index, parent_editBtn, set_parent_editBtn}) {

    console.log('================================================================');

    const LangID = useSelector(state => state.LangID)   // Redux
    const TagID = useSelector(state => state.TagID)     // Redux
    const Tags = useSelector(state => state.Tags)         // Redux

    const [editBtn, setEditBtn] = useState(false)

    const [editTagInput, setEditTagInput] = useState(Word.Word)

    const editWord = () => {
        console.log('editWord Clciked');
        setEditBtn(!editBtn)
    }

    const editWordinDB = (e) => {
        e.preventDefault()

        console.log('editTagInput: '+editTagInput);

        const thedocRef = doc(db, "Language/", LangID, "/words", Word.WordID)

        // console.log('thedocRef: '+ JSON.stringify(thedocRef,null,1));

        updateDoc(thedocRef, {word: editTagInput})
    }

    const updateTaginWord = (selectedTag) => {
        console.log('selectedTag: '+ selectedTag);
    }

  return (
    <div>
        <button onClick={editWord} key={"EditBtn-"+index} > Edit </button>
        {
            editBtn
        &&
            <div key={"editWordInput-"+Word.Tag}>
                <form onSubmit={(e) => editWordinDB(e)}>
                    <input type='text' value={editTagInput} onChange={ e => setEditTagInput(e.target.value)}></input>
                    <input type='submit' onClick={()=>set_parent_editBtn(!parent_editBtn)}></input>
                </form>
                <DropdownButton title="Tags">
                    {Tags?.map(Tag => {return <Dropdown.Item value={Tag.Tag} onClick={()=> updateTaginWord(Tag.Tag)} key={Tag.TagID}>{Tag.Tag}</Dropdown.Item>})}
                </DropdownButton>
            </div>
        }
    </div>
  )
}

export default EditWord