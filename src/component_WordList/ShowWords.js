import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { getDocs, collection, doc, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import EditWord from "./EditWord";
import DeleteWord from "./DeleteWord";
import ShowAcceptedPhrase from "./ShowAcceptedPhrase";

function ShowWords({ isClicked }) {
  const LangID = useSelector((state) => state.LangID); // Redux
  const Words = useSelector((state) => state.Words); // Redux
  const Tags = useSelector((state) => state.Tags); // Redux

  const [parent_editBtn, set_parent_editBtn] = useState(false); //        Originally, it shoukd not be in this layer(Parent) because of the NOT-rendering situation if it stays in Child layer

  const dispatch = useDispatch();

  let temp_data = [];

  useEffect(() => {

    async function getsomething() {
      onSnapshot(collection(db, "Language/", LangID, "/words"), (snapshot) => {
        snapshot.forEach((doc) => {
          // console.log('Tag: '+ doc.data()['tag']);

          temp_data.push({
            Tag: doc.data()["tag"],
            Word: doc.data()["word"],
            WordID: doc.id,
            count: doc.data()["count"],
          }); //        ** can edit in the future

          // console.log('temp data: '+ JSON.stringify(temp_data))       //        ** can edit in the future
        });

        // setGetTagsfromFB(temp_data)
        dispatch({ type: "AddWordsRedux", payload: temp_data });
        temp_data = [];
      });
    }

    getsomething();
    
  }, [isClicked, parent_editBtn, Tags]);

  return (
    <div className="container">
      <div className="row">
        {Words?.map((Word, index) => {
          console.log("word: " + Word.Word);
          return (
            <div className="col">
              <div className="card">
                <div className="card-body text-center">
                  <div key={"ShowTags-" + Word.WordID}>

                    <div className="row border">
                      Word: {Word.Word} | Tag: {Word.Tag} | Count: {Word.count}
                    </div>

                    <div className="row border d-flex justify-content-center">
                      <EditWord
                        Word={Word}
                        index={index}
                        parent_editBtn={parent_editBtn}
                        set_parent_editBtn={set_parent_editBtn}
                      />
                      <DeleteWord
                        Word={Word}
                        parent_editBtn={parent_editBtn}
                        set_parent_editBtn={set_parent_editBtn}
                      />
                    </div>

                    <div className="row border">
                      <ShowAcceptedPhrase Word={Word} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowWords;
