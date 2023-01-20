import {Dropdown, DropdownButton} from 'react-bootstrap'
import { doc, setDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ShowTag from '../component_WordList/ShowTag'

import { db } from '../Firebase'

function WordList() {
    const [inputValue, setInputValue] = useState('')
    const [tagValue, setTagValue] = useState('')
    const [selectedTag, setSelectedTag] = useState('')

    const [isClicked, setIsClicked] = useState(false)

    const LangID = useSelector(state => state.LangID)
    const Tags = useSelector(state => state.Tags)

    async function addTagstoDB(e){
        e.preventDefault()

        const docRef = doc(db, "Language/" + LangID + "/tags", tagValue)
        await setDoc(docRef, {tag: tagValue})

        console.log('Tag: ', tagValue);
    }

    const addWordstoDB = async (e) =>{
        e.preventDefault()

        const docRef = doc(db, "Language/" + LangID + "/words", inputValue)
        await setDoc(docRef, {word: inputValue, tag: selectedTag})

        console.log(selectedTag, inputValue);
    }

  return (
    <div>
        <div>WordList</div>
        <form className="d-flex justify-content-center" onSubmit={(e) => addTagstoDB(e)}>
            <input type="text" className="" value={tagValue} onChange={(e) => setTagValue(e.target.value)}></input>
            <input type='submit' className="btn mb-2 mb-md-0 btn-outline-light btn-block border-50 text-secondary" onClick={()=> {setIsClicked(!isClicked)}}></input>
        </form>
        <ShowTag tagValue={tagValue} isClicked={isClicked}/>
        <br/>
        <form className="d-flex justify-content-center" onSubmit={(e) => addWordstoDB(e)}>
            <input type="text" className="" value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
                <DropdownButton >
                    {Tags?.map(Tag => {return <Dropdown.Item value={Tag} onClick={()=> setSelectedTag(Tag)}>{Tag}</Dropdown.Item>})}
                </DropdownButton>

            <input type='submit' className="btn mb-2 mb-md-0 btn-outline-light btn-block border-50 text-secondary "></input>
        </form>
    </div>

  )
}

export default WordList