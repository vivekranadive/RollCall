import React, { useEffect, useState } from "react";

const StarRating = ({
  initialRating,
  onRatingChange,
  fontSize,
  setProfileRating,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  useEffect(() => {
    if (setProfileRating) {
      setProfileRating(rating);
    }
  }, [rating]);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#FEAB2F" : "#D3D3D3",
            fontSize: fontSize,
            outline: "1px",
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
