import { useSelector } from 'react-redux';

import { db } from '../../Firebase';

import {
    getFirestore, collection, getDocs,
    addDoc, onSnapshot
  } from "firebase/firestore"
import { useState } from 'react';


//##########################################################

async function Fetch_firebase(initializer) {

    console.log('---------------------------------------')

    const [getFromFB, setGetFromFB] = useState([])

    const LangID = useSelector(state => state.LangID)

    switch (initializer){
        case 'accepted_phrase':

            let getData = []

            const colRef = collection(db,`Language/${LangID}/accepted_phrase`)

            onSnapshot( colRef, snapshot => {

                snapshot.forEach( doc => {  getData.push(doc.data())  } )

                // console.log('employeeArr: ' + JSON.stringify(employeeArr))

                setGetFromFB([...getFromFB, getData])
            })

            console.log('getFromFB: ' + JSON.stringify(getFromFB))

            return getFromFB

        default:
            return "Nothing"
    }

}

export default Fetch_firebase