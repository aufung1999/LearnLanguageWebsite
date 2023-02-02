import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import DisplayResult from "../component_result/DisplayResult"

function Result() {
    const navigate = useNavigate();

    const dispatch = useDispatch()

  return (
    <>
        <div>Result</div>
            <div className="d-grid gap-3" >
                <button className="btn mx-auto border" onClick={()=>{navigate("/"); dispatch( {type:"remove_store_accepted_phrase"} )}}>Home</button>
                <button className="btn mx-auto border" onClick={()=>{navigate("/wordlist")}}>WordList</button>
            </div>
        <DisplayResult/>
    </>

  )
}

export default Result