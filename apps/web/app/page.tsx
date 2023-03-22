"use client";

import { Toaster } from "nano-toast";

import { ExpandMode } from "@components/expand-mode";
import { Footer } from "@components/footer";
import { Hero } from "@components/hero";
import { Installation } from "@components/installation";
import { Positions } from "@components/positions";
import { RichColors } from "@components/rich-colors";
import { Types } from "@components/types";

import { ToasterProvider, useToasterImpl } from "../src/hooks";

export default function Home() {
  const ctx = useToasterImpl();

  return (
    <ToasterProvider value={ctx}>
      <main className="container">
        <Hero />
        <div className="content">
          <Installation />
          <Types />
          <Positions />
          <ExpandMode />
          <RichColors />
        </div>
      </main>
      <Footer />
      <Toaster
        position={ctx.position}
        richColors={ctx.richColors}
        expandByDefault={ctx.expandByDefault}
      />
    </ToasterProvider>
  );
}
