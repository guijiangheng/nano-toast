"use client";

import { Position, Toaster } from "nano-toast";
import { useState } from "react";

import { Positions } from "../src/components/positions";
import { Types } from "../src/components/types";
import { createContext } from "../src/hooks";

const useToasterImpl = () => {
  const [position, setPosition] = useState<Position>("bottom-right");

  return { position, setPosition };
};

export const [ToasterProvider, useToaster] =
  createContext<ReturnType<typeof useToasterImpl>>("ToasterProvider");

export default function Home() {
  const ctx = useToasterImpl();

  return (
    <ToasterProvider value={ctx}>
      <Types />
      <Positions />
      <Toaster position={ctx.position} />
    </ToasterProvider>
  );
}
