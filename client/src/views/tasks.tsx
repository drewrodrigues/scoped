import React, { FormEvent, useEffect, useState } from "react";
import { FaCheck, FaSpinner, FaTasks } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { EmptyState } from "../components/emptyState";
import { ItemFilter } from "../components/itemFilter";
import { Button } from "../components/shared/button";
import { Task } from "../components/tasks";
import { createOrSaveModel, destroy } from "../data/modelCrud";
import { ISavedTask, ITask } from "../data/modelTypes";
import TasksEmpty from "../images/tasks_empty.svg";
import { showPopover } from "../store/popoverSlice";
import { useSelectedScope } from "../store/scopeSlice";
import { RootState } from "../store/store";
import {
  taskAdded,
  taskDeleted,
  taskUpdated,
  useTasksInSelectedScope,
} from "../store/taskSlice";
import { showTaskContextMenu, toggleTask } from "../utils/taskUtils";
import { View } from "./view";

enum TaskFilter {
  Incomplete = "Incomplete",
  Complete = "Complete",
  All = "All",
}

interface TasksProps {}

export function Tasks({}: TasksProps) {
  const selectedScope = useSelectedScope();
  const tasks = useTasksInSelectedScope();
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [taskFilter, setTaskFilter] = useState<TaskFilter>(
    TaskFilter.Incomplete
  );

  const popoverId = useSelector((state: RootState) => {
    if (state.popover.element) {
      return state.popover.element.popoverId;
    } else {
      return null;
    }
  });

  async function onAddTask(e: FormEvent) {
    e.preventDefault();
    if (!selectedScope) {
      throw new Error("No scope selected");
    }
    const newTask = await createOrSaveModel<ITask>("Task", {
      completedOn: undefined,
      title: newTitle,
      scopeId: selectedScope._id,
      dueDate,
    });
    dispatch(taskAdded({ value: newTask }));
    setNewTitle("");
    setDueDate("");
  }

  const filteredTasks: Record<TaskFilter, ISavedTask[]> = {
    [TaskFilter.Incomplete]: tasks.filter((task) => !task.completedOn),
    [TaskFilter.Complete]: tasks.filter((task) => task.completedOn),
    [TaskFilter.All]: tasks,
  };

  const selectedFilteredTasks = filteredTasks[taskFilter];

  return (
    <View title="Tasks" type="thin">
      <div className="mb-[20px]">
        <ItemFilter
          selectedValue={taskFilter}
          values={[
            {
              Icon: FaSpinner,
              label: TaskFilter.Incomplete,
              count: filteredTasks[TaskFilter.Incomplete].length,
            },
            {
              Icon: FaCheck,
              label: TaskFilter.Complete,
              count: filteredTasks[TaskFilter.Complete].length,
            },
            {
              Icon: FaTasks,
              label: TaskFilter.All,
              count: filteredTasks[TaskFilter.All].length,
            },
          ]}
          onChange={(value) => setTaskFilter(value)}
        />
      </div>

      {selectedScope && (
        <section className="mb-[10px]">
          <form
            className="border rounded-[3px] h-[40px] flex items-centerjustify-between bg-white"
            onSubmit={onAddTask}
          >
            <input
              placeholder="Add a task..."
              className="w-full px-[7px]"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
            />
            <Button />
          </form>

          <div className="relative inline-block">
            <input
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              className="text-[12px] w-[150px]"
            />
          </div>
        </section>
      )}

      {selectedFilteredTasks.length === 0 ? (
        <EmptyState
          img={TasksEmpty}
          title="You don't have any tasks here"
          subtitle="Try adding one below"
        />
      ) : (
        selectedFilteredTasks.map((task) => (
          <Task
            task={task}
            onContextMenuClick={(e, task) =>
              dispatch(showTaskContextMenu(e, task))
            }
            isPoppedOver={popoverId === task._id}
            onCompleteClick={() => dispatch(toggleTask(task))}
          />
        ))
      )}
    </View>
  );
}
