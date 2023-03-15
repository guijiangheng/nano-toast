import { ToasterProvider, useToaster } from "./context";
import { Toast } from "./toast";

export const ToasterImpl = () => {
  const { toasts, expanded, setExpanded } = useToaster();

  return (
    <ul
      className="nano-toast"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {toasts.map((x, index) => (
        <Toast key={x.id} index={index} toast={x}></Toast>
      ))}
    </ul>
  );
};

export const Toaster = () => {
  return (
    <ToasterProvider>
      <ToasterImpl />
    </ToasterProvider>
  );
};
