import { CSSProperties } from "react";

/**
 * @startingPoint section="Components" subtitle="Comparison-table pricing grid with filters" viewport="700x320"
 */
export interface PricingColumn {
  key: string;
  label: string;
}

export interface PricingRow {
  plan: string;
  [key: string]: string;
}

export interface PricingTableProps {
  columns?: PricingColumn[];
  rows?: PricingRow[];
  /** `plan` value of the row to highlight (e.g. recommended plan). */
  highlightRow?: string | null;
  style?: CSSProperties;
}

export function PricingTable(props: PricingTableProps): JSX.Element;
