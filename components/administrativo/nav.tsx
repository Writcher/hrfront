"use client";

import { Button, Divider, Drawer, IconButton } from "@mui/material";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useDrawer } from "@/lib/context/navcontext";
import NavLinksAdministrativo from "./navlinks";

export default function Nav() {
  const { hidden, toggleDrawer } = useDrawer();

  const hideButton = () => {
    if (hidden) {
      return (
        <IconButton
          color="warning"
          onClick={toggleDrawer}
          sx={{ margin: "2px"}}
          className="!grow !items-center !justify-center !text-gray-800 hover:!text-orange-600 !font-medium hover:!bg-orange-100 !rounded"
        >
          <span className="text-2xl flex items-center justify-center"><MenuRoundedIcon /></span>
        </IconButton>
      )
    } else {
      return (
        <Button
          variant="text"
          color="warning"
          className="flex !pl-6 !items-center !justify-start !text-gray-800 hover:!text-orange-600 !font-medium hover:!bg-orange-100"
          sx={{ margin: "2px", textTransform: "none" }}
          onClick={toggleDrawer}
          fullWidth
          disableElevation
          startIcon={<span className="text-2xl flex items-center justify-center"><MenuOpenRoundedIcon /></span>}
        >
          Menú
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
            width: hidden ? "4vw" : "12vw",
            height: "calc(100vh - 8px)",
            border: "2px solid #ED6C02",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
            bgcolor: "#F3F4F6",
            margin: "4px",
            borderRadius: "5px"
          },
        },
      }}
    >
      <div className="flex flex-col h-full w-full">
        <div className="flex h-[5%]">
          {hideButton()}
        </div>
        <Divider variant="middle" sx={{ bgcolor: "#ED6C02" }} flexItem />
        <div className="flex flex-col h-[95%] overflow-y-auto justify-start">
          <NavLinksAdministrativo />
        </div>
      </div>
    </Drawer>
  );
}
