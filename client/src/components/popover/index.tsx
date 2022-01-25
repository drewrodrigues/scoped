import classNames from "classnames";
import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { hidePopover, PopoverElement } from "../../store/popoverSlice";
import { RootState } from "../../store/store";

export function PopoverLayer() {
  const { element } = useSelector((state: RootState) => state.popover);
  const dispatch = useDispatch();

  function onHidePopover() {
    dispatch(hidePopover());
  }

  if (!element) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-30 backdrop-blur-sm"
      onClick={onHidePopover}
      style={{ background: "rgba(0,0,0,0.45)" }}
    >
      <Popover {...element} onHideClick={onHidePopover} />;
    </div>
  );
}

interface PopoverProps extends PopoverElement {
  onHideClick: () => void;
}

export function Popover({
  onHideClick,
  x,
  y,
  customActions,
  editAction,
  deleteAction,
  direction,
  component,
}: PopoverProps) {
  const xPos = direction === "left" ? x - 150 : x;

  return ReactDOM.createPortal(
    <div
      style={{ left: xPos, top: y }}
      className={classNames(
        "bg-white absolute flex flex-col py-[10px] rounded-[10px] shadow-md border z-50",
        {
          "w-[150px]": !component,
        }
      )}
    >
      {component ? (
        component
      ) : (
        <>
          {editAction && (
            <button
              onClick={() => {
                editAction();
                onHideClick();
              }}
              className="flex items-center px-[20px] py-[10px] hover:bg-[#EBECF0]"
            >
              <AiOutlineEdit className="mr-[10px]" />
              <p>Edit</p>
            </button>
          )}
          {deleteAction && (
            <button
              onClick={() => {
                deleteAction();
                onHideClick();
              }}
              className="flex items-center px-[20px] py-[10px] hover:bg-[#EBECF0]"
            >
              <AiOutlineDelete className="mr-[10px]" />
              <p>Delete</p>
            </button>
          )}

          {customActions?.length && customActions?.length > 0 && <hr />}
          {customActions?.map((action) => (
            <button
              onClick={() => {
                action.action();
                onHideClick();
              }}
              className="flex items-center px-[20px] py-[10px] hover:bg-[#EBECF0]"
            >
              {action.Icon && <action.Icon className="mr-[10px]" />}
              <p>{action.label}</p>
            </button>
          ))}
        </>
      )}
    </div>,
    document.body
  );
}
