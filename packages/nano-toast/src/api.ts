import { ReactNode } from "react";

import { Subject } from "./subject";

export type ToastType =
  | "normal"
  | "info"
  | "success"
  | "error"
  | "promise"
  | "update";

interface JsxParams<T = any> {
  loading: boolean;
  error?: any;
  value?: T;
  update: (options: ToastOptions<T>) => void;
  dismiss: () => void;
}

export interface ToastData<T = any> {
  id: number;
  type: ToastType;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  jsx?: (params: JsxParams<T>) => ReactNode;
  duration?: number;
  promise?: Promise<T> | (() => Promise<T>);
  removed?: boolean;
}

export type ToastOptions<T = any> = Omit<ToastData<T>, "id" | "type">;

let id = 0;
export const subject = new Subject<ToastData>();

export const update = (id: number, options: ToastOptions) =>
  subject.publish({
    id,
    type: "update",
    ...options,
  });

export const dismiss = (id: number) =>
  subject.publish({
    id,
    type: "update",
    removed: true,
  });

const publish = (data: Omit<ToastData, "id">) => {
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

export const toast = Object.assign(factory("normal"), {
  info: factory("info"),
  success: factory("success"),
  error: factory("error"),
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: ToastOptions<T>
  ) => publish({ type: "promise", promise, ...options }),
});
