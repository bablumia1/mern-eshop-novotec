import React from "react";

const ButtonSpinner = () => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white" // Set the color to white
        className="animate-spin h-5 w-5 mr-2" // Add margin for spacing
      >
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
      </svg>
      <span className="text-white">Loading</span>
    </div>
  );
};

export default ButtonSpinner;
