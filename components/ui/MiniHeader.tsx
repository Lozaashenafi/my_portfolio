import React from "react";

type MiniHeaderProps = {
  number: number; // number prop
  title: string; // title prop
};
function MiniHeader({ number, title }: MiniHeaderProps) {
  return (
    <div className="flex items-center justify-center mb-8 space-x-4">
      <div className="h-[1px] flex-1 bg-slate-200 dark:bg-dark-tertiary"></div>

      <div className="flex items-baseline space-x-2">
        <span className="text-primary font-mono text-sm font-bold">
          0{number}.
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-soft-white ">
          {title}
        </h2>
      </div>

      <div className="h-[1px] flex-1 bg-slate-200 dark:bg-dark-tertiary"></div>
    </div>
  );
}

export default MiniHeader;
