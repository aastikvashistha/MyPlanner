import React, { useState, useEffect } from "react";

export default function HydrationModule() {
  const savedGlasses = Number(localStorage.getItem("glasses")) || 0;
  const [glasses, setGlasses] = useState(savedGlasses);

  const ML_PER_GLASS = 250;
  const totalMl = glasses * ML_PER_GLASS;

  useEffect(() => {
    localStorage.setItem("glasses", glasses);
  }, [glasses]);

  return (
    <div className="module hydration">
      <h2>💧 Hydration Tracker</h2>

      <div className="hydration-box">
        <p className="water-amount">
          {totalMl} <span>ml</span>
        </p>

        <p className="glass-count">
          {glasses} glass{glasses !== 1 ? "es" : ""}
        </p>

        <button
          className="add-water-btn"
          onClick={() => setGlasses(glasses + 1)}
        >
          +1 Glass (250 ml)
        </button>

        <button
          className="reset-btn"
          onClick={() => setGlasses(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
