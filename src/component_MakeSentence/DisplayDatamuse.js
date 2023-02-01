import React from 'react'
import { useSelector } from 'react-redux'
import ExtraWords from './ExtraWords';


function DisplayDatamuse( ) {
    const DatamuseAPIData = useSelector(state => state.DatamuseAPIData)
    // console.log('   DatamuseAPIData: ' + JSON.stringify(DatamuseAPIData));

  return (
    <div>
        {
            Object.entries(DatamuseAPIData).map(entry=> entry[1])?.map((element, index)=> {
                console.log('   element: ' + JSON.stringify(element));
                return <ExtraWords element={element} index={index}/>
            })
        }
    </div>
  )
}

export default DisplayDatamuse