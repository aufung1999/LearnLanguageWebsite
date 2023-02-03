import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../Firebase'

function ShowAcceptedPhrase( {Word} ) {

    const LangID = useSelector(state => state.LangID)   // Redux

    const [getFromFB, setGetFromFB] = useState(null)

    const colRef = collection(db,`Language/${LangID}/accepted_phrase`)

    let getData = []

    useEffect(() => {

        onSnapshot( colRef, snapshot => {

            snapshot.forEach( doc => {

                let isContained = []

                const object_to_array = Object.entries(doc.data()).map(entry => entry[1] )

                // console.log('object_to_array: ' + JSON.stringify(object_to_array)   )

                object_to_array.map(word => {

                    // console.log('word: ' + word)
                    if(word["WordID"] == Word["WordID"]){
                        isContained.push("Contained")
                    }
                } )

                if(isContained.includes("Contained")){
                    getData.push(object_to_array)
                }
                isContained = []

            } )
            setGetFromFB(getData)
        })

        console.log('   getFromFB: ' + JSON.stringify(getFromFB))////////////////////////////////////////////////////////////////////////////////////////////////////

    }, [db])

    return (
    <div>
        {
            getFromFB?.map(sentence =>{
                    const extract_words = []

                    sentence.map(word => extract_words.push(    word["Word"])   )

                    console.log('extract_words: ' + extract_words)

                    return <> {extract_words} </>
                }
            )
        }
    </div>
  )
}

export default ShowAcceptedPhrase