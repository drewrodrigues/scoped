import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Popover } from "./";

export default {
  title: "PopOver",
  component: Popover,
};

export const popoverWithDefaults = () => (
  <Popover
    x={200}
    y={200}
    editAction={() => console.log("Edit the thing")}
    deleteAction={() => console.log("Delete the thing")}
    onHideClick={() => console.log("On hide click")}
  />
);

export const popoverWithCustom = () => (
  <Popover
    x={200}
    y={200}
    editAction={() => console.log("Edit the thing")}
    deleteAction={() => console.log("Delete the thing")}
    onHideClick={() => console.log("On hide click")}
    customActions={[
      {
        label: "Edit",
        Icon: AiOutlineEdit,
        action: () => console.log("do the things"),
      },
      {
        label: "Delete",
        Icon: AiOutlineDelete,
        action: () => console.log("do the things"),
      },
    ]}
  />
);
