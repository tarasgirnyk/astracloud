import { CSSProperties } from "react";

/**
 * @startingPoint section="Components" subtitle="FAQ accordion, single-open" viewport="700x260"
 */
export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items?: AccordionItem[];
  style?: CSSProperties;
}

export function Accordion(props: AccordionProps): JSX.Element;
