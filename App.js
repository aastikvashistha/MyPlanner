import "./App.css";
import React, { useState, useEffect } from "react";

// TODO MODULE
import Todos from "./MyComponents/Todos";
import AddTodo from "./MyComponents/AddTodo";

// OTHER MODULES
import NotesModule from "./MyComponents/NotesModule";
import WorkoutModule from "./MyComponents/WorkoutModule";
import DietModule from "./MyComponents/DietModule";
import TimetableModule from "./MyComponents/TimetableModule";
import HydrationModule from "./MyComponents/HydrationModule";

function App() {
  // ===== ACTIVE MODULE =====
  const [activeModule, setActiveModule] = useState(null);

  // ===== TODO STATE =====
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(savedTodos);

  // ===== ABOUT MODAL =====
  const [showModal, setShowModal] = useState(false);

  // Save todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const goBack = () => setActiveModule(null);

  // Add todo
  const addTodo = (title, desc) => {
    setTodos([
      ...todos,
      {
        Sno: Date.now(),
        title,
        desc,
      },
    ]);
  };

  // Delete todo
  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e.Sno !== todo.Sno));
  };

  // ===== RENDER ACTIVE MODULE =====
  const renderModule = () => {
    switch (activeModule) {
      case "todo":
        return (
          <>
            <div className="module-header">
              <button className="back-btn" onClick={goBack}>
                ← Back
              </button>
              <h2>TO DO</h2>
            </div>

            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} />
          </>
        );

      case "hydration":
        return (
          <>
            <div className="module-header">
              <button className="back-btn" onClick={goBack}>
                ← Back
              </button>
              <h2>Hydration</h2>
            </div>
            <HydrationModule />
          </>
        );

      case "workout":
        return <WorkoutModule goBack={goBack} />;

      case "diet":
        return <DietModule goBack={goBack} />;

      case "timetable":
        return <TimetableModule goBack={goBack} />;

      case "notes":
        return <NotesModule goBack={goBack} />;

      default:
        return null;
    }
  };

  return (
    <div className="app-bg">
      <div className="app-container">

        {/* ===== SIDEBAR ===== */}
        <aside className="sidebar">
          <h2 className="logo">✔ My Planner</h2>

          <ul className="menu">
            <li className={!activeModule ? "active" : ""} onClick={goBack}>
              🏠 Home
            </li>

            <li
              className={activeModule === "todo" ? "active" : ""}
              onClick={() => setActiveModule("todo")}
            >
              📋 TO DO
            </li>

            <li
              className={activeModule === "hydration" ? "active" : ""}
              onClick={() => setActiveModule("hydration")}
            >
              💧 Hydration
            </li>

            <li
              className={activeModule === "workout" ? "active" : ""}
              onClick={() => setActiveModule("workout")}
            >
              🏋 Workout
            </li>

            <li
              className={activeModule === "timetable" ? "active" : ""}
              onClick={() => setActiveModule("timetable")}
            >
              📅 Timetable
            </li>

            <li
              className={activeModule === "diet" ? "active" : ""}
              onClick={() => setActiveModule("diet")}
            >
              🥗 Diet Chart
            </li>

            <li
              className={activeModule === "notes" ? "active" : ""}
              onClick={() => setActiveModule("notes")}
            >
              📝 Notes
            </li>
          </ul>

          <ul className="menu-bottom">
            <li onClick={() => setShowModal(true)}>ℹ About</li>
          </ul>
        </aside>

        {/* ===== MAIN ===== */}
        <main className="main">
          {!activeModule ? (
            <>
              <h1 className="dashboard-title">Choose a Planner</h1>

              <div className="card-grid">
                <div className="card" onClick={() => setActiveModule("todo")}>
                  ✅
                  <h3>TO DO</h3>
                  <p>Daily tasks</p>
                </div>

                <div className="card" onClick={() => setActiveModule("hydration")}>
                  💧
                  <h3>Hydration</h3>
                  <p>Track daily water</p>
                </div>

                <div className="card" onClick={() => setActiveModule("workout")}>
                  🏋
                  <h3>Workout</h3>
                  <p>Fitness routine</p>
                </div>

                <div className="card" onClick={() => setActiveModule("timetable")}>
                  📅
                  <h3>Timetable</h3>
                  <p>Daily schedule</p>
                </div>

                <div className="card" onClick={() => setActiveModule("diet")}>
                  🥗
                  <h3>Diet Chart</h3>
                  <p>Food planning</p>
                </div>

                <div className="card" onClick={() => setActiveModule("notes")}>
                  📝
                  <h3>Notes</h3>
                  <p>Ideas & thoughts</p>
                </div>
              </div>
            </>
          ) : (
            renderModule()
          )}
        </main>

        {/* ===== ABOUT MODAL ===== */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h4>Designed by AASTIK</h4>
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
