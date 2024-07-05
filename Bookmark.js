import React, { useState, useEffect } from "react";

function Bookmark() {
  const [titleText, setTitleText] = useState("");
  const [urlText, setUrlText] = useState("");
  const [noteList, setNoteList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedUrl, setEditedUrl] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNoteList(storedNotes);
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const newData = {
      id: Math.random().toString(),
      title: titleText,
      url: urlText,
    };
    const updatedData = [...noteList, newData];
    console.log(updatedData);
    setNoteList(updatedData);

    localStorage.setItem("notes", JSON.stringify(updatedData));
    // console.log(event);
  };
  const inputChangeHandler = (event) => {
    setTitleText(event.target.value);
  };
  const inputUrlHandler = (event) => {
    setUrlText(event.target.value);
  };
  const deleteBtnHandler = (id) => {
    const updateDeleteNotes = noteList.filter((note) => note.id !== id);
    setNoteList(updateDeleteNotes);
    localStorage.setItem("notes", JSON.stringify(updateDeleteNotes));
  };

  const editBtnHandler = (id) => {
    const noteToEdit = noteList.find((note) => note.id === id);
    if (noteToEdit) {
      setEditedUrl(noteToEdit.url);
      setEditMode(id);
    }
  };
  console.log(editMode);

  return (
    <>
      <div>
        <div className="container">
          <div>
            <h1>Bookmark Website</h1>
            <label htmlFor="filter">Website Title </label>
            <input
              type="text"
              value={titleText}
              onChange={inputChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="filter">Website URL </label>
            <input
              type="text"
              value={urlText}
              onChange={inputUrlHandler}
            ></input>
          </div>
          <button type="submit" onClick={formSubmitHandler}>
            Add
          </button>
        </div>
      </div>

      <strong>All Bookmarks </strong>
      {noteList.map((note) => (
        <>
          <li key={note.id}>
            <h3>Title:{note.title}</h3>
            <p>
              URL:{" "}
              <a href={note.url} target="_blank" rel="noopener noreferrer">
                {note.url}
              </a>
            </p>
          </li>
          <button
            type="button"
            className="addbtn"
            onClick={() => deleteBtnHandler(note.id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="editbtn"
            value={editedUrl}
            onClick={() => editBtnHandler(note.id)}
          >
            Edit
          </button>
        </>
      ))}
    </>
  );
}

export default Bookmark;
