import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const GamificationWidget = () => {
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const lastLogin = localStorage.getItem("lastLogin");
    const today = new Date().toISOString().split("T")[0];

    if (lastLogin === today) return;

    const lastDate = new Date(lastLogin);
    const diff = (new Date(today) - lastDate) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      setStreak((prev) => prev + 1);
      setShowConfetti(true);
    } else {
      setStreak(1);
    }

    localStorage.setItem("lastLogin", today);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.9)", // ✅ Semi-transparent white
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // ✅ Soft shadow
        textAlign: "center",
        width: "300px",
        margin: "20px auto",
        position: "relative",
        zIndex: 10, // ✅ Ensures it's above the particles
      }}
    >
      {showConfetti && <Confetti />}
      <h2 style={{ color: "#333" }}>🔥 Streak: {streak} Days</h2>
      <p style={{ color: "#555" }}>Keep tracking your expenses daily  🎉</p>
    </div>
  );
};

export default GamificationWidget;
