import { useSelector, useDispatch } from "react-redux";

import { db } from "../../Firebase";
import {
  addDoc,
  getDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
  firebase,
} from "firebase/firestore";

const isEditLangBtn = () => ({
  type: "Clicked",
  // payload:  data
});

const isDeleteLangBtn = () => ({
  type: "Clicked",
  // payload:  data
});

const LangID = (data) => ({
  type: "LangIDRedux",
  payload: data,
});

const Tags = (data) => ({
  type: "AddTagsRedux",
  payload: data,
});

const TagID = (data) => ({
  type: "AddTagIDRedux",
  payload: data,
});

const Words = (data) => ({
  type: "AddWordsRedux",
  payload: data,
});

const updateTag = (data) => ({
  type: "updateWordsTag",
  payload: data,
});

//-----Make Sentence Game-----

export const random_Words = (data) => {
  // Thunk Function
  return async (dispatch) => {
    var RandomNumber = Math.floor(Math.random() * 100) + 1;
    console.log("RandomNumber: " + RandomNumber, data);

    dispatch({
      type: "addRandomWrods",
      payload: { ...data, random_value: RandomNumber },
    });
  };
};
const removeWord_accepted = (data) => ({
  type: "removeWord_accepted",
  payload: data,
});
//-----Make Sentence Game-----

const selected = (data) => ({
  type: "Add_selected",
  payload: data,
});

const remove_selected = (data) => ({
  type: "Remove_selected",
  payload: data,
});

const selectedArrayID = (data) => ({
  type: "Add_selectedArrayID",
  payload: data,
});

const remove_selectedArrayID = (data) => ({
  type: "Remove_selectedArrayID",
  payload: data,
});

//-----Datamuse-----

export const addDatamuseAPIData = (urls_array) => {
  // Thunk Function
  return async (dispatch) => {
    dispatch({ type: "remove_DatamuseAPIDATA" });
    // Fetching results from an API : asynchronous action
    Promise.all(
      urls_array.map((url) =>
        fetch(url)
          .then((resp) => resp.json())
          .then((texts) => {
            const sliced = Object.entries(texts)
              .slice(0, 5)
              .map((entry) => entry[1]);
            dispatch({
              type: "ADD_DatamuseAPIDATA",
              payload: sliced,
              url: url,
            });
            //   console.log('result_array inside Promise: '+ JSON.stringify(sliced));
          })
      )
    );

    // Dispatching the action when async
    // action has completed.
  };
};

const removeDatamuseWord_accepted = (data) => ({
  type: "removeDatamuseWord_accepted",
  payload: data,
});

//-----Datamuse-----

export const temp_WordsAssociation = (data, next_word_first_character) => {
  return async (dispatch) => {
    dispatch({ type: "-----Temp_wordsAssociation-----" });

    fetch("https://api.datamuse.com/words?rel_trg=" + data)
      .then((resp) => resp.json())
      .then((texts) => {
        let texts_array = [];

        texts.map((text) => texts_array.push(text["word"]));
        // console.log('texts: ' + JSON.stringify(texts_array));

        dispatch({ type: "Temp_addTrigger", payload: texts_array });
      });

    fetch("https://api.datamuse.com/words?rel_jja=" + data)
      .then((resp) => resp.json())
      .then((texts) => {
        let texts_array = [];

        texts.map((text) => texts_array.push(text["word"]));
        // console.log('texts: ' + JSON.stringify(texts_array));

        dispatch({ type: "Temp_addPopular_Nouns", payload: texts_array });
      });

    fetch("https://api.datamuse.com/words?ml=" + data)
      .then((resp) => resp.json())
      .then((texts) => {
        let texts_array = [];

        texts.map((text) => texts_array.push(text["word"]));
        // console.log('texts: ' + JSON.stringify(texts_array));

        dispatch({ type: "Temp_addSimilarMeaning", payload: texts_array });
      });

    if (next_word_first_character != undefined) {
      fetch(
        "https://api.datamuse.com/words?lc=" +
          data +
          "&sp=" +
          next_word_first_character +
          "*"
      )
        .then((resp) => resp.json())
        .then((texts) => {
          let texts_array = [];

          texts.map((text) => texts_array.push(text["word"]));
          // texts: ' + JSON.stringify(texts_array));

          dispatch({ type: "Temp_addLeftContext", payload: texts_array });
        });
    }
  };
};

const sentence_accept = (data) => ({
  type: "sentence_accept",
  payload: data,
});

//-----CountDown----------------------------------------------------------------------------------------------------

const count_down = (data) => ({
  type: "count_down",
  payload: data,
});

const initialize_count_down = (data) => ({
  type: "initialize_count_down",
  payload: data,
});

//-----CountDown----------------------------------------------------------------------------------------------------

//-----Accepted Phrase/ sentence----------------------------------------------------------------------------------------------------

//This one does not use redux, only put it here for updating data in firebase

export const accepted_phrase = (data, LangID) => {
  console.log("data: " + JSON.stringify(data));
  // const docRef = collection(db, "Language/" + LangID + "/tags")

  return async (dispatch) => {
    if (data["count"] != undefined) {
      const docRef = doc(db, "Language/" + LangID + "/words/" + data.WordID);
      // console.log('docRef: ' + JSON.stringify(docRef))
      const docSnap = await getDoc(docRef);
      // console.log('docSnap: ' + JSON.stringify(docSnap.data()['count']))
      // const count = docSnap.data()['count']
      updateDoc(docRef, { count: docSnap.data()["count"] + 1 });
    }
    // dispatch( {type:"accepted_phrase", payload: data} )
  };
};

//-----Accepted Phrase/ sentence----------------------------------------------------------------------------------------------------

//-----storeAccepted Phrase/ sentence----------------------------------------------------------------------------------------------------

export const store_accepted_phrase = (data, LangID) => {
  return async (dispatch) => {
    const colRef = collection(db, `Language/${LangID}/accepted_phrase`);
    const convert_data = Object.assign({}, data);
    console.log("convert_data: " + convert_data);
    await addDoc(colRef, convert_data); // as the addDoc only accepts object NOT array, I need to convert it first

    dispatch({ type: "store_accepted_phrase", payload: data });
  };
};

//-----Accepted Phrase/ sentence----------------------------------------------------------------------------------------------------

export const findWords_action = (data) => ({
    type: "find-words",
    payload: data,
  });
export const selectWords_action = (data) => ({
    type: "selection-words",
    payload: data,
  });