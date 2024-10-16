import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 border-solid"></div>
    </div>
  );
};

export default Loader;
