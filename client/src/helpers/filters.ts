import moment from "moment";
import { ISavedTask } from "../data/modelTypes";
import { todaysDate } from "./date";

export function completedOrDueTodayOrOverdue(task: ISavedTask) {
  if (task.completedOn) {
    return moment(task.completedOn).isSame(todaysDate(), "day");
  } else if (task.dueDate) {
    return moment(task.dueDate).isSameOrBefore(todaysDate(), "day")
  } else {
    return false;
  }
}