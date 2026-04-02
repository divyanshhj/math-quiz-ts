import React from "react";

interface InputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
  step?: string;
}

const baseStyles =
  "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
  autoFocus = false,
  step,
}) => {
  return (
    <input
      type={type}
      value={value}
      step={step}
      disabled={disabled}
      autoFocus={autoFocus}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${baseStyles} ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      } ${className}`}
    />
  );
};

export default Input;
