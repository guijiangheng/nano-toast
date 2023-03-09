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
  gap = 16,
  width = 300,
}: ToasterProps) => (
  <ToasterProvider params={{ offset, gap, width }}>
    <ToasterContext.Consumer>
      {({ toasts, heights }) => (
        <ol
          className="nano-toast"
          style={
            {
              '--width': `${width}px`,
              '--offset': `${offset}px`,
              '--gap': `${gap}px`,
              '--toast-front-height': `${heights[0]?.height ?? 0}px`,
            } as CSSProperties
          }
        >
          {toasts.map((x, index) => (
            <Toast key={x.id} index={index} data={x} />
          ))}
        </ol>
      )}
    </ToasterContext.Consumer>
  </ToasterProvider>
);
