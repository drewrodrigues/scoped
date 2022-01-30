import classNames from "classnames";
import React from "react";
import { useSelectedScope } from "../store/scopeSlice";

interface ViewProps {
  children: JSX.Element | JSX.Element[] | any[];
  title: string;
  type?: "regular" | "thin";
}

export function View({ children, title, type }: ViewProps) {
  const scope = useSelectedScope();

  return (
    <main
      className={classNames(
        "p-[40px] overflow-y-scroll w-full max-w-[1200px] mx-auto",
        { "max-w-[600px]": type === "thin" }
      )}
    >
      <div className="text-[22px] mb-[20px]">
        <h3 className="font-bold">{title}</h3>
        <p className="text-[16px]">{scope ? scope.title : "All"}</p>
      </div>
      {children}
    </main>
  );
}
