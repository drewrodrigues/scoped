import React, { useState } from "react";
import { FaBullseye, FaCheck, FaCog, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createOrSaveModel, destroy } from "../../data/modelCrud";
import { ISavedGoal, ISavedScope, IScope } from "../../data/modelTypes";
import {
  scopeCreated,
  scopeDeleted,
  scopeSelected,
  useAllScopes,
  useSelectedScope,
} from "../../store/scopeSlice";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { NavLinkProps, SidebarLink, SidebarLinkProps } from "./sidebarLink";

const links: NavLinkProps[] = [
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
];

export function Sidebar() {
  const dispatch = useDispatch();
  const selectedScope = useSelectedScope();
  const scopes = useAllScopes();

  const [newScopeText, setNewScopeText] = useState("");
  const [openScopeMenu, setOpenScopeMenu] = useState<ISavedScope | null>(null);

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

  async function deleteScope(scope: ISavedScope) {
    await destroy({ _id: scope._id, _rev: scope._rev });
    dispatch(scopeDeleted(scope));
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
        {scopes.map((scope) => {
          return (
            <>
              <SidebarLink
                isActive={selectedScope?._id == scope._id}
                name={scope.title}
                onClick={() => onSelectScope(scope._id)}
                onClickMenu={() => {
                  setOpenScopeMenu((alreadyOpenedMenu) => {
                    if (alreadyOpenedMenu === scope) {
                      return null;
                    } else {
                      return scope;
                    }
                  });
                }}
              />
              {scope === openScopeMenu && (
                <div className="flex flex-col rounded-[5px] py-[7px] px-[14px] text-[13px]">
                  <button
                    className="w-full flex items-center"
                    onClick={() => deleteScope(scope)}
                  >
                    <FaTrash className="mr-[3px]" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </>
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
