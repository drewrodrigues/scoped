import React, { FormEvent, useEffect, useState } from "react";
import {
  FaBullseye,
  FaCalendar,
  FaCheck,
  FaCog,
  FaEdit,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createOrSaveModel, destroy } from "../../data/modelCrud";
import { ISavedScope, IScope } from "../../data/modelTypes";
import { goalsTodayQuantities } from "../../hooks/goalHooks";
import { useAllGoals } from "../../store/goalSlice";
import { showPopover } from "../../store/popoverSlice";
import {
  scopeCreated,
  scopeDeleted,
  scopeSelected,
  scopeUpdated,
  useAllScopes,
  useSelectedScope,
} from "../../store/scopeSlice";
import { NavLinkProps, SidebarLink } from "./sidebarLink";

const links: NavLinkProps[] = [
  {
    to: "/today",
    name: "Today",
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
];

export function Sidebar() {
  const dispatch = useDispatch();
  const selectedScope = useSelectedScope();
  const scopes = useAllScopes();
  const goals = useAllGoals();
  const { goalsLeft } = goalsTodayQuantities(goals);

  const [newScopeText, setNewScopeText] = useState("");

  async function onCreateNewScope(e: any) {
    e.preventDefault();
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

  const [editingScope, setEditingScope] = useState<ISavedScope | null>(null);
  const [newEditingScopeTitle, setNewEditingScopeTitle] = useState("");
  function onEditScopeClick(scope: ISavedScope) {
    setEditingScope(scope);
    setNewEditingScopeTitle(scope.title);
  }

  useEffect(() => {
    function maintainOrTriggerUpdate(e: MouseEvent) {
      // @ts-ignore
      if (e.target.closest("#editScopeForm")) {
        return;
      } else {
        setEditingScope(null);
        setNewEditingScopeTitle("");
        onUpdateScope();
      }
    }

    if (editingScope) {
      document.body.addEventListener("click", maintainOrTriggerUpdate);
    }

    return () =>
      document.body.removeEventListener("click", maintainOrTriggerUpdate);
  }, [editingScope]);

  async function onUpdateScope(e?: FormEvent) {
    e?.preventDefault();
    const updatedScope = await createOrSaveModel<IScope>("Scope", {
      ...editingScope,
      title: newEditingScopeTitle,
    });
    dispatch(scopeUpdated(updatedScope));
  }

  function onOpenScopeMenu(
    scope: ISavedScope,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    dispatch(
      showPopover({
        x: e.clientX,
        y: e.clientY,
        component: (
          <div className="flex flex-col rounded-[5px] py-[7px] px-[14px] text-[13px]">
            <button
              className="w-full flex items-center"
              onClick={() => onEditScopeClick(scope)}
            >
              <FaEdit className="mr-[3px]" />
              <span>Edit</span>
            </button>
            <button
              className="w-full flex items-center"
              onClick={() => deleteScope(scope)}
            >
              <FaTrash className="mr-[3px]" />
              <span>Delete</span>
            </button>
          </div>
        ),
      })
    );
    e.stopPropagation();
  }

  function saveLastStateLink(stateLink: NavLinkProps) {
    localStorage.setItem("LAST_SELECTED_STATE_LINK", stateLink.to);
  }

  async function deleteScope(scope: ISavedScope) {
    await destroy({ _id: scope._id, _rev: scope._rev });
    dispatch(scopeDeleted(scope));
  }

  return (
    <aside className="flex flex-col w-[200px] justify-between bg-white flex-shrink-0 border-r-[1px] border-r-[#EFF2F3]">
      <div>
        <header className="mt-[20px] mb-[50px]">
          {links.map((link) => (
            <SidebarLink
              {...link}
              onClick={() => saveLastStateLink(link)}
              indicatorCount={
                link.name === "Today" && goalsLeft > 0 ? goalsLeft : undefined
              }
            />
          ))}
        </header>

        <SidebarLink
          isActive={!selectedScope}
          name={"All"}
          onClick={() => onSelectScope(null)}
        />
        {scopes.map((scope) => {
          return (
            <>
              {editingScope === scope ? (
                <form
                  onSubmit={(e) => onUpdateScope(e)}
                  className="flex px-[14px] items-center mt-[10px]"
                  id="editScopeForm"
                >
                  <input
                    className="w-full text-[13px]"
                    autoFocus
                    value={newEditingScopeTitle}
                    onChange={(e) => setNewEditingScopeTitle(e.target.value)}
                  />
                  <button className="text-gray-300 text-[13px] mr-[5px]">
                    <FaPlus />
                  </button>
                </form>
              ) : (
                <SidebarLink
                  isActive={selectedScope?._id == scope._id}
                  name={scope.title}
                  onClick={() => onSelectScope(scope._id)}
                  onClickMenu={(e) => onOpenScopeMenu(scope, e)}
                />
              )}
            </>
          );
        })}

        <form
          onSubmit={onCreateNewScope}
          className="flex px-[14px] items-center mt-[10px]"
        >
          <input
            value={newScopeText}
            onChange={(e) => setNewScopeText(e.target.value)}
            placeholder="Add a new scope..."
            className="w-full text-[13px]"
          />
          <button className="text-gray-300 text-[13px] mr-[5px]">
            <FaPlus />
          </button>
        </form>
      </div>

      <footer className="mb-[7px]">
        <SidebarLink to="/settings" icon={<FaCog />} name="Settings" />
      </footer>
    </aside>
  );
}
