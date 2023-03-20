"use client";

import { Position, Toaster } from "nano-toast";
import { useState } from "react";

import { ExpandMode } from "@components/expand-mode";
import { Positions } from "@components/positions";
import { RichColors } from "@components/rich-colors";
import { Types } from "@components/types";
import { createContext } from "../src/hooks";

const useToasterImpl = () => {
  const [position, setPosition] = useState<Position>("bottom-right");
  const [richColors, setRichColors] = useState(false);
  const [expandByDefault, setExpandByDefault] = useState(false);

  return {
    position,
    setPosition,
    expandByDefault,
    setExpandByDefault,
    richColors,
    setRichColors,
  };
};

export const [ToasterProvider, useToaster] =
  createContext<ReturnType<typeof useToasterImpl>>("ToasterProvider");

export default function Home() {
  const ctx = useToasterImpl();

  return (
    <ToasterProvider value={ctx}>
      <Types />
      <Positions />
      <ExpandMode />
      <RichColors />
      <Toaster
        position={ctx.position}
        richColors={ctx.richColors}
        expandByDefault={ctx.expandByDefault}
      />
    </ToasterProvider>
  );
}
