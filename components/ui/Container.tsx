import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** 1280px max width, 16px gutter on mobile, 24px from md up. */
export function Container({ as: Tag = "div", className = "", children }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-container px-4 md:px-6 ${className}`}>{children}</Tag>;
}
