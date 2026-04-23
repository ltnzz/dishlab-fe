import { useState } from "react";

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-white/10 bg-slate-900"
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-4 py-3 hover:bg-white/5"
            >
              <span className="text-sm font-medium">
                Step {index + 1}
              </span>

              <span>{isOpen ? "-" : "+"}</span>
            </button>

            <div
              className={`overflow-hidden px-4 text-sm text-white/70 transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-40 py-3" : "max-h-0 py-0"
              }`}
            >
              {item}
            </div>
          </div>
        );
      })}
    </div>
  );
}
