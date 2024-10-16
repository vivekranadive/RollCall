import React from "react";

const ProgressBar = ({ percentage }) => {
  const radius = 100; // Radius of the circle
  const strokeWidth = 10; // Width of the progress bar
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  // Calculate the offset for the progress bar
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      {/* Outer circular border */}
      <circle
        stroke="#FEAB2F" // Color of the outer border
        fill="transparent"
        strokeWidth={5} // Adjust the width of the outer border
        r={radius - 2} // Set the radius slightly smaller than the progress bar
        cx={radius}
        cy={radius}
      />

      {/* Progress bar */}
      <circle
        stroke="#00ABB6" // Color of the progress bar
        fill="transparent"
        strokeWidth={22}
        strokeDasharray={circumference}
        style={{
          strokeDashoffset: offset,
          transform: "rotate(-90deg)", // Start the progress from the right
          transformOrigin: "50% 50%",
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      {/* Display the percentage inside the circle */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="20"
        fill="#333" // Color of the percentage text
        fontWeight="bold"
        className="text-primary-500 text-3xl"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default ProgressBar;
