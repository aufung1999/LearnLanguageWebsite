import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

function EditLangBtn() {

    const dispatch = useDispatch()

  return (
    <button onClick={()=>{dispatch({type:'EditLangBtnClicked'})}}>EditLangBtn</button>
  )
}

export default EditLangBtn