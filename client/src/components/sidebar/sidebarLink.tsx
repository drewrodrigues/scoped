import classNames from "classnames";
import React from "react";
import { FaCheck, FaEllipsisH } from "react-icons/fa";
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
  onClickColor?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
}

export type SidebarLinkProps = NavLinkProps | StateLinkProps;

export function SidebarLink(props: SidebarLinkProps) {
  return isNavLinkProps(props) ? (
    <NavLink
      key={props.to}
      to={props.to}
      className="rounded-[5px] bg-white flex items-center py-[7px] px-[14px] text-[12px] hover:bg-[#e8e8e9] justify-between"
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
        "rounded-[5px] bg-white flex items-center py-[7px] px-[14px] text-[12px] cursor-pointer justify-between group h-[35px]",
        { "font-bold": props.isActive }
      )}
      onClick={props.onClick}
    >
      <span className="flex items-center justify-center">
        <button
          className="w-[15px] h-[15px] mr-[10px] rounded-[5px]"
          style={stylesForColorButton(props.isActive, props.color)}
          onClick={props.onClickColor}
        />
        <span>{props.name}</span>
      </span>

      <span className="flex items-center justify-center">
        {props.isActive && (
          <FaCheck className="group-hover:hidden text-[12px] text-gray-600" />
        )}
        {props.onClickMenu && (
          <button
            className="hidden p-[5px] rounded-[5px] hover:text-white group-hover:text-gray-400 group-hover:block hover:bg-gray-300"
            onClick={props.onClickMenu}
          >
            <FaEllipsisH />
          </button>
        )}
      </span>
    </a>
  );
}

function isNavLinkProps<T>(
  attributes: NavLinkProps | StateLinkProps
): attributes is NavLinkProps {
  return !!(attributes as NavLinkProps).to;
}

function stylesForColorButton(isActive: boolean, color?: string) {
  if (isActive) {
    if (color) {
      return { backgroundColor: color };
    } else {
      return { backgroundColor: "#ccc" };
    }
  } else {
    if (color) {
      return { border: `2px solid ${color}` };
    } else {
      return { border: `2px solid #ccc` };
    }
  }
}
