import React from "react";
import { useDropdown } from "./dropdown-context";

const Select = ({
  placeholder = "",
  className = "",
  selectedCategory = "",
}) => {
  const { toggle, show } = useDropdown();
  return (
    <div
      className={`flex items-center justify-between py-4 px-5 bg-white border border-grayddd rounded-lg cursor-pointer text-sm  ${className}`}
      onClick={toggle}
    >
      {selectedCategory ? (
        <span className="text-green-500 font-medium">{selectedCategory}</span>
      ) : (
        <span className="text-[#B2B3BD]">{placeholder}</span>
      )}
      <span>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Select;