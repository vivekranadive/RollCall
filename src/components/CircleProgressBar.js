import { useState, useEffect } from "react";

const CircleProgressBar = ({
  progress,
  size,
  bgColor,
  stroke,
  emptyStroke,
}) => {
  const [offset, setOffset] = useState(0);
  const circleRadius = 70;
  const circumference = 2 * Math.PI * circleRadius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, circumference]);

  return (
    <div className="relative w-full h-64">
      <svg
        width={size}
        height={size}
        viewBox="0 0 194 195"
        fill="transparent"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full"
      >
        <circle
          cx="97.5"
          cy="97"
          r={circleRadius}
          stroke={emptyStroke}
          strokeWidth="10"
          fill="transparent"
          // className="z-20"
        />

        <circle
          cx="97.5"
          cy="97"
          r={circleRadius}
          stroke={stroke}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="transparent"
          strokeLinecap="round"
          // className="z-20"
        />
      </svg>
      <div
        className={`flex justify-center items-center w-full h-full text-xl font-bold   `}
      >
        <p
          className={`${bgColor} text-white px-5 py-7 rounded-full flex justify-center items-center`}
        >
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default CircleProgressBar;
