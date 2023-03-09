import { useMounted } from './hooks';
import { ToastData } from './state';

interface ToastProps {
  index: number;
  data: ToastData;
}

export const Toast = ({ data }: ToastProps) => {
  const mounted = useMounted();

  return (
    <li className="nano-toast-toast" data-mounted={mounted}>
      {data.content}
    </li>
  );
};
