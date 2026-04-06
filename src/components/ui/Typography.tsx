import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType; // Default is 'p'
  children: React.ReactNode;
}

export default function Typography({ 
  as: Component = "p", 
  className = "", 
  children, 
  ...props 
}: TypographyProps) {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}