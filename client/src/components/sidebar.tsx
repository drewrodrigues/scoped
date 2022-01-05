import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaBrain,
  FaCheck,
  FaBullseye,
  FaUndo,
  FaCalendar,
} from "react-icons/fa";

import {
  scopeSelected,
  scopeCreated,
  useSelectedScope,
  useAllScopes,
} from "../store/scopeSlice";
import { useDispatch } from "react-redux";
import { Scope } from "../data/couchModel";
import { SidebarLink, SidebarLinkProps } from "./sidebarLink";

const links: SidebarLinkProps[] = [
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

  const [newScopeText, setNewScopeText] = useState("");

  async function onCreateNewScope() {
    const newScope = new Scope({ title: newScopeText });
    const savedScope = await newScope.save();

    dispatch(scopeCreated({ scope: savedScope }));
    dispatch(scopeSelected({ selectedScopeId: savedScope._id }));
    setNewScopeText("");
  }

  if (!scopes) {
    return <p>TODO: @drew design for empty states or create general scope?</p>;
  }

  return (
    <aside className="flex flex-col w-[160px] justify-between border shadow-md bg-white">
      <div className="">
        <h1 className="">Scoped</h1>

        <div className="">
          {selectedScope && <p className="font-bold">{selectedScope.title}</p>}
          {scopes && (
            <ul>
              {scopes.map((scope) => {
                if (scope === selectedScope) return null;
                return (
                  <li
                    onClick={() => {
                      dispatch(scopeSelected({ selectedScopeId: scope._id }));
                    }}
                  >
                    {scope.title}
                  </li>
                );
              })}
            </ul>
          )}

          <input
            type="text"
            value={newScopeText}
            onChange={(e) => setNewScopeText(e.target.value)}
          />
          <button onClick={onCreateNewScope}>+</button>
        </div>

        {links.map((link) => (
          <SidebarLink {...link} />
        ))}
      </div>

      <footer className="mb-[7px]">
        <SidebarLink to="/settings" icon={<FaCog />} name="Settings" />
      </footer>
    </aside>
  );
}
