import React from "react";

type Variant = "primary" | "secondary";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  variant?: Variant;
}

const baseStyles =
  "w-full rounded-lg transition font-medium focus:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
  secondary: "bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} py-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
