import React, { useState } from "react";
import { FaBullseye, FaCheck, FaCog } from "react-icons/fa";
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
  // {
  //   to: "/dashboard",
  //   name: "Dashboard",
  //   icon: <FaHome />,
  // },
  // {
  //   to: "/calendar",
  //   name: "Calendar",
  //   icon: <FaCalendar />,
  // },
  {
    to: "/today",
    name: "Today",
    icon: <FaCheck />,
  },
  {
    to: "/goals",
    name: "Goals",
    icon: <FaBullseye />,
  },
  // {
  //   to: "/tasks",
  //   name: "Tasks",
  //   icon: <FaCheck />,
  // },
  // {
  //   to: "/habits",
  //   name: "Habits",
  //   icon: <FaUndo />,
  // },
  // {
  //   to: "/reminders",
  //   name: "Reminders",
  //   icon: <FaBrain />,
  // },
  // {
  //   to: "/events",
  //   name: "Events",
  //   icon: <FaCalendar />,
  // },
];

export function Sidebar() {
  const dispatch = useDispatch();
  const selectedScope = useSelectedScope();
  const scopes = useAllScopes();

  const [newScopeText, setNewScopeText] = useState("");

  async function onCreateNewScope() {
    const scope = await createOrSaveModel<IScope>("Scope", {
      title: newScopeText,
    });

    dispatch(scopeCreated({ scope: scope }));
    dispatch(scopeSelected({ selectedScopeId: scope._id }));
    setNewScopeText("");
  }

  function onSelectScope(scopeId: string | null) {
    dispatch(scopeSelected({ selectedScopeId: scopeId }));
    if (scopeId) {
      localStorage.setItem("lastSelectedScopeId", scopeId);
    } else {
      localStorage.removeItem("lastSelectedScopeId");
    }
  }

  function saveLastStateLink(stateLink: NavLinkProps) {
    localStorage.setItem("LAST_SELECTED_STATE_LINK", stateLink.to);
  }

  if (!scopes) {
    return <p>TODO: @drew design for empty states or create general scope?</p>;
  }

  return (
    <aside className="flex flex-col w-[200px] justify-between bg-white flex-shrink-0 border-r-[1px] border-r-[#EFF2F3]">
      <div>
        <h1 className="py-[14px] px-[14px] text-[13px]">Scoped</h1>

        <SidebarLink
          isActive={!selectedScope}
          name={"All"}
          onClick={() => onSelectScope(null)}
        />
        {scopes.map((scope) => (
          <SidebarLink
            isActive={selectedScope?._id == scope._id}
            name={scope.title}
            onClick={() => onSelectScope(scope._id)}
          />
        ))}

        <div className="p-[13px]">
          <Input
            value={newScopeText}
            onChange={(value) => setNewScopeText(value)}
            placeholder="New scope title"
          />
          <Button text="Create Scope" onClick={onCreateNewScope} />
        </div>

        {links.map((link) => (
          <SidebarLink {...link} onClick={() => saveLastStateLink(link)} />
        ))}
      </div>

      <footer className="mb-[7px]">
        <SidebarLink to="/settings" icon={<FaCog />} name="Settings" />
      </footer>
    </aside>
  );
}
