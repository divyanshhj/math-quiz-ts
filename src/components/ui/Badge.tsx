// components/ui/Badge.tsx
import React from "react";

interface BadgeProps {
  variant?: "indigo" | "emerald" | "amber" | "red";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = "indigo", children, className = "" }: BadgeProps) {
  const colors = {
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    red: "text-red-600 bg-red-50 border-red-100",
  };

  return (
    <span className={`text-xs font-semibold border rounded-full px-2.5 py-1 ${colors[variant]} ${className}`}>
      {children}
    </span>
  );
}