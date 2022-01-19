import React from "react";

interface ViewProps {
  children: JSX.Element | JSX.Element[] | any[];
}

export function View({ children }: ViewProps) {
  return (
    <main className="p-[40px] overflow-y-scroll w-full max-w-[1000px] mx-auto">
      {children}
    </main>
  );
}
