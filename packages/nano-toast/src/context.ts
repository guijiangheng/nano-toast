import { useCallback, useEffect, useState } from "react";

import { subject, ToastData } from "./api";
import { createContext } from "./hooks";

interface HeightT {
  id: number;
  height: number;
}

export const [ToasterProvider, useToaster] = createContext(
  "NanoToastProvider",
  function useToaster() {
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
          setToasts((v) => [...v, x]);
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
);
