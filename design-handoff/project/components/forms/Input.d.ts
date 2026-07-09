import { CSSProperties, ChangeEventHandler } from "react";

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  style?: CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
