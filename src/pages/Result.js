import { useNavigate } from "react-router";

function Result() {
    const navigate = useNavigate();

  return (
    <>
        <div>Result</div>
            <div className="d-grid gap-3" >
                <button className="btn mx-auto border" onClick={()=>{navigate("/")}}>Home</button>
                <button className="btn mx-auto border" onClick={()=>{navigate("/wordlist")}}>WordList</button>
            </div>
    </>

  )
}

export default Result