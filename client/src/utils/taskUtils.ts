import moment from "moment";
import { FormEvent } from "react";
import { destroy, createOrSaveModel } from "../data/modelCrud";
import { ISavedTask } from "../data/modelTypes";
import { todaysDate } from "../helpers/date";
import { showPopover } from "../store/popoverSlice";
import { AppDispatch } from "../store/store";
import { taskDeleted, taskUpdated } from "../store/taskSlice";

export const showTaskContextMenu =
  (e: React.MouseEvent<HTMLButtonElement>, task: ISavedTask) =>
  (dispatch: AppDispatch) => {
    dispatch(
      showPopover({
        x: e.clientX,
        y: e.clientY,
        popoverId: task._id,
        editAction: () => console.log("edit the task"),
        deleteAction: () => dispatch(deleteTask(task)),
      })
    );
  };

export const deleteTask =
  (task: ISavedTask) => async (dispatch: AppDispatch) => {
    await destroy({ _id: task._id, _rev: task._rev });
    dispatch(taskDeleted({ value: task }));
  };

export const toggleTask =
  (task: ISavedTask) => async (dispatch: AppDispatch) => {
    const updatedTask = await createOrSaveModel<ISavedTask>("Task", {
      ...task,
      completedOn: task.completedOn ? undefined : todaysDate().toUTCString(),
    });
    dispatch(taskUpdated({ value: updatedTask }));
  };

export function tasksTodayQuantities(tasks: ISavedTask[]) {
  const tasksCompleteCount = tasks.reduce((total, task) => {
    if (
      task.completedOn &&
      moment(task.completedOn).isSame(todaysDate(), "day")
    ) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  const isAllTasksDismissed = tasksCompleteCount === tasks.length;
  const tasksLeft = tasks.length - tasksCompleteCount;

  return {
    tasksLeft,
    isAllTasksDismissed,
    tasksDismissedCount: tasksCompleteCount,
  };
}
