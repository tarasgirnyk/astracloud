import { ReactNode, CSSProperties, MouseEventHandler } from "react";

export interface TagProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

export function Tag(props: TagProps): JSX.Element;
