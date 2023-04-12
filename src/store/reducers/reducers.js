import React from "react";
import { combineReducers } from "redux";

//######################################################################################################

const isEditLangBtnReducer = (state = false, action) => {
  switch (action.type) {
    case "EditLangBtnClicked":
      return !state;
    default:
      return state;
  }
};

const isDeleteLangBtnReducer = (state = false, action) => {
  switch (action.type) {
    case "DeleteLangBtnClicked":
      return true;
    default:
      return state;
  }
};

//######################################################################################################

const LangIDReducer = (state = null, action) => {
  switch (action.type) {
    case "LangIDRedux":
      return action.payload;
    case "resetLangIDRedux":
      return "";
    default:
      return state;
  }
};

//######################################################################################################
const editBtnReducer = (state = false, action) => {
  switch (action.type) {
    case "click-editBtn":
      return !state
    default:
      return state;
  }
};
//######################################################################################################

const TagsReducer = (state = null, action) => {
  switch (action.type) {
    case "AddTagsRedux":
      return action.payload;
    case "resetTagsRedux":
      return "";
    default:
      return state;
  }
};

const TagIDReducer = (state = null, action) => {
  switch (action.type) {
    case "AddTagIDRedux":
      return action.payload;
    case "resetTagIDRedux":
      return "";
    default:
      return state;
  }
};

//######################################################################################################

const WordsReducer = (state = null, action) => {
  switch (action.type) {
    case "AddWordsRedux":
      return action.payload;
    case "updateWordsTag":
      action.payload &&
        console.log("action.payload: " + JSON.stringify(action.payload));
      state && console.log("state: " + JSON.stringify(state));

      // break
      return state.map((element) =>
        action.payload["wordID_List"].includes(element["WordID"])
          ? {
              ...element,
              Tag: action.payload["updateTagValue"],
            }
          : element
      );
    case "resetWordsRedux":
      return "";
    default:
      return state;
  }
};
//######################################################################################################

const RandomWordsReducer = (state = [], action) => {
  switch (action.type) {
    case "addRandomWrods":
      console.log("action.payload: " + JSON.stringify(action.payload));
      return [...state, action.payload];
    case "removeWord_accepted":
      console.log(
        "                                   action.payload: " + action.payload
      );
      return state?.filter((word) => word.Word !== action.payload["Word"]);
    case "reload_RandomWords":
      return [];
    default:
      return state;
  }
};

//######################################################################################################

const selectedReducer = (
  state = { selected: [], selectedArrayID: [] },
  action
) => {
  switch (action.type) {
    case "Add_selected":
      return { ...state, selected: [...state.selected, action.payload] };
    case "Remove_selected":
      return {
        ...state,
        selected: state.selected.filter(
          (word) => word.Word !== action.payload.Word
        ),
      };

    case "Add_selectedArrayID":
      return {
        ...state,
        selectedArrayID: [...state.selectedArrayID, action.payload],
      };

    case "Remove_selectedArrayID":
      return {
        ...state,
        selectedArrayID: state.selectedArrayID.filter(
          (id) => id !== action.payload
        ),
      };

    case "Remove_all_selected":
      return { selected: [], selectedArrayID: [] };

    default:
      return state;
  }
};

//######################################################################################################

const fetchDatabase = (state = [], action) => {
  switch (action.type) {
    case "ADD_DatamuseAPIDATA":
      // action.payload && console.log("action.payload: "+ JSON.stringify(action.payload ))

      return [...state, ...action.payload];
    case "removeDatamuseWord_accepted":
      return state?.filter((word) => word.word !== action.payload["Word"]);
    case "remove_DatamuseAPIDATA":
      return [];
    default:
      return state;
  }
};

//######################################################################################################

const Temp_wordsAssociationReducer = (
  state = {
    Trigger: [],
    Popular_Nouns: [],
    Similar_Meaning: [],
    Left_Context: [],
  },
  action
) => {
  switch (action.type) {
    case "Temp_addTrigger":
      return { ...state, Trigger: [...state.Trigger, action.payload] };

    case "Temp_addPopular_Nouns":
      return {
        ...state,
        Popular_Nouns: [...state.Popular_Nouns, action.payload],
      };

    case "Temp_addSimilarMeaning":
      return {
        ...state,
        Similar_Meaning: [...state.Similar_Meaning, action.payload],
      };

    case "Temp_addLeftContext":
      return {
        ...state,
        Left_Context: [...state.Left_Context, action.payload],
      };

    case "-----Temp_wordsAssociation-----":
      return {
        Trigger: [],
        Popular_Nouns: [],
        Similar_Meaning: [],
        Left_Context: [],
      };
    default:
      return state;
  }
};

//######################################################################################################

const sentence_acceptReducer = (state = "", action) => {
  switch (action.type) {
    case "sentence_accept":
      return action.payload;
    default:
      return state;
  }
};

//######################################################################################################

const store_accepted_phraseReducer = (state = [], action) => {
  switch (action.type) {
    case "store_accepted_phrase":
      return [...state, action.payload];
    case "remove_store_accepted_phrase":
      return [];
    default:
      return state;
  }
};

//######################################################################################################

const count_downReducer = (state = 0, action) => {
  switch (action.type) {
    case "initialize_count_down":
      return action.payload;
    case "count_down":
      return action.payload;
    default:
      return state;
  }
};
//######################################################################################################

const selectWordsReducer = (state = 0, action) => {
  switch (action.type) {
    case "selection-words":
      return action.payload;
    default:
      return state;
  }
};
//######################################################################################################

const findWordsReducer = (state = 0, action) => {
  switch (action.type) {
    case "find-words":
      return action.payload;
    default:
      return state;
  }
};

//######################################################################################################

const reducers = combineReducers({
  isEditLangBtn: isEditLangBtnReducer,
  isDeleteLangBtn: isDeleteLangBtnReducer,

  LangID: LangIDReducer,

  editBtn: editBtnReducer,

  Tags: TagsReducer,
  TagID: TagIDReducer,

  Words: WordsReducer,

  //-----Make Sentence Game-----
  Random_Words: RandomWordsReducer,

  Selected: selectedReducer,

  DatamuseAPIData: fetchDatabase,

  Temp_WA: Temp_wordsAssociationReducer,

  sentence_accept: sentence_acceptReducer,
  store_accepted_phrases: store_accepted_phraseReducer,

  count_down: count_downReducer,

  findWords: findWordsReducer,
  selectWords: selectWordsReducer,
});

export default reducers;
