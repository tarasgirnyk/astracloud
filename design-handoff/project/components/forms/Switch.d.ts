import { CSSProperties } from "react";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  style?: CSSProperties;
}

export function Switch(props: SwitchProps): JSX.Element;
