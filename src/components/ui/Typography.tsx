import React, { type JSX } from "react";

type Variant = "h1" | "h2" | "h3" | "body" | "small" | "span";

interface TypographyProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  h1: "text-4xl font-bold",
  h2: "text-2xl font-bold",
  h3: "text-lg font-semibold",
  body: "text-base text-gray-600",
  small: "text-sm text-gray-500",
  span: "text-base",
};

const TagMap: Record<Variant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h2",
  body: "p",
  small: "p",
  span: "span",
};

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  className = "",
}) => {
  const Tag = TagMap[variant] as React.ElementType;

  return <Tag className={`${variants[variant]} ${className}`}>{children}</Tag>;
};

export default Typography;
