import React, { useState, useEffect } from "react";

export default function DietModule({ goBack }) {
  // Load from localStorage
  const savedPlans = JSON.parse(localStorage.getItem("dietPlans")) || [];
  const [dietPlans, setDietPlans] = useState(savedPlans);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("dietPlans", JSON.stringify(dietPlans));
  }, [dietPlans]);

  // Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      setDietPlans(
        dietPlans.map((plan) =>
          plan.id === editingId
            ? { ...plan, title, content }
            : plan
        )
      );
      setEditingId(null);
    } else {
      setDietPlans([
        ...dietPlans,
        { id: Date.now(), title, content },
      ]);
    }

    setTitle("");
    setContent("");
  };

  // Edit
  const handleEdit = (plan) => {
    setTitle(plan.title);
    setContent(plan.content);
    setEditingId(plan.id);
  };

  // Delete
  const handleDelete = (id) => {
    setDietPlans(dietPlans.filter((plan) => plan.id !== id));
  };

  return (
    <>
      {/* HEADER */}
      <div className="module-header">
        <button className="back-btn" onClick={goBack}>← Back</button>
        <h2>Diet Chart</h2>
      </div>

      {/* FORM */}
      <div className="module-card">
        <form className="diet-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Diet Plan Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your complete diet plan here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Update Plan" : "Add Plan"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="module-card">
        {dietPlans.length === 0 ? (
          <div className="empty">No diet Chart added</div>
        ) : (
          dietPlans.map((plan) => (
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
