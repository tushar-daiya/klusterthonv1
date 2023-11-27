import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { MoreVertical } from "lucide-react";
function ActionMenu({ menuActions,id }) {
  
  return (
    <Menu>
      <MenuHandler>
        <MoreVertical className="cursor-pointer" color="black" size={16} />
      </MenuHandler>
      <MenuList className="p-2 border-greyBg border-2 min-w-max">
        {menuActions?.map((action, index) => {
          const classes =
            menuActions.length - 1 === index
              ? "mb-0 bg-greyBg h-10 text-black "
              : "mb-2 bg-greyBg h-10 text-black ";
          return (
            <MenuItem onClick={()=>action.onClick(id)} key={index} className={classes}>
              {action.name}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default ActionMenu;
