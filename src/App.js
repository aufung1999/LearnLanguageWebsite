
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LearnLang from "./pages/LearnLang";
import MakeSentence from "./pages/MakeSentence";
import WordList from "./pages/WordList";
import Result from "./pages/Result";


function App() {
  return (

    <Router>
      <Routes>
          <Route exact path="/" element={<Home/>} />

          <Route exact path="/learnlang" element={<LearnLang/>} />

          <Route exact path="/wordlist" element={<WordList/>} />

          <Route exact path="/makesentence" element={<MakeSentence/>} />

          <Route exact path="/result" element={<Result/>} />
      </Routes>
  </Router>

  );
}

export default App;

