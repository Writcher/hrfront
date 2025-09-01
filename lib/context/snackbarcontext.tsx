"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Alert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface SnackbarMessage {
  message: string;
  severity: SnackbarSeverity;
  duration?: number;
}

interface SnackbarContextType {
  showSnackbar: (message: string, severity: SnackbarSeverity, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);
  const [open, setOpen] = useState(false);

  const showSnackbar = (message: string, severity: SnackbarSeverity, duration = 6000) => {
    setSnackbar({ message, severity, duration });
    setOpen(true);
  };

  const showSuccess = (message: string, duration?: number) => {
    showSnackbar(message, "success", duration);
  };

  const showError = (message: string, duration?: number) => {
    showSnackbar(message, "error", duration);
  };

  const showWarning = (message: string, duration?: number) => {
    showSnackbar(message, "warning", duration);
  };

  const showInfo = (message: string, duration?: number) => {
    showSnackbar(message, "info", duration);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider 
      value={{ 
        showSnackbar, 
        showSuccess, 
        showError, 
        showWarning, 
        showInfo 
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={snackbar?.duration || 6000}
        slots={{ transition: SlideTransition }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Alert 
          onClose={handleClose} 
          severity={snackbar?.severity || "info"} 
          variant="filled"
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  };
  return context;
};
