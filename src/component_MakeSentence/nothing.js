// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import styled from "styled-components";
// import { Controlled as CodeMirror } from "react-codemirror2";

// import "./styles.css";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";

// const LanguageTool = require("languagetool-api");

// const TextArea = styled.textarea`
//   width: 460px;
//   height: 200px;
// `;
// const ContentWrapper = styled.div`
//   text-align: left;
// `;

// const initialText = `
// Typos hapen. We striving to correct them. Hover on the marked words for instant correction suggestions or click the dialog icon in the bottom right corner to have the whole text proofread at once.
//  Or just paste your own text to get it proofread.
// `;
// const options = {
//   mode: "html",
//   theme: "material",
//   lineNumbers: false,
//   inputStyle: "textarea"
// };

// const handleClick = text => {
//   checkText(text);
// };

// const checkText = text => {
//   console.log(text, LanguageTool);
//   LanguageTool.check(
//     {
//       language: "en-US",
//       text: text
//     },
//     (err, res) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(res);
//         LanguageTool.showMistakes(res, mistakes => {
//           console.log(mistakes);
//         });

//         LanguageTool.bestSuggestion(res, mistakes => {
//           console.log(mistakes);
//         });
//       }
//     }
//   );
// };

// function App() {
//   const [text, setText] = useState(initialText);

//   return (
//     <div className="App">
//       <ContentWrapper>
//         <TextArea spellcheck={true} defautValue={initialText} />

//         <CodeMirror
//           value={text}
//           options={options}
//           onBeforeChange={(editor, data, value) => {
//             setText(value);
//           }}
//           onChange={(editor, data, value) => {}}
//         />
//       </ContentWrapper>
//       <button onClick={() => handleClick(text)}>test</button>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
