// components/ui/Input.tsx
import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", hasError, disabled, ...props }, ref) => {
    const baseClasses = "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition ";
    
    const stateClasses = disabled
      ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200"
      : hasError
      ? "border-red-400 bg-red-50"
      : "border-slate-300 bg-white";

    return (
      <input 
        ref={ref} 
        className={`${baseClasses} ${stateClasses} ${className}`} 
        disabled={disabled} 
        {...props} 
      />
    );
  }
);

Input.displayName = "Input";
export default Input;