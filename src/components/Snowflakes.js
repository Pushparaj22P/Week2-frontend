import React from "react";
import "./style.css";
const Snowflakes = () => {
  return (
    <div>
      {Array.from({ length: 50 }).map((_, i) => {
        const leftPosition = Math.random() * 100; // Random position
        const duration = Math.random() * 3 + 2; // Random speed between 2s - 5s
        const size = Math.random() *15 + 5; // ✅ Bigger snowflakes (15px - 30px)

        return (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${leftPosition}vw`,
              animationDuration: `${duration}s`,
              fontSize: `${size}px`,
            }}
          >
            💸
          </div>
        );
      })}
    </div>
  );
};

export default Snowflakes;
