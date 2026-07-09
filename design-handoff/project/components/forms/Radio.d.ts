import { CSSProperties } from "react";

export interface RadioProps {
  label?: string;
  checked?: boolean;
  onChange?: () => void;
  name?: string;
  style?: CSSProperties;
}

export function Radio(props: RadioProps): JSX.Element;
