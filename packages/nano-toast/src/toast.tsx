import './toast.css';

import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

import { useMounted } from './hooks';
import { ToastData, useToaster } from './state';

const VISIBLE_TOAST_COUNT = 3;

interface ToastProps {
  index: number;
  data: ToastData;
}

export const Toast = ({ index, data }: ToastProps) => {
  const { expanded, toasts, heights, setHeights } = useToaster();

  const mounted = useMounted();
  const [initialHeight, setInitialHeight] = useState(0);

  const ref = useRef<HTMLLIElement>(null);

  const [heightIndex, toastHeightBefore] = useMemo(() => {
    let mHeightIndex = 0;
    let toastHeightBefore = 0;

    for (const x of heights) {
      if (x.id === data.id) {
        return [mHeightIndex, toastHeightBefore] as const;
      }

      ++mHeightIndex;
      toastHeightBefore += x.height;
    }

    return [0, 0] as const;
  }, [data.id, heights]);

  useEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setInitialHeight(height);
      setHeights((v) => [{ id: data.id, height }, ...v]);
    }
  }, [data.id, setHeights]);

  return (
    <li
      ref={ref}
      className="nano-toast-toast"
      data-mounted={mounted}
      data-front={index === 0}
      data-visible={index < VISIBLE_TOAST_COUNT}
      data-expanded={expanded}
      style={
        {
          '--index': index,
          '--z-index': toasts.length - index,
          '--height-index': heightIndex,
          '--initial-height': `${initialHeight}px`,
          '--toast-height-before': `${toastHeightBefore}px`,
        } as CSSProperties
      }
    >
      <div>{data.content}</div>
    </li>
  );
};
