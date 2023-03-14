import { ReactNode, useEffect, useState, useMemo } from 'react';

import { createContext, useEventCallback } from './hooks';
import { Subject } from './subject';

const TIMEOUT_BEFORE_REMOVE = 400;

export type ToastType =
  | 'normal'
  | 'info'
  | 'success'
  | 'error'
  | 'promise'
  | 'update'
  | 'dismiss';

export interface ToastData {
  id: number;
  type: ToastType;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  duration?: number;
  promise?: Promise<any> | (() => Promise<any>);
}

export type ToastOptions = Omit<ToastData, 'id' | 'type'>;

let id = 0;
const subject = new Subject<ToastData>();

interface HeightT {
  id: number;
  height: number;
  removed: boolean;
}

interface Params {
  gap: number;
}

export const [ToasterProvider, useToaster, ToasterContext] = createContext(
  'ToasterProvider',
  function useToasterContext(params?: Params) {
    const [expanded, setExpanded] = useState(false);
    const [toasts, setToasts] = useState([] as ToastData[]);
    const [heights, setHeights] = useState([] as HeightT[]);

    const frontToastHeight = useMemo(
      () => heights.find((x) => !x.removed)?.height ?? 0,
      [heights],
    );

    const updateToast = useEventCallback((data: ToastData) => {
      const k = toasts.findIndex((x) => x.id === data.id);
      if (k !== -1) {
        toasts[k] = { ...toasts[k], ...data, type: toasts[k].type };
        setToasts([...toasts]);
      }
    });

    const deleteToast = useEventCallback((id: number) => {
      setTimeout(
        () => setToasts((v) => v.filter((x) => x.id !== id)),
        TIMEOUT_BEFORE_REMOVE,
      );

      const k = heights.findIndex((x) => x.id === id);
      if (k !== -1) {
        heights[k] = { ...heights[k], removed: true };
        setHeights([...heights]);
      }
    });

    useEffect(() => {
      if (!toasts.length) {
        setExpanded(false);
      }
    }, [toasts.length]);

    useEffect(
      () =>
        subject.subscribe((x) => {
          if (x.type === 'dismiss') {
            deleteToast(x.id);
          } else if (x.type === 'update') {
            updateToast(x);
          } else {
            setToasts((v) => [x, ...v]);
          }
        }),
      [deleteToast, updateToast],
    );

    return {
      ...params,
      expanded,
      setExpanded,
      toasts,
      deleteToast,
      heights,
      setHeights,
      frontToastHeight,
    };
  },
);

export const dismiss = (id: number) =>
  subject.publish({
    id,
    type: 'dismiss',
  });

export const update = (id: number, options: ToastOptions) =>
  subject.publish({
    id,
    type: 'update',
    ...options,
  });

const publish = (data: Omit<ToastData, 'id'>) => {
  const mId = id++;

  subject.publish({
    id: mId,
    ...data,
  });

  return {
    id: mId,
    dismiss: () => dismiss(mId),
    update: (options: ToastOptions) => update(mId, options),
  };
};

const factory =
  (type: ToastType) =>
  (title: ReactNode, options: ToastOptions = {}) =>
    publish({ type, title, ...options });

export const toast = Object.assign(factory('normal'), {
  info: factory('info'),
  success: factory('success'),
  error: factory('error'),
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: ToastOptions = {},
  ) => publish({ type: 'promise', promise, ...options }),
});
