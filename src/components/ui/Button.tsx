// components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "dark";
}

export default function Button({ 
  variant = "primary", 
  className = "", 
  disabled, 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "rounded-lg text-sm font-semibold transition-colors shadow-sm focus:outline-none flex items-center justify-center ";
  let variantClasses = "";

  if (disabled) {
    variantClasses = "bg-slate-200 text-slate-400 cursor-not-allowed";
  } else {
    switch (variant) {
      case "primary":
        variantClasses = "bg-indigo-600 hover:bg-indigo-700 text-white";
        break;
      case "dark":
        variantClasses = "bg-slate-800 hover:bg-slate-900 text-white";
        break;
      case "outline":
        variantClasses = "bg-white text-slate-600 border border-slate-300 hover:border-indigo-400";
        break;
      case "secondary":
        variantClasses = "bg-indigo-600 text-white border border-indigo-600";
        break;
    }
  }

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className}`} 
      disabled={disabled} 
      {...props}
    >
      {children}
    </button>
  );
}