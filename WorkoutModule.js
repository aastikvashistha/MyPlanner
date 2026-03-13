import React, { useState, useEffect } from "react";

export default function WorkoutModule({ goBack }) {
  const savedWorkouts =
    JSON.parse(localStorage.getItem("workoutPlans")) || [];

  const [workouts, setWorkouts] = useState(savedWorkouts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("workoutPlans", JSON.stringify(workouts));
  }, [workouts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      setWorkouts(
        workouts.map((plan) =>
          plan.id === editingId
            ? { ...plan, title, content }
            : plan
        )
      );
      setEditingId(null);
    } else {
      setWorkouts([
        ...workouts,
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
    setWorkouts(workouts.filter((plan) => plan.id !== id));
  };

  return (
    <>
      {/* HEADER */}
      <div className="module-header">
        <button className="back-btn" onClick={goBack}>
          ← Back
        </button>
        <h2>Workout Planner</h2>
      </div>

      {/* ADD / EDIT FORM */}
      <div className="module-card">
        <form className="diet-form" onSubmit={handleSubmit}>
          <input
            placeholder="Workout Plan Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your workout routine here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Update Workout" : "Add Workout"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="module-card">
        {workouts.length === 0 ? (
          <div className="empty">No workout plans added</div>
        ) : (
          workouts.map((plan) => (
            <div key={plan.id} className="diet-plan">
              <h3>{plan.title}</h3>
              <pre className="diet-content">{plan.content}</pre>

              <div className="diet-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(plan)}
                >
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
