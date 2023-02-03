import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import DisplayResult from "../component_result/DisplayResult"

function Result() {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const to_Home_page = () => {
      navigate("/");
      dispatch( {type:"remove_store_accepted_phrase"} )  // important something related to redux state

      dispatch( {type:"remove_DatamuseAPIDATA"} ) // important something related to redux state
    }

    const to_WordList_page = () => {
      navigate("/wordlist") ;

      dispatch( {type:"remove_store_accepted_phrase"} ) // important something related to redux state

      dispatch( {type:"remove_DatamuseAPIDATA"} ) // important something related to redux state
    }

  return (
    <>
        <div>Result</div>
            <div className="d-grid gap-3" >
                <button className="btn mx-auto border" onClick={to_Home_page}>Home</button>
                <button className="btn mx-auto border" onClick={to_WordList_page}>WordList</button>
            </div>
        <DisplayResult/>
    </>

  )
}

export default Result