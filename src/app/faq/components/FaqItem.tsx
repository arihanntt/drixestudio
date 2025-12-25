"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { highlight } from "./highlight";

interface Props {
  question: string;
  answer: string;
  query: string;
}

export default function FaqItem({ question, answer, query }: Props) {
  const match =
    query &&
    (question.toLowerCase().includes(query.toLowerCase()) ||
      answer.toLowerCase().includes(query.toLowerCase()));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (match) setOpen(true);
  }, [match]);

  return (
    <div
      className={`rounded-xl border transition ${
        match
          ? "border-violet-500/60 bg-white/5"
          : "border-white/10"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <h3 className="font-medium text-white">
          {highlight(question, query)}
        </h3>
        <ChevronDown
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 text-white/70">
          {highlight(answer, query)}
        </div>
      )}
    </div>
  );
}
