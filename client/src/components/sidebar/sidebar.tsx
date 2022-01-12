import React, { useState } from "react";
import {
  FaBrain,
  FaBullseye,
  FaCalendar,
  FaCheck,
  FaChevronCircleDown,
  FaChevronCircleRight,
  FaCog,
  FaHome,
  FaUndo,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createOrSaveModel } from "../../data/modelCrud";
import { IScope } from "../../data/modelTypes";
import {
  scopeCreated,
  scopeSelected,
  useAllScopes,
  useSelectedScope,
} from "../../store/scopeSlice";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
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

  const [showScopes, setShowScopes] = useState(false);

  const [newScopeText, setNewScopeText] = useState("");

  async function onCreateNewScope() {
    const newScope = new Scope({ title: newScopeText });
    const savedScope = await newScope.save();

    dispatch(scopeCreated({ scope: savedScope }));
    dispatch(scopeSelected({ selectedScopeId: savedScope._id }));
    setNewScopeText("");
  }

  function onSelectScope(scopeId: string) {
    dispatch(scopeSelected({ selectedScopeId: scopeId }));
    localStorage.setItem('lastSelectedScopeId', scopeId);
    setShowScopes(false);
  }

  if (!scopes) {
    return <p>TODO: @drew design for empty states or create general scope?</p>;
  }

  return (
    <aside className="flex flex-col w-[160px] justify-between border shadow-md bg-white flex-shrink-0">
      <div>
        <h1 className="py-[14px] px-[14px] text-[13px]">Scoped</h1>

        {selectedScope && (
          <button
            className="font-bold py-[7px] px-[14px] text-[13px] flex items-center"
            onClick={() => setShowScopes((p) => !p)}
          >
            {showScopes ? (
              <FaChevronCircleDown className="mr-[5px] text-[#ccc]" />
            ) : (
              <FaChevronCircleRight className="mr-[5px] text-[#ccc]" />
            )}
            {selectedScope.title}
          </button>
        )}

        {scopes && showScopes && (
          <div>
            {/* TODO: refactor this out with sidebar link */}
            {scopes.map((scope) => {
              if (selectedScope?._id == scope._id) return null;

              return (
                <button
                  onClick={() => onSelectScope(scope._id)}
                  className="py-[7px] px-[14px] text-[13px] w-full text-left"
                >
                  {scope.title}
                </button>
              );
            })}

            <div className="p-[13px]">
              <Input
                value={newScopeText}
                onChange={(value) => setNewScopeText(value)}
                placeholder="New scope title"
              />
              <Button text="Create Scope" onClick={onCreateNewScope} />
            </div>
          </div>
        )}

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
