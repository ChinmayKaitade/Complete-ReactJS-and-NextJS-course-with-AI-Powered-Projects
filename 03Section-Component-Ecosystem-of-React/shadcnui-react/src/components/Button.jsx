import React from "react";

const Button = ({ buttonText }) => {
  return (
    <button className="mt-4 px-4 bg-blue-600 rounded-lg text-white py-2 font-semibold hover:bg-blue-700">
      {buttonText}
    </button>
  );
};

export default Button;
