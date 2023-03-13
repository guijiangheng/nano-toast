'use client';

import { loremIpsum } from 'lorem-ipsum';
import { toast, Toaster } from 'nano-toast';
import { Types } from '../src/components/types';

export default function Web() {
  return (
    <div>
      <Types />
      <Toaster />
    </div>
  );
}
