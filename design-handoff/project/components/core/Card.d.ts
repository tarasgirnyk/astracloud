import { ReactNode, CSSProperties } from "react";

export interface CardProps {
  children: ReactNode;
  tone?: "light" | "dark";
  padding?: string;
  style?: CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
