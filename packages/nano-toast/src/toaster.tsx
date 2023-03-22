import "./toaster.css";

import { CSSProperties, useCallback, useEffect, useState } from "react";

import { subject, ToastData } from "./api";
import { createContext } from "./hooks";
import { Toast } from "./toast";

const TOAST_WIDTH = 356;
const GAP = 14;
const OFFSET = 32;
const VISIBLE_TOASTS_AMOUNT = 3;
const DEFAULT_TIMEOUT_DURATION = 4000;

interface HeightT {
  id: number;
  height: number;
}

function useToasterImpl() {
  const [expanded, setExpanded] = useState(false);
  const [toasts, setToasts] = useState([] as ToastData[]);
  const [heights, setHeights] = useState([] as HeightT[]);

  const updateToast = useCallback((data: ToastData) => {
    setToasts((v) => {
      const k = v.findIndex((x) => x.id === data.id);
      if (k === -1) return v;
      v[k] = { ...v[k], ...data, type: v[k].type };
      return [...v];
    });
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((v) => v.filter((x) => x.id !== id));
  }, []);

  const removeHeight = useCallback(
    (id: number) => setHeights((v) => v.filter((x) => x.id !== id)),
    []
  );

  useEffect(() => {
    if (toasts.length <= 1) {
      setExpanded(false);
    }
  }, [toasts.length]);

  useEffect(() => {
    return subject.subscribe((x) => {
      if (x.type === "update") {
        updateToast(x);
      } else {
        setToasts((v) => [x, ...v]);
      }
    });
  }, [updateToast]);

  return {
    expanded,
    setExpanded,
    toasts,
    removeToast,
    heights,
    setHeights,
    removeHeight,
  };
}

interface ExtraContextParams {
  x: string;
  y: string;
  expandByDefault?: boolean;
  visibleToast: number;
  gap: number;
  duration: number;
}

export const [ToasterProvider, useToaster] = createContext<
  ReturnType<typeof useToasterImpl> & ExtraContextParams
>("ToasterProvider");

export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface ToasterProps {
  theme?: "light" | "dark";
  position?: Position;
  richColors?: boolean;
  expandByDefault?: boolean;
  visibleToast?: number;
  gap?: number;
  width?: number;
  offset?: number;
  duration?: number;
}

export const Toaster = ({
  theme = "light",
  position = "bottom-right",
  richColors,
  expandByDefault,
  gap = GAP,
  width = TOAST_WIDTH,
  offset = OFFSET,
  duration = DEFAULT_TIMEOUT_DURATION,
  visibleToast = VISIBLE_TOASTS_AMOUNT,
}: ToasterProps) => {
  const ctx = useToasterImpl();
  const [y, x] = position.split("-");

  return (
    <ToasterProvider
      value={{ ...ctx, x, y, expandByDefault, visibleToast, gap, duration }}
    >
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
            "--front-toast-height": `${ctx.heights[0]?.height ?? 0}px`,
          } as CSSProperties
        }
        onMouseEnter={() => ctx.setExpanded(true)}
        onMouseLeave={() => ctx.setExpanded(false)}
      >
        {ctx.toasts.map((x, index) => (
          <Toast key={x.id} index={index} toast={x}></Toast>
        ))}
      </ul>
    </ToasterProvider>
  );
};
