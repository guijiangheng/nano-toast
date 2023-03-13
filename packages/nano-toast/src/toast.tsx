import './toast.css';

import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ErrorIcon, getIcon, Loading, SuccessIcon } from './assets';
import { useMounted, usePromise, useTimeout } from './hooks';
import { ToastData, useToaster } from './state';

const VISIBLE_TOAST_COUNT = 3;
const TIMEOUT_BEFORE_REMOVE = 400;
const DEFAULT_TIMEOUT_DURATION = 4000;

interface ToastProps {
  index: number;
  data: ToastData;
}

export const Toast = ({ index, data }: ToastProps) => {
  const { expanded, toasts, removeToast, heights, setHeights } = useToaster();
  const { loading, error, value } = usePromise(data.promise);

  const mounted = useMounted();
  const [initialHeight, setInitialHeight] = useState(0);

  const ref = useRef<HTMLLIElement>(null);

  const [heightIndex, toastHeightBefore, removed] = useMemo(() => {
    let mHeightIndex = 0;
    let toastHeightBefore = 0;

    for (const x of heights) {
      if (x.id === data.id) {
        return [mHeightIndex, toastHeightBefore, x.removed] as const;
      }

      if (x.removed) continue;

      ++mHeightIndex;
      toastHeightBefore += x.height;
    }

    return [0, 0, false] as const;
  }, [data.id, heights]);

  const deleteToast = useCallback(() => {
    setHeights((v) => {
      const k = v.findIndex((x) => x.id === data.id);
      v[k] = { ...v[k], removed: true };

      return [...v];
    });
    setTimeout(removeToast, TIMEOUT_BEFORE_REMOVE, data);
  }, [data, removeToast, setHeights]);

  const icon = useMemo(() => {
    if (data.icon) return data.icon;
    if (value) return SuccessIcon;
    if (error) return ErrorIcon;
    return getIcon(data.type);
  }, [data.icon, data.type, error, value]);

  useEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setInitialHeight(height);
      setHeights((v) => [{ id: data.id, height, removed: false }, ...v]);

      return () => setHeights((v) => v.filter((x) => x.id !== data.id));
    }
  }, [data.id, setHeights]);

  const { start, stop } = useTimeout({
    duration: data.duration ?? DEFAULT_TIMEOUT_DURATION,
    onTimeout: deleteToast,
  });

  useEffect(() => {
    if (expanded || loading) {
      stop();
    } else {
      start();
    }
  }, [expanded, loading, start, stop]);

  return (
    <li
      ref={ref}
      className="nano-toast-toast"
      data-mounted={mounted}
      data-front={heightIndex === 0}
      data-visible={heightIndex < VISIBLE_TOAST_COUNT}
      data-expanded={expanded}
      data-removed={removed}
      style={
        {
          '--z-index': toasts.length - index,
          '--height-index': heightIndex,
          '--initial-height': `${initialHeight}px`,
          '--toast-height-before': `${toastHeightBefore}px`,
        } as CSSProperties
      }
    >
      <>
        <button className="nano-toast-toast-close-btn" onClick={deleteToast}>
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

        {(data.promise || icon) && (
          <div className="nano-toast-toast-icon">
            {data.promise && <Loading visible={loading} />}
            {icon}
          </div>
        )}

        <div className="nano-toast-toast-content">
          {data.title && (
            <div className="nano-toast-toast-title">{data.title}</div>
          )}
          {data.description && (
            <div className="nano-toast-toast-description">
              {data.description}
            </div>
          )}
        </div>
      </>
    </li>
  );
};
