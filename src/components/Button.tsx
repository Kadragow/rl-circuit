import React from "react";

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
    >
      {label}
    </button>
  );
};

export type ButtonProps = {
  onClick: () => void;
  label: string;
};

export default Button;
