import React, { useState } from "react";
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
import {
  scopeSelected,
  scopeCreated,
  useSelectedScope,
  useAllScopes,
} from "../store/scopeSlice";
import { useDispatch } from "react-redux";
import { Scope } from "../data/couchModel";

const links: { to: string; name: string; icon: JSX.Element }[] = [
  {
    to: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    to: "/calendar",
    name: "Calendar",
    icon: <FaCalendar />,
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

export function Sidebar() {
  const dispatch = useDispatch();
  const selectedScope = useSelectedScope();
  const scopes = useAllScopes();

  const [showScopes, setShowScopes] = useState(false);
  const [newScopeText, setNewScopeText] = useState("");

  async function onCreateNewScope() {
    const newScope = new Scope({ title: newScopeText });
    const savedScope = await newScope.save();

    dispatch(scopeCreated({ scope: savedScope }));
    dispatch(scopeSelected({ selectedScopeId: savedScope._id }));
    setShowScopes(false);
    setNewScopeText("");
  }

  if (!scopes) {
    return <p>TODO: @drew design for empty states or create general scope?</p>;
  }

  return (
    <aside className="sidebar">
      {showScopes && (
        <div
          className="sidebar-open-backdrop"
          onClick={() => setShowScopes(false)}
        />
      )}
      <div className="sidebar__main">
        <h1 className="sidebar__logo">Scoped</h1>

        <div
          className="sidebar__scope"
          style={showScopes ? { position: "relative", zIndex: 10 } : {}}
        >
          <button onClick={() => setShowScopes((p) => !p)}>
            <span className="sidebar__link-icon">
              <FaCaretRight />
            </span>
            {selectedScope && <p>{selectedScope.title}</p>}
          </button>

          {scopes && showScopes && (
            <ul>
              {scopes.map((scope) => {
                if (scope === selectedScope) return null;
                return (
                  <li
                    onClick={() => {
                      dispatch(scopeSelected({ selectedScopeId: scope._id }));
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
