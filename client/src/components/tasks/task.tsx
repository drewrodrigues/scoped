import classNames from "classnames";
import moment from "moment";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { ISavedTask } from "../../data/modelTypes";

interface TaskProps {
  task: ISavedTask;
  onContextMenuClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    task: ISavedTask
  ) => void;
  isPoppedOver?: boolean;
  onCompleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Task({
  task,
  onContextMenuClick,
  isPoppedOver,
  onCompleteClick,
}: TaskProps) {
  return (
    <div
      className={classNames(
        "border pl-[10px] pr-[10px] py-[6px] bg-white flex justify-between items-center group mb-[5px] rounded-[15px]",
        { "z-40 relative": isPoppedOver }
      )}
    >
      <div className="flex items-center">
        <button
          className="bg-[#E9EAEE] w-[20px] h-[20px] rounded-[7px] mr-[10px] flex items-center justify-center text-[11px]"
          onClick={onCompleteClick}
        >
          {task.completedOn && <FaCheck />}
        </button>
        <div>
          <p
            className={classNames("text-[14px]", {
              "line-through": task.completedOn,
            })}
          >
            {task.title}
          </p>
          {task.dueDate && (
            <p className="text-[9px] text-gray-400 cursor-pointer mt-[5px]">
              due {moment(task.dueDate).fromNow()} on{" "}
              {moment(task.dueDate).format("MM/DD/YY")}
            </p>
          )}
        </div>
      </div>

      <aside className="group">
        {!isPoppedOver ? (
          <button
            className="p-[5px] rounded-[5px]"
            onClick={(e) => onContextMenuClick(e, task)}
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
