import React from "react";

interface ViewProps {
  children: JSX.Element | JSX.Element[];
}

export function View({ children }: ViewProps) {
  return <main className="view">{children}</main>;
}
