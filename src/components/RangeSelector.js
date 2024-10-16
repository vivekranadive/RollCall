import React, { useState } from 'react';

const RangeSelector = () => {
  const [selectedPrize, setSelectedPrize] = useState('Prize 1');

  const handlePrizeChange = (event) => {
    setSelectedPrize(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-64 bg-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Selected Prize: {selectedPrize}</h2>
        <input
          type="range"
          min="1"
          max="3"
          value={selectedPrize === 'Prize 1' ? 1 : selectedPrize === 'Prize 2' ? 2 : 3}
          onChange={handlePrizeChange}
          className="slider-thumb appearance-none w-full h-2 bg-blue-500 rounded-lg outline-none"
        />
        <div className="flex justify-between mt-4">
          <span className="text-xs">Prize 1</span>
          <span className="text-xs">Prize 2</span>
          <span className="text-xs">Prize 3</span>
        </div>
      </div>
    </div>
  );
};

export default RangeSelector;
