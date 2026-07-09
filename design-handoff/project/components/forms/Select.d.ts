import { CSSProperties } from "react";

/**
 * @startingPoint section="Components" subtitle="Dropdown select (location, currency, config)" viewport="700x160"
 */
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
