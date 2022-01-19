import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";

export interface SidebarLinkSharedProps {
  name: string;
  onClick?: () => void;
}
export interface NavLinkProps extends SidebarLinkSharedProps {
  to: string;
  icon: JSX.Element;
}

interface StateLinkProps extends SidebarLinkSharedProps {
  isActive: boolean;
}

export type SidebarLinkProps = NavLinkProps | StateLinkProps;

export function SidebarLink(props: SidebarLinkProps) {
  return isNavLinkProps(props) ? (
    <NavLink
      key={props.to}
      to={props.to}
      className="rounded-[5px] flex items-center py-[7px] px-[14px] text-[13px] hover:bg-[#e8e8e9]"
      activeClassName="font-bold"
      onClick={props.onClick}
    >
      <span className="text-[#aaa] mr-[6px] text-[10px]">{props.icon}</span>
      {props.name}
    </NavLink>
  ) : (
    <a
      className={classNames(
        "rounded-[5px] flex items-center py-[7px] px-[14px] text-[13px] hover:bg-[#e8e8e9] cursor-pointer",
        { "font-bold": props.isActive }
      )}
      onClick={props.onClick}
    >
      {/* <span className="text-[#aaa] mr-[6px] text-[10px]">{props.icon}</span> */}
      {props.name}
    </a>
  );
}

function isNavLinkProps<T>(
  attributes: NavLinkProps | StateLinkProps
): attributes is NavLinkProps {
  return !!(attributes as NavLinkProps).to;
}
