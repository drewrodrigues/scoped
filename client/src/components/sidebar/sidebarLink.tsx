import classNames from "classnames";
import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export interface SidebarLinkSharedProps {
  name: string;
  onClick?: () => void;
}
export interface NavLinkProps extends SidebarLinkSharedProps {
  to: string;
  icon: JSX.Element;
  indicatorCount?: number;
}

interface StateLinkProps extends SidebarLinkSharedProps {
  isActive: boolean;
  onClickMenu?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type SidebarLinkProps = NavLinkProps | StateLinkProps;

export function SidebarLink(props: SidebarLinkProps) {
  return isNavLinkProps(props) ? (
    <NavLink
      key={props.to}
      to={props.to}
      className="rounded-[5px] flex items-center py-[7px] px-[14px] text-[12px] hover:bg-[#e8e8e9] justify-between"
      activeClassName="font-bold"
      onClick={props.onClick}
    >
      <p className="flex items-center">
        <span className="text-[#aaa] mr-[6px] text-[10px]">{props.icon}</span>
        {props.name}
      </p>

      {props.indicatorCount && (
        <p className="text-[8px] bg-red-400 text-white py-[3px] px-[5px] rounded-full font-bold">
          {props.indicatorCount}
        </p>
      )}
    </NavLink>
  ) : (
    <a
      className={classNames(
        "rounded-[5px] flex items-center py-[7px] px-[14px] text-[12px] hover:bg-[#e8e8e9] cursor-pointer justify-between group",
        { "font-bold": props.isActive }
      )}
      onClick={props.onClick}
    >
      <span>{props.name}</span>
      {props.onClickMenu && (
        <button
          className="opacity-0 p-[5px] rounded-[5px] hover:text-white group-hover:text-gray-400 group-hover:opacity-100 hover:bg-gray-300 "
          onClick={props.onClickMenu}
        >
          <FaEllipsisH />
        </button>
      )}
    </a>
  );
}

function isNavLinkProps<T>(
  attributes: NavLinkProps | StateLinkProps
): attributes is NavLinkProps {
  return !!(attributes as NavLinkProps).to;
}
