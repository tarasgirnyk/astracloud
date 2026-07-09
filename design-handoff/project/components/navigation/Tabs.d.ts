import { CSSProperties } from "react";

/**
 * @startingPoint section="Components" subtitle="Segmented tab switcher (VPS / Dedicated / Colocation)" viewport="700x120"
 */
export interface TabItem {
  value: string;
  label: string;
}

export interface TabsProps {
  tabs?: TabItem[];
  active?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
}

export function Tabs(props: TabsProps): JSX.Element;
