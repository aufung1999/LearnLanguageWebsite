
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LearnLang from "./pages/LearnLang";
import WordList from "./pages/WordList";


function App() {
  return (

    <Router>
      {/* <Home></Home> */}
      <Routes>
          <Route exact path="/home" element={<Home/>} />

          <Route exact path="/learnlang" element={<LearnLang/>} />

          <Route exact path="/wordlist" element={<WordList/>} />
      </Routes>
  </Router>

  );
}

export default App;

