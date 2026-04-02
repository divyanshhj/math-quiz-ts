import React from "react";

type Variant = "success" | "error" | "warning" | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const baseStyles = "px-2 py-1 rounded-full text-xs font-medium inline-block";

const variants: Record<Variant, string> = {
  success: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
  warning: "bg-yellow-100 text-yellow-700",
  default: "bg-gray-100 text-gray-700",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
