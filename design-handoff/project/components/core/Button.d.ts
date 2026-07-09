import { ReactNode, CSSProperties, MouseEventHandler } from "react";

export interface ButtonProps {
  children: ReactNode;
  /** Visual treatment. `primary` (orange gradient) is the only CTA color in the system. */
  variant?: "primary" | "secondary" | "ghost" | "ghost-dark" | "dark";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Optional leading icon element. */
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
