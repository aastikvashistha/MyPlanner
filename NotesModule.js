import React, { useState, useEffect } from "react";

export default function NotesModule({ goBack }) {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const [notes, setNotes] = useState(savedNotes);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    setNotes([...notes, { id: Date.now(), text }]);
    setText("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <>
      {/* HEADER */}
      <div className="module-header">
        <button className="back-btn" onClick={goBack}>
          ← Back
        </button>
        <h2>Notes</h2>
      </div>

      {/* CONTENT */}
      <div className="module-card">
        <textarea
          className="notes-input"
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="add-btn" onClick={addNote}>
          Add Note
        </button>
      </div>

      <div className="module-card">
        {notes.length === 0 ? (
          <div className="empty">No notes yet</div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              <p>{note.text}</p>
              <button
                className="delete-btn"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
