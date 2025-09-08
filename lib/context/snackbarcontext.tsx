"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Alert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface SnackbarMessage {
  id: string;
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
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  }, []);

  const showSnackbar = useCallback((message: string, severity: SnackbarSeverity, duration = 4000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newSnackbar = { id, message, severity, duration };
    
    setSnackbars(prev => [...prev, newSnackbar]);
  }, []);

  const showSuccess = useCallback((message: string, duration?: number) => {
    showSnackbar(message, "success", duration);
  }, [showSnackbar]);

  const showError = useCallback((message: string, duration?: number) => {
    showSnackbar(message, "error", duration);
  }, [showSnackbar]);

  const showWarning = useCallback((message: string, duration?: number) => {
    showSnackbar(message, "warning", duration);
  }, [showSnackbar]);

  const showInfo = useCallback((message: string, duration?: number) => {
    showSnackbar(message, "info", duration);
  }, [showSnackbar]);

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
      {snackbars.map((snackbar, index) => {
        const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
          if (reason === 'clickaway') {
            return;
          }
          removeSnackbar(snackbar.id);
        };

        return (
          <Snackbar
            key={snackbar.id}
            open={true}
            autoHideDuration={snackbar.duration}
            TransitionComponent={SlideTransition}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            style={{
              // Stack them vertically with some spacing
              transform: `translateY(-${index * 70}px)`,
            }}
          >
            <Alert
              onClose={handleClose}
              severity={snackbar.severity}
              variant="filled"
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        );
      })}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}