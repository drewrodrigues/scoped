import React, { FormEvent, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { EmptyState } from "../components/emptyState";
import { Button } from "../components/shared/button";
import { Task } from "../components/tasks";
import { createOrSaveModel } from "../data/modelCrud";
import { ITask } from "../data/modelTypes";
import TasksEmpty from "../images/tasks_empty.svg";
import { showPopover } from "../store/popoverSlice";
import { useSelectedScope } from "../store/scopeSlice";
import { RootState } from "../store/store";
import { taskAdded, useTasksInSelectedScope } from "../store/taskSlice";
import { View } from "./view";

interface TasksProps {}

export function Tasks({}: TasksProps) {
  const selectedScope = useSelectedScope();
  const tasks = useTasksInSelectedScope();
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

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
      complete: false,
      title: newTitle,
      scopeId: selectedScope._id,
      dueDate,
    });
    dispatch(taskAdded({ value: newTask }));
    setNewTitle("");
    setDueDate("");
  }

  function onEditClick(e: React.MouseEvent<HTMLButtonElement>, taskId: string) {
    dispatch(
      showPopover({
        x: e.clientX,
        y: e.clientY,
        popoverId: taskId,
        editAction: () => console.log("edit the task"),
        deleteAction: () => console.log("delete the task"),
      })
    );
  }

  return (
    <View title="Tasks" type="thin">
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

      {tasks.length === 0 ? (
        <EmptyState
          img={TasksEmpty}
          title="You don't have any tasks here"
          subtitle="Try adding one below"
        />
      ) : (
        tasks.map((task) => <Task task={task} onEditClick={onEditClick} isPoppedOver={popoverId === task._id}/>)
      )}
    </View>
  );
}
