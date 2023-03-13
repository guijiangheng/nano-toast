import './toaster.css';

import { CSSProperties } from 'react';

import { ToasterContext, ToasterProvider } from './state';
import { Toast } from './toast';

const DEFAULT_OFFSET = 32;
const DEFAULT_GAP = 14;
const DEFAULT_WIDTH = 356;

export interface ToasterProps {
  offset?: number;
  gap?: number;
  width?: number;
}

export const Toaster = ({
  offset = DEFAULT_OFFSET,
  gap = DEFAULT_GAP,
  width = DEFAULT_WIDTH,
}: ToasterProps) => (
  <ToasterProvider params={{ gap }}>
    <ToasterContext.Consumer>
      {({ toasts, frontToastHeight, setExpanded }) => (
        <ol
          className="nano-toast"
          style={
            {
              '--width': `${width}px`,
              '--offset': `${offset}px`,
              '--gap': `${gap}px`,
              '--front-toast-height': `${frontToastHeight}px`,
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
