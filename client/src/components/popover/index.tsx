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

  function onDismissPopover(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    dispatch(hidePopover());

    // @ts-ignore
    const isBackdrop = e.target.dataset.id === "popoverBackdrop";
    if (isBackdrop) {
      element?.onDismiss?.(e);
    }
  }

  if (!element) return null;

  return <Popover {...element} onDismiss={onDismissPopover} />;
}

export function Popover({
  onDismiss,
  x,
  y,
  customActions,
  editAction,
  deleteAction,
  direction,
  component,
}: PopoverElement) {
  const xPos = direction === "left" && x ? x - 150 : x;

  if (component) {
    return (
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-30 backdrop-blur-sm flex items-center justify-center"
        onClick={onDismiss}
        style={{ background: "rgba(0,0,0,0.45)" }}
        data-id="popoverBackdrop"
      >
        {component}
      </div>
    );
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-30 backdrop-blur-sm flex items-center justify-center"
      onClick={onDismiss}
      style={{ background: "rgba(0,0,0,0.45)" }}
      data-id="popoverBackdrop"
    >
      {ReactDOM.createPortal(
        <div
          style={{ left: xPos, top: y }}
          className={classNames(
            "bg-white absolute flex flex-col py-[10px] rounded-[10px] shadow-md border z-50",
            {
              "w-[150px]": !component,
            }
          )}
        >
          {editAction && (
            <button
              onClick={(e) => {
                onDismiss?.(e);
                editAction();
              }}
              className="flex items-center px-[20px] py-[10px] hover:bg-[#EBECF0]"
            >
              <AiOutlineEdit className="mr-[10px]" />
              <p>Edit</p>
            </button>
          )}
          {deleteAction && (
            <button
              onClick={(e) => {
                onDismiss?.(e);
                deleteAction();
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
              onClick={(e) => {
                onDismiss?.(e);
                action.action();
              }}
              className="flex items-center px-[20px] py-[10px] hover:bg-[#EBECF0]"
            >
              {action.Icon && <action.Icon className="mr-[10px]" />}
              <p>{action.label}</p>
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
