import React, { FormEvent, useState } from "react";
import { View } from "./view";
import TasksEmpty from "../images/tasks_empty.svg";
import { EmptyState } from "../components/emptyState";
import { Button } from "../components/shared/button";
import { createOrSaveModel } from "../data/modelCrud";
import { ITask } from "../data/modelTypes";
import { useDispatch } from "react-redux";
import { taskAdded, useTasksInSelectedScope } from "../store/taskSlice";
import { useSelectedScope } from "../store/scopeSlice";

interface TasksProps {}

export function Tasks({}: TasksProps) {
  const selectedScope = useSelectedScope();
  const tasks = useTasksInSelectedScope();
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState("");

  async function onAddTask(e: FormEvent) {
    e.preventDefault();
    if (!selectedScope) {
      throw new Error("No scope selected");
    }
    const newTask = await createOrSaveModel<ITask>("Task", {
      complete: false,
      title: newTitle,
      scopeId: selectedScope._id,
    });
    dispatch(taskAdded({ value: newTask }));
    setNewTitle("");
  }

  return (
    <View title="Tasks" type="thin">
      {tasks.length === 0 ? (
        <EmptyState
          img={TasksEmpty}
          title="You don't have any tasks here"
          subtitle="Try adding one below"
        />
      ) : (
        tasks.map((task) => <li>{task.title}</li>)
      )}

      <section>
        <form
          className="border rounded-[3px] h-[40px] flex items-centerjustify-between bg-white"
          onSubmit={onAddTask}
        >
          <input
            placeholder="Add a task..."
            className="w-full px-[10px]"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          />
          <Button />
        </form>
      </section>
    </View>
  );
}
