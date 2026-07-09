import { ReactNode, CSSProperties } from "react";

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Dialog(props: DialogProps): JSX.Element;
