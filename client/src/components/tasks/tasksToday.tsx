import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { Task } from ".";
import { todaysDate } from "../../helpers/date";
import { useTasksInSelectedScope } from "../../store/taskSlice";
import {
  showTaskContextMenu,
  tasksTodayQuantities,
  toggleTask,
} from "../../utils/taskUtils";

export function TasksToday() {
  const tasks = useTasksInSelectedScope();
  const dispatch = useDispatch();

  const tasksToday = tasks.filter(
    (task) => task.dueDate && moment(task.dueDate).isSame(todaysDate(), "day")
  );
  const { tasksLeft, isAllTasksDismissed } = tasksTodayQuantities(tasksToday);

  return (
    <main>
      <header className="flex justify-between mb-[20px] items-center">
        <div>
          <h2>Tasks</h2>
          <h3 className="text-[10px] text-[#777]">
            {isAllTasksDismissed
              ? "All tasks handled"
              : `${tasksLeft} task${tasksLeft === 1 ? "" : "s"} left`}
          </h3>
        </div>
      </header>

      {tasksToday.map((task) => (
        <Task
          task={task}
          onContextMenuClick={(e, task) =>
            dispatch(showTaskContextMenu(e, task))
          }
          onCompleteClick={() => dispatch(toggleTask(task))}
        />
      ))}
    </main>
  );
}
