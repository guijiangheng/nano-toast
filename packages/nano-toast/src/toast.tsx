import "./toast.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ToastData } from "./api";
import { useToaster } from "./context";
import { useMounted, usePromise, useTimeout } from "./hooks";

const GAP = 14;
const TIME_BEFORE_UNMOUNT = 200;
const DEFAULT_TIMEOUT_DURATION = 400000;

export interface ToastProps {
  toast: ToastData;
  index: number;
}

export const Toast = ({ toast, index }: ToastProps) => {
  const { toasts, expanded, heights, removeHeight, removeToast } = useToaster();

  const mounted = useMounted();
  const [removed, setRemoved] = useState(false);
  const { loading, error, value } = usePromise(toast.promise);
  const [initialHeight, setInitialHeight] = useState(0);
  const [offsetBeforeRemove, setOffsetBeforeRemove] = useState(0);

  const ref = useRef<HTMLLIElement>(null);

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
      data-mounted={mounted}
      data-removed={removed}
      data-expanded={expanded}
      data-styled={true}
      data-type={error ? "error" : value ? "success" : toast.type}
      style={{
        zIndex: toasts.length - index,
      }}
    >
      <button disabled={loading} onClick={deleteToast}>
        x
      </button>
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
