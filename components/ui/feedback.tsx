import Alert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
};

export default function FeedbackSnackbar({ open, severity, message }: { open: boolean, severity: "success" | "error" | "warning", message: string }) {
    const { watch: watchFeedback, setValue: setValueFeedback } = useForm({
        defaultValues: {
            feedbackOpen: false
        }
    });

    const handleFeedbackClose = () => {
        setValueFeedback("feedbackOpen", false);
    };

    useEffect(() => {
        if (open) {
            setValueFeedback("feedbackOpen", true);
        };
    }, [open]);

    const feedbackOpen = watchFeedback("feedbackOpen");

    return (
        <Snackbar
            open={feedbackOpen}
            autoHideDuration={6000}
            slots={{ transition: SlideTransition }}
            onClose={handleFeedbackClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
        >
            <Alert onClose={handleFeedbackClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};