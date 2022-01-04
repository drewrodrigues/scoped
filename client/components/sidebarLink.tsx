import React from "react";
import { NavLink } from "react-router-dom";

export interface SidebarLinkProps {
  to: string;
  name: string;
  icon: JSX.Element;
}

export function SidebarLink({ to, name, icon }: SidebarLinkProps) {
  return (
    <NavLink
      key={to}
      to={to}
      className="rounded-[5px] flex items-center py-[7px] px-[14px] text-[13px] hover:bg-[#e8e8e9]"
      activeClassName="font-bold"
    >
      <span className="text-[#aaa] mr-[6px] text-[10px]">{icon}</span>
      {name}
    </NavLink>
  );
}
