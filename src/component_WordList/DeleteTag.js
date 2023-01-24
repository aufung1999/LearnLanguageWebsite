import { doc, deleteDoc } from 'firebase/firestore';

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../Firebase';

function DeleteTag ( {tag, index, parent_editBtn, set_parent_editBtn} ) {

  const LangID = useSelector(state => state.LangID)   // Redux

  const [deleteBtn, setDeleteBtn] = useState(false)   // Only exist here, Local Variable

  const deleteTag = () => {
    console.log('-----------Delete Btn Clicked-----------');
    setDeleteBtn(!deleteBtn)
    set_parent_editBtn(!parent_editBtn)
    console.log('deleteTagBtn: '+ deleteBtn)
  }

  useEffect(() => {

    if (deleteBtn){
        const thedocRef = doc(db, "Language/", LangID, "/tags", tag.TagID)
        // console.log("delete BTN docREF: " + JSON.stringify(thedocRef))

        deleteDoc(thedocRef)
    }
  }, [deleteBtn])

  return (
    <div>
      <button onClick={deleteTag} key={"DeleteBtn-"+index} > Delete </button>
    </div>
  )
}

export default DeleteTag