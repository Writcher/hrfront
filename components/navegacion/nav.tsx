"use client";

import { Button, Divider, Drawer, IconButton } from "@mui/material";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useDrawer } from "@/lib/context/navcontext";
import { doLogout } from "@/services/auth/service.auth";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { ComponentType } from "react";

interface NavProps {
  links: ComponentType
}

export default function Nav({ links: Links }: NavProps) {
  const { hidden, toggleDrawer } = useDrawer();

  const hideButton = () => {
    if (hidden) {
      return (
        <IconButton
          color="warning"
          onClick={toggleDrawer}
          sx={{ margin: "0.25vw" }}
          className="!grow !items-center !justify-center !rounded !text-gray-800 !font-medium hover:!bg-orange-100 hover:!text-orange-600"
        >
          <span className="flex items-center justify-center"><MenuRoundedIcon /></span>
        </IconButton>
      )
    } else {
      return (
        <Button
          variant="text"
          color="warning"
          className="!grow !items-center !justify-start !rounded !text-gray-800 !font-medium hover:!bg-orange-100 hover:!text-orange-600"
          sx={{ textTransform: "none", margin: "0.25vw", paddingLeft: "10.5%" }}
          onClick={toggleDrawer}
          fullWidth
          disableElevation
          startIcon={<span className="flex items-center justify-center"><MenuOpenRoundedIcon /></span>}
        >
          <span className="text-[clamp(0.1rem,2.5vw,1rem)]">Menú</span>
        </Button>
      )
    };
  };

  const logOutButton = () => {
    if (hidden) {
      return (
        <IconButton
          color="error"
          onClick={doLogout}
          sx={{ margin: "0.25vw" }}
          className="!grow !items-center !justify-center !rounded !text-red-600 !font-medium hover:!bg-red-100 hover:!text-red-600"
        >
          <span className="flex items-center justify-center"><LogoutRoundedIcon /></span>
        </IconButton>
      )
    } else {
      return (
        <Button
          variant="text"
          color="error"
          className="!grow !items-center !justify-start !rounded !text-gray-800 !font-medium hover:!bg-red-100 hover:!text-red-600"
          sx={{ textTransform: "none", margin: "0.25vw", paddingLeft: "10.5%" }}
          onClick={doLogout}
          fullWidth
          disableElevation
          startIcon={<span className="flex items-center justify-center"><LogoutRoundedIcon /></span>}
        >
          <span className="text-[clamp(0.1rem,6vw,1rem)]">Salir</span>
        </Button>
      )
    };
  };

  return (
    <Drawer
      anchor="left"
      open={true}
      variant="persistent"
      slotProps={{
        paper: {
          sx: {
            width: hidden ? "4.75vw" : "12.25vw",
            height: "calc(100vh - 8px)",
            border: "2px solid #ED6C02",
            bgcolor: "#FFFF",
            margin: "4px",
            borderRadius: "5px"
          },
        },
      }}
    >
      <div className="flex flex-col h-full w-full">
        <div className="flex h-[5vh]">
          {hideButton()}
        </div>
        <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
        <div className="flex flex-col justify-start h-[90vh] mt-[0.125vw] overflow-y-auto">
          <Links />
        </div>
        <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
        <div className="flex h-[5vh]">
          {logOutButton()}
        </div>
      </div>
    </Drawer>
  );
};