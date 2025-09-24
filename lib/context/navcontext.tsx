"use client";

import { createContext, useContext, useState } from "react";

type DrawerContextType = {
  hidden: boolean;
  toggleDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [hidden, setHidden] = useState(false);

  const toggleDrawer = () => {
    setHidden((prev) => !prev);
  };

  return (
    <DrawerContext.Provider value={{ hidden, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};