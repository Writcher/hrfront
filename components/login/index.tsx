"use client"

import { Button } from "@mui/material";
import { FormularioInicioSesion } from "./components/formularioInicioSesion";
import { useIniciarSesionFormulario } from "./hooks/useIniciarSesionFormulario";
import SyncIcon from '@mui/icons-material/Sync';
import { iniciarSesionFormularioDatos } from "./types";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "@/services/auth/service.auth";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { useSnackbar } from "@/lib/context/snackbarcontext";
import { useRouter } from "next/navigation";

export default function PantallaInicioSesion() {

    const { showError } = useSnackbar();

    const { control, handleSubmit, formState: { isValid } } = useIniciarSesionFormulario();

    const router = useRouter();

    const mutacion = useMutation({
        mutationFn: (data: iniciarSesionFormularioDatos) => logIn(data),
        onSuccess: (result) => {
            if (result.success) {
                router.push('/');
            };
        },
        onError: (error: any) => {
            let mensaje;

            if (error.message === "1") {
                mensaje = "Usuario no registrado"
            } else if (error.message === "2") {
                mensaje = "Contraseña incorrecta"
            } else {
                mensaje = "Error interno. Inténtalo de nuevo."
            };

            showError(mensaje);
        },
    });

    const onSubmit = (data: iniciarSesionFormularioDatos) => {
        mutacion.mutate(data);
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center bg-white w-[40vw] h-[50vh] space-y-4 rounded" style={{ border: "2px solid #ED6C02" }}>
                <div className="flex items-center justify-center text-gray-800 text-center font-bold">
                    <p className="text-[clamp(1rem,5vw,2rem)]">
                        Iniciar Sesión
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-4 w-full">
                    <FormularioInicioSesion
                        control={control}
                    />
                    <div className="flex w-[40%]">
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            disableElevation
                            endIcon={
                                mutacion.isPending ? (
                                    <SyncIcon className="animate-spin" style={{ animationDirection: 'reverse' }} />
                                ) : <LoginRoundedIcon />
                            }
                            disabled={mutacion.isPending || !isValid}
                        >
                            {!mutacion.isPending ? "Iniciar Sesión" : "Iniciando Sesión"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};