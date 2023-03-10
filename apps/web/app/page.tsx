'use client';

import { loremIpsum } from 'lorem-ipsum';
import { toast, Toaster } from 'nano-toast';

export default function Web() {
  return (
    <div>
      <button
        onClick={() =>
          toast(
            loremIpsum({
              sentenceLowerBound: 5,
              sentenceUpperBound: 60,
            }),
          )
        }
      >
        toast
      </button>
      <Toaster />
    </div>
  );
}
