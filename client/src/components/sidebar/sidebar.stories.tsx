import React from "react";
import { SidebarLink } from "./sidebarLink";

export default {
  title: "Sidebar",
  component: SidebarLink,
  decorators: [
    (Story: any) => (
      <div className="bg-gray-400 w-full h-[100vh] p-[20px]">
        <div className="w-[200px] bg-white">
          <Story />
        </div>
      </div>
    ),
  ],
};

function onClickMenu() {
  console.log("onClickMenu");
}

export const linkInactive = () => (
  <SidebarLink isActive={false} name="Inactive" onClickMenu={onClickMenu} />
);
export const linkActive = () => (
  <SidebarLink isActive name="Active" onClickMenu={onClickMenu} />
);
export const linkColored = () => (
  <SidebarLink
    isActive={false}
    name="Colored"
    color="#4199f7"
    onClickMenu={onClickMenu}
  />
);
export const multiple = () => (
  <>
    <SidebarLink isActive={false} name="Inactive" onClickMenu={onClickMenu} />
    <SidebarLink isActive name="Active" onClickMenu={onClickMenu} />
    <SidebarLink
      isActive={false}
      name="Colored"
      color="#4199f7"
      onClickMenu={onClickMenu}
    />
  </>
);
