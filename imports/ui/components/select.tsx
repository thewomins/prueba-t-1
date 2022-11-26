import React from "react";

type props = {
  name: string;
  label: string;
  onBlur: React.FocusEventHandler<HTMLSelectElement>;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
  value?: string;
  error?: boolean;
  placeholder: string;
  errorMsg?: string;
};

const Select: React.FC<props> = ({
  name,
  label,
  onBlur,
  onChange,
  placeholder,
  error = false,
  options,
  value,
  errorMsg = "",
}) => {
  return (
    <div>
      <label htmlFor={name} className="block font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <select
          id="region"
          name={name}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          className={`h-full w-full rounded-md border bg-transparent 
          py-1 pl-2 pr-2 text-gray-700 focus-visible:outline-none
            ${
              error
                ? "focus:border-pink-500 border-pink-400 focus:ring-pink-500"
                : "focus:border-indigo-500 border-gray-300 focus:ring-indigo-500"
            }`}>
          <option>{placeholder}</option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <div
          className={`absolute inset-y-0 right-5 pointer-events-none flex items-center ${
            error ? "w-fit" : "w-0"
          }`}>
          <img
            className={`h-full rounded-md aspect-square p-1 ${
              error ? "w-auto" : "w-0"
            }`}
            src="https://img.icons8.com/color/48/null/high-priority.png"
          />
        </div>
      </div>
      <div>
        <p className="text-pink-500">{errorMsg}</p>
      </div>
    </div>
  );
};

export { Select };
