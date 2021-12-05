import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaBrain,
  FaCheck,
  FaBullseye,
  FaUndo,
  FaCaretRight,
  FaCalendar,
} from "react-icons/fa";

import "./_sidebar.scss";
import { createScope, getScopes, Scope } from "../data/scope";

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
  {
    to: "/events",
    name: "Events",
    icon: <FaCalendar />,
  },
];

export function Sidebar({}: SidebarProps) {
  const [scopes, setScopes] = useState<Scope[]>(null);
  const [selectedScope, setSelectedScope] = useState<Scope>(null);
  const [showScopes, setShowScopes] = useState(false);

  const [newScopeText, setNewScopeText] = useState("");
  function onCreateNewScope() {
    createScope(newScopeText).then((scope) => {
      setSelectedScope(scope);
      setShowScopes(false);
      setScopes((scopes) => [...scopes, scope]);
      setNewScopeText("");
    });
  }

  useEffect(() => {
    getScopes()
      .then((scopes) => {
        setSelectedScope(scopes[0]);
        setScopes(scopes);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    createScope("Another")
      .then(() => {})
      .catch((e) => {});
  }, []);

  console.log("--->");
  console.log(scopes);

  if (!scopes) {
    return null;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__main">
        <h1 className="sidebar__logo">Scoped</h1>

        <div className="sidebar__scope">
          <button onClick={() => setShowScopes((p) => !p)}>
            <span className="sidebar__link-icon">
              <FaCaretRight />
            </span>
            <p>{selectedScope.title}</p>
          </button>

          {scopes && showScopes && (
            <ul>
              {scopes.map((scope) => {
                if (scope === selectedScope) return null;
                return (
                  <li
                    onClick={() => {
                      setSelectedScope(scope);
                      setShowScopes(false);
                    }}
                  >
                    {scope.title}
                  </li>
                );
              })}
            </ul>
          )}

          {showScopes && (
            <>
              <input
                type="text"
                value={newScopeText}
                onChange={(e) => setNewScopeText(e.target.value)}
              />
              <button onClick={onCreateNewScope}>+</button>
            </>
          )}
        </div>

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
