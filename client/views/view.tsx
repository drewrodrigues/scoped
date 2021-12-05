import React from "react";
import "./_view.scss";

interface ViewProps {
  children: JSX.Element | JSX.Element[];
}

export function View({ children }: ViewProps) {
  return <main className="view">{children}</main>;
}
