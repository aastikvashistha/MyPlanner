import React, { useState, useEffect } from "react";

export default function TimetableModule({ goBack }) {
  const savedTables =
    JSON.parse(localStorage.getItem("timetables")) || [];

  const [tables, setTables] = useState(savedTables);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("timetables", JSON.stringify(tables));
  }, [tables]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      setTables(
        tables.map((plan) =>
          plan.id === editingId
            ? { ...plan, title, content }
            : plan
        )
      );
      setEditingId(null);
    } else {
      setTables([
        ...tables,
        { id: Date.now(), title, content },
      ]);
    }

    setTitle("");
    setContent("");
  };

  const handleEdit = (plan) => {
    setTitle(plan.title);
    setContent(plan.content);
    setEditingId(plan.id);
  };

  const handleDelete = (id) => {
    setTables(tables.filter((plan) => plan.id !== id));
  };

  return (
    <>
      <div className="module-header">
        <button className="back-btn" onClick={goBack}>← Back</button>
        <h2>Timetable Planner</h2>
      </div>

      <div className="module-card">
        <form className="diet-form" onSubmit={handleSubmit}>
          <input
            placeholder="Timetable Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your daily timetable here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Update Timetable" : "Add Timetable"}
          </button>
        </form>
      </div>

      <div className="module-card">
        {tables.length === 0 ? (
          <div className="empty">No timetables added</div>
        ) : (
          tables.map((plan) => (
            <div key={plan.id} className="diet-plan">
              <h3>{plan.title}</h3>
              <pre className="diet-content">{plan.content}</pre>

              <div className="diet-actions">
                <button className="edit-btn" onClick={() => handleEdit(plan)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(plan.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
