import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaBrain,
  FaCheck,
  FaEye,
  FaDotCircle,
  FaBullseye,
  FaUndo,
} from "react-icons/fa";

import "./_sidebar.scss";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__main">
        <h1 className="sidebar__logo">Scoped</h1>
        <Link to="/dashboard" className="sidebar__link">
          <span className="sidebar__link-icon">
            <FaHome />
          </span>
          Dashboard
        </Link>
        <Link to="/goals" className="sidebar__link">
          <span className="sidebar__link-icon">
            <FaBullseye />
          </span>
          Goals
        </Link>
        <Link to="/tasks" className="sidebar__link">
          <span className="sidebar__link-icon">
            <FaCheck />
          </span>
          Tasks
        </Link>
        <Link to="/habits" className="sidebar__link">
          <span className="sidebar__link-icon">
            <FaUndo />
          </span>
          Habits
        </Link>
        <Link to="/reminders" className="sidebar__link">
          <span className="sidebar__link-icon">
            <FaBrain />
          </span>
          Reminders
        </Link>
      </div>

      <footer className="sidebar__footer">
        <Link to="/settings" className="sidebar__link">
          <span className="sidebar__link-icon">
            <FaCog />
          </span>
          Settings
        </Link>
      </footer>
    </aside>
  );
}
