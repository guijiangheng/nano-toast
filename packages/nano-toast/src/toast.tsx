import "./toast.css";

import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ToastData } from "./api";
import { ErrorIcon, getIcon, Spinner, SuccessIcon } from "./assets";
import { useMounted, usePromise, useTimeout } from "./hooks";
import { useToaster } from "./toaster";

const GAP = 14;
const TIME_BEFORE_UNMOUNT = 200;
const DEFAULT_TIMEOUT_DURATION = 4000;
const VISIBLE_TOASTS_AMOUNT = 3;

export interface ToastProps {
  toast: ToastData;
  index: number;
}

export const Toast = ({ index, toast }: ToastProps) => {
  const {
    x,
    y,
    toasts,
    expanded,
    heights,
    setHeights,
    removeHeight,
    removeToast,
  } = useToaster();

  const ref = useRef<HTMLLIElement>(null);

  const mounted = useMounted();
  const [removed, setRemoved] = useState(false);
  const { loading, error, value } = usePromise(toast.promise);
  const [initialHeight, setInitialHeight] = useState(0);
  const [offsetBeforeRemove, setOffsetBeforeRemove] = useState(0);

  const [heightIndex, toastHeightBefore] = useMemo(() => {
    let mToastHeightBefore = 0;
    for (let i = 0; i < heights.length; ++i) {
      if (heights[i].id === toast.id) {
        return [i, mToastHeightBefore] as const;
      }
      mToastHeightBefore += heights[i].height;
    }
    return [0, 0] as const;
  }, [heights, toast.id]);

  const offset = expanded
    ? heightIndex * GAP + toastHeightBefore
    : heightIndex * GAP;

  const icon =
    toast.icon ?? value ? SuccessIcon : error ? ErrorIcon : getIcon(toast.type);

  const deleteToast = useCallback(() => {
    setRemoved(true);
    setOffsetBeforeRemove(offset);
    removeHeight(toast.id);

    setTimeout(removeToast, TIME_BEFORE_UNMOUNT, toast.id);
  }, [offset, removeHeight, removeToast, toast.id]);

  const { start, stop } = useTimeout({
    duration: toast.duration ?? DEFAULT_TIMEOUT_DURATION,
    onTimeout: deleteToast,
  });

  useEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setInitialHeight(height);
      setHeights((v) => [{ id: toast.id, height }, ...v]);

      return () => setHeights((v) => v.filter((x) => x.id !== toast.id));
    }
  }, [setHeights, toast.id]);

  useEffect(() => {
    if (expanded || loading) {
      stop();
    } else {
      return start();
    }
  }, [expanded, loading, start, stop]);

  useEffect(() => {
    if (toast.removed) {
      deleteToast();
    }
  }, [deleteToast, toast.removed]);

  return (
    <li
      ref={ref}
      className="nano-toast-toast"
      data-y-position={y}
      data-x-position={x}
      data-mounted={mounted}
      data-removed={removed}
      data-expanded={expanded}
      data-front={index === 0}
      data-visible={index < VISIBLE_TOASTS_AMOUNT}
      data-promise={Boolean(toast.promise)}
      data-styled={true}
      data-type={error ? "error" : value ? "success" : toast.type}
      style={
        {
          zIndex: toasts.length - index,
          "--index": index,
          "--initial-height": `${initialHeight}px`,
          "--offset": `${removed ? offsetBeforeRemove : offset}px`,
        } as CSSProperties
      }
    >
      <button
        className="nano-toast-toast-close-btn"
        disabled={loading}
        onClick={deleteToast}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {(loading || icon) && (
        <div className="nano-toast-toast-icon">
          {toast.promise && <Spinner visible={loading} />}
          {icon}
        </div>
      )}

      <div className="nano-toast-toast-content">
        {toast.title && (
          <div className="nano-toast-toast-title">{toast.title}</div>
        )}
        {toast.description && (
          <div className="nano-toast-toast-description">
            {toast.description}
          </div>
        )}
      </div>
    </li>
  );
};
