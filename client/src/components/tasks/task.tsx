import classNames from "classnames";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { ISavedTask } from "../../data/modelTypes";

interface TaskProps {
  task: ISavedTask;
  onEditClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    task: ISavedTask
  ) => void;
  isPoppedOver?: boolean;
  onCompleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Task({
  task,
  onEditClick,
  isPoppedOver,
  onCompleteClick,
}: TaskProps) {
  return (
    <div
      className={classNames(
        "border pl-[15px] pr-[15px] py-[12px] bg-white flex justify-between items-center group mb-[5px] rounded-[15px]",
        { "z-40 relative": isPoppedOver }
      )}
    >
      <div className="flex items-center">
        <button
          className="bg-[#E9EAEE] w-[24px] h-[24px] rounded-[7px] mr-[13px] flex items-center justify-center text-[11px]"
          onClick={onCompleteClick}
        >
          {task.complete && <FaCheck />}
        </button>
        <p
          className={classNames("text-[16px]", {
            "line-through": task.complete,
          })}
        >
          {task.title}
        </p>
      </div>
      <p className="text-[10px]">{task.dueDate}</p>

      <aside className="group">
        {!isPoppedOver ? (
          <button
            className="p-[5px] rounded-[5px]"
            onClick={(e) => onEditClick(e, task)}
          >
            <BsThreeDotsVertical className="text-white group-hover:text-[#E9EAEE] text-[18px]" />
          </button>
        ) : (
          <button className="p-[5px] rounded-[5px] bg-[#EBECF0]">
            <BsThreeDotsVertical className="text-[#777] text-[18px]" />
          </button>
        )}
      </aside>
    </div>
  );
}
