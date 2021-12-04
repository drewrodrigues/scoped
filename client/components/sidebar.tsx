import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaBrain,
  FaCheck,
  FaBullseye,
  FaUndo,
  FaChevronDown,
  FaCaretDown,
  FaCaretRight,
} from "react-icons/fa";

import "./_sidebar.scss";

interface SidebarProps {}

const links: { to: string; name: string; icon: JSX.Element }[] = [
  {
    to: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    to: "/goals",
    name: "Goals",
    icon: <FaBullseye />,
  },
  {
    to: "/tasks",
    name: "Tasks",
    icon: <FaCheck />,
  },
  {
    to: "/habits",
    name: "Habits",
    icon: <FaUndo />,
  },
  {
    to: "/reminders",
    name: "Reminders",
    icon: <FaBrain />,
  },
];

export function Sidebar({}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__main">
        <h1 className="sidebar__logo">Scoped</h1>

        <h2 className="sidebar__scope">
          <span className="sidebar__link-icon">
            <FaCaretRight />
          </span>
          Career
        </h2>

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="sidebar__link"
            activeClassName="sidebar__link--active"
          >
            <span className="sidebar__link-icon">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </div>

      <footer className="sidebar__footer">
        <NavLink
          to="/settings"
          className="sidebar__link"
          activeClassName="sidebar__link--active"
        >
          <span className="sidebar__link-icon">
            <FaCog />
          </span>
          Settings
        </NavLink>
      </footer>
    </aside>
  );
}
