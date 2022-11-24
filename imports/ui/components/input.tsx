import React from "react";

type props = {
  name: string;
  label: string;
  onBlur: any;
  onChange: any;
  value?: any;
  error?: boolean;
  placeholder: string;
  errorMsg?: string;
  type: React.HTMLInputTypeAttribute;
};

const Input: React.FC<props> = ({
  name,
  label,
  onBlur,
  onChange,
  value,
  placeholder,
  error = false,
  errorMsg = "",
  type,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          onBlur={onBlur}
          autoComplete="off"
          value={value === "-" ? "" : value}
          onChange={onChange}
          className={`block w-full text-xl rounded-md border 
            focus-visible:outline-none border-gray-300 pl-3 pr-8
            ${
              error
                ? "border-pink-500"
                : "focus:border-indigo-500 focus:ring-indigo-500"
            }
            `}
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <img
            className={`h-full rounded-md aspect-square p-1 pointer-events-none ${
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

export { Input };
