import "./toaster.css";

import { CSSProperties } from "react";

import { ToasterProvider, useToaster } from "./context";
import { Toast } from "./toast";

const TOAST_WIDTH = 356;
const GAP = 14;
const OFFSET = 32;

export interface ToasterProps {
  theme?: "light" | "dark";
  position?: Position;
  richColors?: boolean;
  width?: number;
  offset?: number;
}

export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export const ToasterImpl = ({
  theme = "light",
  position = "bottom-right",
  richColors,
  width = TOAST_WIDTH,
  offset = OFFSET,
}: ToasterProps) => {
  const { toasts, heights, setExpanded } = useToaster();

  const [y, x] = position.split("-");

  return (
    <ul
      className="nano-toast"
      data-theme={theme}
      data-y-position={y}
      data-x-position={x}
      data-rich-colors={richColors}
      style={
        {
          "--width": `${width}px`,
          "--gap": `${GAP}px`,
          "--offset": `${offset}px`,
          "--front-toast-height": `${heights[0]?.height ?? 0}px`,
        } as CSSProperties
      }
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {toasts.map((x, index) => (
        <Toast key={x.id} index={index} position={position} toast={x}></Toast>
      ))}
    </ul>
  );
};

export const Toaster = (props: ToasterProps) => (
  <ToasterProvider>
    <ToasterImpl {...props} />
  </ToasterProvider>
);
