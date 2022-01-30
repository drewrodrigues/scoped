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

  const tasksToday = tasks.filter((task) =>
    moment(task.dueDate).isSame(todaysDate(), "day")
  );
  const isAllTasksComplete = tasksToday.every((task) => task.completedOn);
  const { tasksLeft, isAllTasksDismissed, tasksDismissedCount } =
    tasksTodayQuantities(tasksToday);

  return (
    <main>
      <header className="flex justify-between mb-[20px] items-center">
        <div>
          <h2>Goals</h2>
          <h3 className="text-[10px] text-[#777]">
            {isAllTasksComplete
              ? "All goals handled"
              : `${tasksLeft} goal${tasksLeft === 1 ? "" : "s"} left`}
          </h3>
        </div>

        {/* <Button text="" onClick={() => console.log('save the things')}>
          {showDismissed ? <FaEyeSlash /> : <FaEye />}
        </Button> */}
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
