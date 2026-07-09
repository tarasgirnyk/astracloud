import { ReactNode, CSSProperties } from "react";

export interface BadgeProps {
  children: ReactNode;
  tone?: "orange" | "cyan" | "violet" | "neutral" | "on-dark";
  style?: CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
