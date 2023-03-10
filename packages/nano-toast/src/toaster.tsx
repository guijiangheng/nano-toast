import './toaster.css';

import { CSSProperties } from 'react';

import { ToasterContext, ToasterProvider } from './state';
import { Toast } from './toast';

export interface ToasterProps {
  offset?: number;
  gap?: number;
  width?: number;
}

export const Toaster = ({
  offset = 32,
  gap = 14,
  width = 356,
}: ToasterProps) => (
  <ToasterProvider params={{ gap }}>
    <ToasterContext.Consumer>
      {({ toasts, heights, setExpanded }) => (
        <ol
          className="nano-toast"
          style={
            {
              '--width': `${width}px`,
              '--offset': `${offset}px`,
              '--gap': `${gap}px`,
              '--front-toast-height': `${heights[0]?.height ?? 0}px`,
            } as CSSProperties
          }
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          {toasts.map((x, index) => (
            <Toast key={x.id} index={index} data={x} />
          ))}
        </ol>
      )}
    </ToasterContext.Consumer>
  </ToasterProvider>
);
